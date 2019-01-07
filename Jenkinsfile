import org.kohsuke.github.GitHub

def envNames = ['dev', 'staging', 'production']

def devBranch = 'master'
def stagingBranch = 'master'
def prodBranch = 'master'

def isReviewable = {
  env.BRANCH_NAME != devBranch &&
    env.BRANCH_NAME != stagingBranch &&
    env.BRANCH_NAME != prodBranch
}

env.CONCURRENCY = 10

def isDeployable = {
  (env.BRANCH_NAME == devBranch ||
   env.BRANCH_NAME == stagingBranch) &&
    !env.CHANGE_TARGET &&
    !currentBuild.nextBuild // if there's a later build on this job (branch), don't deploy
}

def shouldBail = {
  // abort the job if we're not on deployable branch (usually master) and there's a newer build going now
  env.BRANCH_NAME != devBranch &&
    env.BRANCH_NAME != stagingBranch &&
    env.BRANCH_NAME != prodBranch &&
    !env.CHANGE_TARGET &&
    currentBuild.nextBuild
}

def buildDetails = { vars ->
  """
    BUILDTYPE=${vars['buildtype']}
    NODE_ENV=production
    BRANCH_NAME=${env.BRANCH_NAME}
    CHANGE_TARGET=${env.CHANGE_TARGET}
    BUILD_ID=${env.BUILD_ID}
    BUILD_NUMBER=${env.BUILD_NUMBER}
    REF=${vars['ref']}
  """.stripIndent()
}

def notify = { ->
  if (env.BRANCH_NAME == devBranch ||
      env.BRANCH_NAME == stagingBranch ||
      env.BRANCH_NAME == prodBranch) {
    message = "developer-portal ${env.BRANCH_NAME} branch CI failed. |${env.RUN_DISPLAY_URL}".stripMargin()
    slackSend message: message,
      color: 'danger',
      failOnError: true
  }
}

// Post a comment on the current pull request
def pullRequestComment(String comment) {
  withEnv(["comment=${comment}"]) {
    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'va-bot', usernameVariable: 'USERNAME', passwordVariable: 'TOKEN']]) {
      sh '''
        # URL decode branch name
        branch=$(python -c 'import sys, urllib; print urllib.unquote(sys.argv[1])' ${JOB_BASE_NAME})
        # Get PR number from branch name. May fail if there are multiple PRs from the same branch
        pr_num=$(curl -u "${USERNAME}:${TOKEN}" "https://api.github.com/repos/department-of-veterans-affairs/developer-portal/pulls" | jq ".[] | select(.head.ref==\\"${branch}\\") | .number")
        # Post comment on github
        curl -u "${USERNAME}:${TOKEN}" "https://api.github.com/repos/department-of-veterans-affairs/developer-portal/issues/${pr_num}/comments" --data "{\\"body\\":\\"${comment}\\"}"
      '''
    }
  }
}

node('vetsgov-general-purpose') {
  properties([[$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', daysToKeepStr: '60']]]);
  def dockerImage, args, ref, imageTag

  // Checkout source, create output directories, build container

  stage('Setup') {
    try {
      deleteDir()
      checkout scm

      ref = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()

      sh "mkdir -p build"

      imageTag = java.net.URLDecoder.decode(env.BUILD_TAG).replaceAll("[^A-Za-z0-9\\-\\_]", "-")

      dockerImage = docker.build("developer-portal:${imageTag}")
      args = "-v ${pwd()}:/application -v /application/node_modules"
    } catch (error) {
      notify()
      throw error
    }
  }

  stage('Security') {
    try {
      dockerImage.inside(args) {
        sh "cd /application && npm config set audit-level critical && npm audit"
      }
    } catch (error) {
      notify()
      throw error
    }
  }

  stage('TSLint') {
    try {
      dockerImage.inside(args) {
        sh 'cd /application && npm run-script lint:ci'
      }
    } catch (error) {
      notify()
      dir(pwd()) {
        step([$class: 'JUnitResultArchiver', testResults: 'lint-results.xml'])
      }
      throw error
    }
  }

  stage('Unit test') {
    try {
      dockerImage.inside(args) {
        sh 'cd /application && npm run-script test:unit:ci'
      }
    } catch (error) {
      notify()
      dir(pwd()) {
        step([$class: 'JUnitResultArchiver', testResults: 'lint-results.xml'])
      }
      throw error
    }
  }

  stage('Visual Regression Test') {
    try {
      dockerImage.inside(args) {
        sh 'cd /application && npm run test:visual'
      }
    } catch (error) {
      dir('src/__image_snapshots__/__diff_output__') {
        withEnv(["ref=${ref}",'bucket=developer-portal-screenshots']) {
          // Upload diffs to S3
          withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'vetsgov-website-builds-s3-upload', usernameVariable: 'AWS_ACCESS_KEY', passwordVariable: 'AWS_SECRET_KEY']]) {
            sh 'aws --region us-gov-west-1 s3 sync --no-progress . "s3://${bucket}/${ref}/"'
          }
          // Create github comment
          files = sh(script: 'ls', returnStdout: true).tokenize()
          links = files.collect {
            "[${it - 'visual-regression-test-ts-visual-regression-test-'}](https://s3-us-gov-west-1.amazonaws.com/${bucket}/${ref}/${it})"
          }.join(' <br>')
          comment = "Visual regression testing failed. Review these diffs and then update the snapshots. <br><br> ${links}"
          pullRequestComment(comment)
        }
      }
      notify()
      throw error
    }
  }

  // Perform a build for each build type

  stage('Build') {
    if (shouldBail()) { return }

      try {
      def builds = [:]

      for (int i=0; i<envNames.size(); i++) {
        def envName = envNames.get(i)

        builds[envName] = {
          dockerImage.inside(args) {
            sh "cd /application && NODE_ENV=production BUILD_ENV=${envName} npm run-script build ${envName}"
            sh "cd /application && echo \"${buildDetails('buildtype': envName, 'ref': ref)}\" > build/${envName}/BUILD.txt"
          }
        }
      }

      parallel builds
    } catch (error) {
      notify()

      // For content team PRs, add comment in GH so they don't need direct Jenkins access to find broken links
      throw error
    }
  }

  stage('Archive') {
    if (shouldBail()) { return }

    try {
      withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'vetsgov-website-builds-s3-upload',
                        usernameVariable: 'AWS_ACCESS_KEY', passwordVariable: 'AWS_SECRET_KEY']]) {
        for (int i=0; i<envNames.size(); i++) {
          sh "tar -C build/${envNames.get(i)} -cf build/${envNames.get(i)}.tar.bz2 ."
          sh "aws --region us-gov-west-1 s3 cp --no-progress --acl public-read build/${envNames.get(i)}.tar.bz2 s3://developer-portal-builds-s3-upload/${ref}/${envNames.get(i)}.tar.bz2"
        }
      }
    } catch (error) {
      notify()
      throw error
    }
  }

  stage('Deploy dev or staging') {
    try {
      if (!isDeployable()) {
        return
      }
      script {
        commit = sh(returnStdout: true, script: "git rev-parse HEAD").trim()
      }
      if (env.BRANCH_NAME == devBranch) {
        build job: 'deploys/developer-portal-dev', parameters: [
          booleanParam(name: 'notify_slack', value: true),
          stringParam(name: 'ref', value: commit),
        ], wait: false
      }
      if (env.BRANCH_NAME == stagingBranch) {
        build job: 'deploys/developer-portal-staging', parameters: [
          booleanParam(name: 'notify_slack', value: true),
          stringParam(name: 'ref', value: commit),
        ], wait: false
      }
    } catch (error) {
      notify()
      throw error
    }
  }
}

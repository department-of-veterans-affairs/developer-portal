import org.kohsuke.github.GitHub
import groovy.transform.Field

@Field
def envNames = ['dev', 'staging', 'production']
@Field
def review_s3_bucket_name = 'review-developer-va-gov'

def devBranch = 'master'
def stagingBranch = 'master'
def prodBranch = 'master'

env.CONCURRENCY = 10

def supercededByConcurrentBuild = {
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
  withEnv(["comment=${comment}", "prNum=${prNum}"]) {
    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'va-bot', usernameVariable: 'USERNAME', passwordVariable: 'TOKEN']]) {
      sh '''
        curl -u "${USERNAME}:${TOKEN}" "https://api.github.com/repos/department-of-veterans-affairs/developer-portal/issues/${prNum}/comments" --data "{\\"body\\":\\"${comment}\\"}"
      '''
    }
  }
}

def getPullRequestNumber() {
  withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'va-bot', usernameVariable: 'USERNAME', passwordVariable: 'TOKEN']]) {
    return sh(script: '''
      # URL decode branch name
      branch=$(python -c 'import sys, urllib; print urllib.unquote(sys.argv[1])' ${JOB_BASE_NAME})
      # Get PR number from branch name. May fail if there are multiple PRs from the same branch
      curl -u "${USERNAME}:${TOKEN}" "https://api.github.com/repos/department-of-veterans-affairs/developer-portal/pulls" | jq ".[] | select(.head.ref==\\"${branch}\\") | .number"
    ''', returnStdout: true).trim()
  }
}

def commentAfterDeploy() {
  def linksSnippet = envNames.collect{ envName ->
    "https://s3-us-gov-west-1.amazonaws.com/${review_s3_bucket_name}/${ref}/${envName}/index.html"
  }.join(" <br> ")

  pullRequestComment(
    "These changes have been deployed to a S3 bucket. A build for each environment is available: <br><br> ${linksSnippet} <br><br> Due to S3 website hosting limitations in govcloud you need to first navigate to index.html explicitly."
  )
}


node('vetsgov-general-purpose') {
  properties([[$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', daysToKeepStr: '60']]]);
  @Field
  def dockerImage, args, ref, imageTag, prNum

  // Checkout source, create output directories, build container

  stage('Setup') {
    try {
      prNum = getPullRequestNumber()
      echo("The pull request number captured from the github API: ${prNum}")
      deleteDir()
      checkout scm

      ref = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()

      if (prNum) {
        envNames.each{ envName ->
          sh "echo PUBLIC_URL=/review-developer-va-gov/${ref}/${envName} >> ./.env.${envName}"
        }
      }

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
        step([$class: 'JUnitResultArchiver', testResults: 'test-report.xml'])
      }
      throw error
    }
  }

  stage('Accessibility Test'){
    try {
      dockerImage.inside(args) {
        sh 'cd /application && npm run-script test:accessibility:ci'
      }
    } catch (error) {
      notify()
      dir(pwd()) {
        step([$class: 'JUnitResultArchiver', testResults: 'test-report.xml'])
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
    if (supercededByConcurrentBuild()) { return }

      try {
      def builds = [:]

      envNames.each{ envName ->
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
    if (supercededByConcurrentBuild()) { return }
    if (prNum) { return }

    try {
      withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'vetsgov-website-builds-s3-upload',
                        usernameVariable: 'AWS_ACCESS_KEY', passwordVariable: 'AWS_SECRET_KEY']]) {
        envNames.each{ envName ->
          sh "tar -C build/${envName} -cf build/${envName}.tar.bz2 ."
          sh "aws --region us-gov-west-1 s3 cp --no-progress --acl public-read build/${envName}.tar.bz2 s3://developer-portal-builds-s3-upload/${ref}/${envName}.tar.bz2"
        }
      }
    } catch (error) {
      notify()
      throw error
    }
  }

  stage('Deploy') {
    try {
      if (prNum) {
        // Deploy to review bucket
        sh "aws --region us-gov-west-1 s3 sync --no-progress --acl public-read ./build/ s3://${review_s3_bucket_name}/${ref}/"
        commentAfterDeploy()
      } else {
        if (env.BRANCH_NAME == devBranch) {
          build job: 'deploys/developer-portal-dev', parameters: [
            booleanParam(name: 'notify_slack', value: true),
            stringParam(name: 'ref', value: ref),
          ], wait: false
        }
        if (env.BRANCH_NAME == stagingBranch) {
          build job: 'deploys/developer-portal-staging', parameters: [
            booleanParam(name: 'notify_slack', value: true),
            stringParam(name: 'ref', value: ref),
          ], wait: false
        }
      }
    } catch (error) {
      notify()
      throw error
    }
  }
}

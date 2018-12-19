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

node('vetsgov-general-purpose') {
  properties([[$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', daysToKeepStr: '60']]]);
  def dockerImage, args, ref, imageTag

  // Checkout source, create output directories, build container

  stage('Setup') {
    try {
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
        sh "cd /application && npm config set audit-level high && npm audit"
      }
    } catch (error) {
      notify()
      throw error
    }
  }

  stage('Visual Regression Test') {
    try {
      dockerImage.inside(args) {
        withCredentials([
          [$class: 'UsernamePasswordMultiBinding', credentialsId: 'vetsgov-website-builds-s3-upload', usernameVariable: 'AWS_ACCESS_KEY', passwordVariable: 'AWS_SECRET_KEY'],
          [$class: 'UsernamePasswordMultiBinding', credentialsId: 'va-bot', usernameVariable: 'USERNAME', passwordVariable: 'TOKEN']
        ]) {
          sh '''
            cd /application
            # Don't exit immediately on test failure
            npm run test:visual || true 

            DIFF_DIR='src/__image_snapshots__/__diff_output__'

            if [ ! -d "$DIFF_DIR" ]; then
              # Tests passed, move on
              exit 0
            fi

            # Push images to s3 bucket
            cd "$DIFF_DIR"
            BUCKET='developer-portal-screenshots'
            REF=$(git rev-parse HEAD)
            rename 's/^visual-regression-test-ts-visual-regression-test-//' *.png
            s3-cli sync --region us-gov-west-1 . "s3://${BUCKET}/${REF}/"

            # Assemble github comment with links to images
            URL="https://s3-us-gov-west-1.amazonaws.com/${BUCKET}/${REF}/"
            MSG="Visual regression testing failed. Review these diffs and then update the snapshots. <br>"
            for FILE in *.png; do
              MSG="${MSG}${URL}${FILE} <br>"
            done

            # Get PR number
            BRANCH=$(python2 -c 'import sys, urllib; print urllib.unquote(sys.argv[1])' $JOB_BASE_NAME)
            PR=$(curl -u "${USERNAME}:${TOKEN}" "https://api.github.com/repos/department-of-veterans-affairs/developer-portal/pulls" | jq ".[] | select(.head.ref==\\"${BRANCH}\\") | .number")

            # Post comment on github
            curl -u "${USERNAME}:${TOKEN}" "https://api.github.com/repos/department-of-veterans-affairs/developer-portal/issues/${PR}/comments" --data "{\\"body\\":\\"${MSG}\\"}"
            exit 1
          '''
        }
      }
    } catch (error) {
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
      dockerImage.inside {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'vetsgov-website-builds-s3-upload',
                          usernameVariable: 'AWS_ACCESS_KEY', passwordVariable: 'AWS_SECRET_KEY']]) {
          for (int i=0; i<envNames.size(); i++) {
            sh "tar -C /application/build/${envNames.get(i)} -cf /application/build/${envNames.get(i)}.tar.bz2 ."
            sh "s3-cli put --acl-public --region us-gov-west-1 /application/build/${envNames.get(i)}.tar.bz2 s3://developer-portal-builds-s3-upload/${ref}/${envNames.get(i)}.tar.bz2"
          }
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

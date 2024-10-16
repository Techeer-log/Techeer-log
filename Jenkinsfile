pipeline {
    agent any

    environment {
        DEPLOY_SERVER = "${env.TECHEER_LOG_IP}"
        BUILD_SCRIPT = "./backend-build.sh"
        DEPLOY_SCRIPT = "./deploy.sh"
    }

    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                git branch: 'develop', url: 'https://github.com/Techeer-log/Techeer-log.git'
            }
        }

        stage('Test') {
            steps {
                script {
                    sh "docker --version"
                    sh "docker compose --version"
                }
            }
        }

        stage('Get Commit Message') {
            steps {
                script {
                    def gitCommitMessage = sh(
                        script: "git log -1 --pretty=%B",
                        returnStdout: true
                    ).trim()
                    echo "Commit Message: ${gitCommitMessage}"
                    env.GIT_COMMIT_MESSAGE = gitCommitMessage
                }
            }
        }

        stage('Build & Image push') {
            steps {
                script {
                    sh """
                      chmod +x ${BUILD_SCRIPT}
                      sh ${BUILD_SCRIPT}
                    """
                }
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                script {
                    sshagent(['techeer-log-ssh']) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_SERVER} '
                        cd ~/Techeer-log
                        sudo chmod +x ${DEPLOY_SCRIPT}
                        sudo sh ${DEPLOY_SCRIPT}'
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])
        }
        success {
            slackSend (
                message: "성공: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}). 최근 커밋: '${env.GIT_COMMIT_MESSAGE}'",
            )
        }
        failure {
            slackSend (
                message: "실패: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}). 최근 커밋: '${env.GIT_COMMIT_MESSAGE}'",
            )
        }
    }
}
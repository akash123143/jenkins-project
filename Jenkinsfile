pipeline {
    agent {
       label 'js-agent'
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // Docker Hub credentials stored in Jenkins
        DOCKERHUB_REPO = 'akash123143/tap'            // Replace with your Docker Hub repo
        APP_DIR = 'app'
        DOCKER_IMAGE = "${DOCKERHUB_REPO}:${env.BUILD_NUMBER}"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))   // Keep last 10 builds
        timeout(time: 15, unit: 'MINUTES')               // Build timeout
        disableConcurrentBuilds()                        // Avoid parallel builds
    }

    triggers {
        githubPush() // Trigger build on GitHub push
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/master']], // Change to '*/master' if needed
                    extensions: [
                        [$class: 'CleanBeforeCheckout'],
                        [$class: 'CloneOption', depth: 1, shallow: true]
                    ],
                    userRemoteConfigs: [[
                        credentialsId: 'github-credentials',
                        url: 'https://github.com/akash123143/jenkins-project.git' // Replace with your repo URL
                    ]]
                ])
            }
        }

        stage('Install Dependencies & Run Tests') {
            steps {
                dir(APP_DIR) {
                    sh 'npm ci --only=production'
                    sh 'npm test'
                    stash includes: '**', name: 'built-app'
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                dir(APP_DIR) {
                    unstash 'built-app'
                    script {
                        docker.build("${DOCKER_IMAGE}")
                        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                            docker.image("${DOCKER_IMAGE}").push()
                        }
                    }
                }
            }
        }
    }

    post {
        cleanup {
            cleanWs() // Clean workspace after build
        }
    }
}

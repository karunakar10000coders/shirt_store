pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/your-username/shirt-store.git'
        GIT_BRANCH = 'main'

        DOCKER_IMAGE = 'your-dockerhub-username/shirt-store'
        DOCKER_TAG = "${BUILD_NUMBER}"

        // Jenkins Credentials IDs (Configure these in Jenkins -> Manage Jenkins -> Credentials)
        GIT_CREDENTIALS = 'github-credentials'
        DOCKER_CREDENTIALS = 'dockerhub-credentials'
    }

    stages {

        stage('Git Checkout') {
            steps {
                git branch: "${GIT_BRANCH}",
                    credentialsId: "${GIT_CREDENTIALS}",
                    url: "${GIT_REPO}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci || npm install'
            }
        }

        stage('Unit Testing') {
            steps {
                sh 'npm test'
            }
        }

        stage('Code Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh """
                    docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                """
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: "${DOCKER_CREDENTIALS}",
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh """
                        echo "\$DOCKER_PASS" | docker login -u "\$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker push ${DOCKER_IMAGE}:latest
                        docker logout
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Shirt Store application...'

                sh """
                    docker stop shirt-store || true
                    docker rm shirt-store || true

                    docker run -d \\
                        --name shirt-store \\
                        -p 3000:3000 \\
                        --restart unless-stopped \\
                        ${DOCKER_IMAGE}:${DOCKER_TAG}
                """
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline executed successfully! Shirt Store is live on port 3000.'
        }

        failure {
            echo 'CI/CD Pipeline failed! Check stage logs for details.'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}

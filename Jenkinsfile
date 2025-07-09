pipelines{
    agent: any

    stages{

        stage('Build docker Image'){
            steps{
                echo 'Building Docker Image'
                sh 'docker build -t preetiVijay/playwright-test:latest .'
            }
        }
        stage('Push Image on Docker hub'){
            steps{
                echo 'Push the image on Docker hub'
                sh 'docker push preetiVijay/playwright-test'
            }
        }
        stage('Run docker image'){
            steps{
                echo 'Running playwright tests in Docker'
                sh 'docker run --name playwright-container preetiVijay/playwright-test'
            }
        }
    }
}
post{
    always{
        echo 'Stop and remove container'
        sh 'docker rm -f playwright-container'
    }
}
pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage('Clonar o repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/thexbie/teste-api-ebac.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }
        stage('Executar Testes') {
            steps {
                sh 'npm start & sleep 10 && NO_COLOR=1 npm run cy:run'
            }
        }
    }
}

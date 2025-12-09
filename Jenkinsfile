pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage('Clonar o repositorio') {
            steps {
                // ATENÇÃO: Troque a URL abaixo pela URL do SEU repositório no GitHub
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
                sh 'NO_COLOR=1 npm run cy:run'
            }
        }
    }
}
# ## Comando obrigatório
# ## Baixa a imagem do node com versão alpine (versão mais simplificada e leve)
# FROM node:alpine

# ## Define o local onde o app vai ficar no disco do container
# ## Pode ser o diretório que você quiser
# WORKDIR /app

# ## Copia tudo que começa com package e termina com .json para dentro da pasta /app
# COPY package*.json ./

# ## Executa npm install para adicionar as dependências e criar a pasta node_modules
# RUN npm install

# ## Copia tudo que está no diretório onde o arquivo Dockerfile está 
# ## para dentro da pasta /app do container
# ## Vamos ignorar a node_modules por isso criaremos um .dockerignore
# COPY . .

# ## Container ficará ouvindo os acessos na porta 3000
# EXPOSE 3000

# ## Não se repete no Dockerfile
# ## Executa o comando npm start para iniciar o script que que está no package.json
# CMD npm start

# Use a imagem oficial do Node.js como base
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Execute o comando npm init -y para iniciar um novo projeto Node.js
RUN npm init -y

# build do projeto
# docker build -t meu-projeto .

# execução do projeto
# docker run -p 3000:3000 meu-projeto

# execução do container
# docker run -it meu-projeto /bin/bash

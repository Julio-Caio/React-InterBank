# Dockerfile do servidor Node.js

# Use a imagem base oficial do Node.js
FROM node:14

WORKDIR /usr/src/app

# Copie os arquivos do servidor Node.js
COPY server/package*.json ./
RUN npm install
COPY server/ .

# Copie os arquivos da aplicação React para a pasta 'client'
COPY client/build ./client

# Defina a porta em que o servidor estará ouvindo
EXPOSE 3000

# Inicie o servidor Node.js para servir a aplicação React
CMD ["node", "index.js"]
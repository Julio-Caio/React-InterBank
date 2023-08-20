# Use a imagem base oficial do Node.js para construir o cliente React
FROM node:14 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json para o diretório de trabalho
COPY client/package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o conteúdo da pasta 'client' para o diretório de trabalho no container
COPY client/ .

# Compila a aplicação React
RUN npm run build

# Imagem final com um servidor leve para servir os arquivos estáticos do React
FROM node:14-alpine

# Define o diretório de trabalho para servir os arquivos estáticos
WORKDIR /usr/src/app

# Copia a build do React do estágio anterior
COPY --from=build /usr/src/app/build ./client

# Expõe a porta em que o servidor React estará ouvindo
EXPOSE 80

# Comando para iniciar o servidor React
CMD ["npx", "serve", "-s", "client", "-p", "80"]
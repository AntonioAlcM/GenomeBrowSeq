FROM node:carbon-jessie
# Autor
MAINTAINER Antonio Alcalá Martínez

RUN apt-get update

RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server
COPY package*.json ./

# Instalación de las dependecncias del proyecto

RUN npm install

COPY . /usr/src/app


EXPOSE 9000
CMD [ "npm", "run", "start" ]
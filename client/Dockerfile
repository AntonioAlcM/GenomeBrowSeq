FROM node
# Autor
LABEL Antonio Alcalá Martínez

RUN apt-get update

RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client
COPY package*.json ./

# Instalación de las dependecncias del proyecto

RUN npm install

COPY . .


EXPOSE 3000
CMD [ "npm", "run", "dev" ]

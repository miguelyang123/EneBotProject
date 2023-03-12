FROM node:8.12-alpine
RUN apk add g++ make py3-pip

RUN mkdir /ene-bot

COPY . /ene-bot

WORKDIR /ene-bot

RUN npm install -g node-gyp brain.js

RUN npm install


CMD ["node", "./index.js"]
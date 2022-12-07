FROM node:16.16.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENTRYPOINT [ "npm", "start"]

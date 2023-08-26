FROM node:latest

ARG NODE_ENV=production

ENV NODE_ENV $NODE_ENV

COPY ./build /build

COPY ./package.json ./package.json

COPY ./package-lock.json ./package-lock.json

RUN NODE_ENV=$NODE_ENV npm install

EXPOSE 3000
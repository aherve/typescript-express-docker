FROM mhart/alpine-node:8
MAINTAINER Aurélien Hervé <mail@aurelien-herve.com>

RUN mkdir /app
WORKDIR /app

RUN npm install -g yarn
RUN yarn global add nodemon typescript@3.4.5 tslint mocha

ADD ./package.json .
ADD ./yarn.lock .
RUN yarn

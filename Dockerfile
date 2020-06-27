FROM mhart/alpine-node:14.4
MAINTAINER Aurélien Hervé <mail@aurelien-herve.com>

RUN mkdir /app
WORKDIR /app

RUN npm install -g yarn
RUN yarn global add nodemon typescript eslint mocha

ADD ./package.json .
ADD ./yarn.lock .
RUN yarn

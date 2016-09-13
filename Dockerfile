FROM mhart/alpine-node:6.5

MAINTAINER Aurélien Hervé <mail@aurelien-herve.com>

RUN mkdir /app
WORKDIR /app

RUN npm install -g nodemon tsc typescript typings

ADD ./package.json .
RUN npm install

ADD ./typings.json .
RUN typings install

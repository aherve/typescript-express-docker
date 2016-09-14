#Typescript + Docker + Express + Mongoose = Awesome

## About this
This project is a fully working bootstrap for developping an express-mongoose api with typescript.

## Why is it awesome ?

 - the ONLY install you need is docker. Don't worry about installing mongo, npm or whatever else. Docker-compose takes all the leverage for you (see [Installation](#installation)).
 - Typescript is awesome. your code is checked against a LOT of possible mistakes. Try inserting some typos such as `ssend(...)` instead of `send()` and see the console warn you about it.
 - Possible usage of `await/async` and/or Promise-style code => no Callback Hell
 - Linters are already installed. Keep your code clean.

## Installation

 - clone the repo
 - run `docker-compose up`
 - browse `http://localhost:3000/api/ping`, `http://localhost:3000/api/views/promise`, `http://localhost:3000/api/views/await`
 - profit

## Useful knowledge

### Rebuilding the images
After adding new npm or typings package, you will have to rebuild your images as follows:

 - `docker-compose stop`
 - `docker-compose rm`
 - `docker-compose build`
 - `docker-compose up`

### Add new npm package:
 - `docker-compose run api npm install <wathever> --save`

### Add new typings:
 - `docker-compose run api typings install <wathever>`

### Can I deploy ?
I'v not yet automated the deployment. For now you can do whatever you want with the `/dist` folder, that contains the transplied `js` code.

## Await

Typescript [now support async/await](https://blogs.msdn.microsoft.com/typescript/2015/11/03/what-about-asyncawait/) and this build let you take advantage of it. See `/api/views` for two implementations of a simple mongoose request. One uses await, whereas the other uses promises.

In both cases the code is easy to read, and takes advantage of typescript validations.

## TODO/ coming soon
 - Implementation of unit-tests
 - automated build of a production-ready docker

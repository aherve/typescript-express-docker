# Typescript + Docker + Express + Mongoose = Awesome

[![Codeship Status for aherve/typescript-express-docker](https://app.codeship.com/projects/36222600-51a6-0137-c2cc-6af49133ab39/status?branch=master)](https://app.codeship.com/projects/340133)

## About this
This project is a fully working bootstrap for developping an express-mongoose api with typescript.

## Why is it awesome ?

 - the ONLY install you need is docker. Don't worry about installing mongo, npm or whatever else. Docker-compose takes all the leverage for you (see [Installation](#installation)).
 - Typescript is awesome, and it's not only for frontend users. your code is checked against a LOT of possible mistakes. Try inserting some typos such as `ssend(...)` instead of `send()` and [see the console warn you about it](#typos).
 - [Possible usage of `await/async`](#await) and/or Promise-style code => no Callback Hell
 - Linters are already installed. Keep your code clean.
 - Automated mocha unit testing. Mocha tests are written in ts, but run on the transpiled javascript code. So the actual transpiled application is properly tested.
 - Automated testing by codeship on code commit. They run the same container as you do : if it works at home, it works on CI-servers.

## Installation

 - clone the repo
 - run `docker-compose up`
 - browse `http://localhost:9000/api/ping`, `http://localhost:9000/api/ping/fail`, `http://localhost:9000/api/views/visit`
 - profit

## Useful knowledge

### Rebuilding the images
After adding new npm or typings package, you will have to rebuild your images as follows:

 - `docker-compose kill`
 - `docker-compose rm`
 - `docker-compose build`
 - `docker-compose up`

### Add new npm package:
 - `docker-compose run api yarn add <wathever>`, then rebuild the images

### Can I deploy ?
I'v not yet automated the deployment. For now you can do whatever you want with the `/dist` folder, that contains the transplied `js` code.

## Typos
Typescript validations are awesome:

![typo](https://cloud.githubusercontent.com/assets/2798256/18518627/0efce218-7aa1-11e6-89a2-74455eede178.png)

![selection_063](https://cloud.githubusercontent.com/assets/2798256/18518718/6d7694ec-7aa1-11e6-83d2-0938e25f5f45.png)

## Await

Typescript [support async/await](https://blogs.msdn.microsoft.com/typescript/2015/11/03/what-about-asyncawait/) and this build let you take advantage of it. See `/api/views` for two implementations of a simple mongoose request.

The code now looks like as it where synchronous, but does not block the thread:

## Continuous Testing

The config provided in `codeship-services.yml` and `codeship-steps.yml` will trigger a build at each code commit, provided you have connected account.

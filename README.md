# Outsera Assessment Movie API

This is a simple movie API built with NestJS, which includes features to manage movies and calculate prize intervals based on producers. The project is configured to support both development and production environments, along with integration tests.

## Table of Contents

- [Link to Portuguese README / Versão em Portugues](readme-ptbr.md)
- [Prerequisites](#prerequisites)
- [Installation](#project-Instalation)
- [Running the Application](#compile-and-run-the-project)
- [Running Tests](#run-tests)
- [Building for Production](#building-for-production)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

## Project Instalation

```bash
$ npm install
```
Optional csv file is located on ./db/movielist.csv
If provided the server ll import every row to movie table.


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Project runs on localhost:3000
route GET into root localhost:3000 should return 'Hello World!' if the project is running.

There is a CRUD documentation on route:
localhost:3000/doc

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Run in Production
To run thes server
```bash
$ npm install -g pm2
#runs the server
$ pm2 start dist/src/main.js --name "nest-app"
```
To kill the server
```bash
#kills the server
$ pm2 stop nest-app
```
## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.



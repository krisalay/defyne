# defyne
Persisted boilerplates for all your projects.

## Table of Contents
- [Introduction](#introduction)
- [Supported Tech Stack](#supported-tech-stack)
- [Project Structure](#project-structure)
- [Commands](#commands)

## Introduction
Defyne generates a persisted boilerplate for all your projects. It helps you to generate a web service from scratch with modularized and scalable code. Follow the same standards across all your projects with *defyne* as your one stop tool.

## Supported Tech Stack
Defyne generates boilerplate for:
-  [Node.js](https://nodejs.org/) with [Typescript](https://www.typescriptlang.org/)

## Project Structure
- **src/:** It consists of the source code for the new package that we are going to create
- **src/controllers/:** Controllers is the place where APIs are stored
- **src/policies/:** Policies refer to the middlewares in the express.js
- **src/responses/:** Responses are the extended version of error classes. For example: BadRequestResponse, UnProcessableEntityResponse, etc.

## Commands
#### Install the Defyne tool globally in your system
`npm install defyne -g`
#### Initialize the project from scratch
`defyne -i`
#### Create a new controller
`defyne -gc`
#### Create a new response
`defyne -gr`

# Overview

This guide explains how to initialize this Full Stack application locally with a Shopify Hydrogen frontend + NodeJS microservice.

# Requirements

- Docker 24.0.2 or docker-compose 2.19.1
- NodeJS 20.11.0

# Getting started

## Environment Variables

You don't need to worry about environment variables. They were set up through `.env` and `.env.test` files in each application (client & server). Therefore, you don't have to add new ones to the services.

## Types

Both applications (client & server) have a stage `postinstall` which will execute after you install the packages. It will generate the types that you need to work with typescript. Nevertheless, some of them were committed.

## NodeJS microservice - server end

Firstly, this project looks like a mono-repo where you can look at the `/server` and `/client`. You will begin initializing first the NodeJS microservice. Therefore, you must move to `/server` folder

```bash
cd server
```

Here, you could employ a Node Version Manager (NVM) to select the NodeJS version declared from `.nvmrc` file through:

```bash
nvm use
```

Don't worry, if you don't have Node Package Manager installed, you could set up the NodeJS version declared `.nvmrc` with your favorite method from the terminal manually. The version of NodeJS employed here was `20.11.0`

Next, you must install the packages. You can use `yarn` or `npm`

```bash
yarn install
```

or

```bash
npm install
```

Once, the packages are installed, you must run a MongoDB service. Here, it will run through Docker. You must run the command below

```bash
docker-compose -f docker-compose-mongo.yml up -d
```

The filename has a different format and that made it different to the standard. Therefore, you must add the flag `-f` to describe the filename.

Finally, you can run the server from any commands shown below

```bash
yarn dev
```

or

```bash
npm run dev
```

You will observe the next log from the terminal. Now, your server will be running by default `http://localhost:4000/`

```bash
🚀  Server is running!
📭  Query at http://localhost:4000/
```

## Shopify Hydrogen - client end

Now, you will have to move to `/client` folder. First, you must open a new tab terminal and copy the commands below.

```bash
cd ../
cd client
```

Make sure that your last location had been from the `/server` folder. Otherwise, you don't need to come back. Only move to the client folder `cd client` or to the root folder where the project was cloned.

Once here, you must choose the NodeJS version proper. Here, it worked with `20.11.0`. It was the same employed for the server end. Nevertheless, you will have the command for Node Version Manager (nvm) package below

```bash
nvm use
```

Then, you will have to install the packages here as well. You can employ `yarn` or `npm`

```bash
yarn install
```

or

```bash
npm install
```

Finally, you can run the client end using any of the commands below

```bash
yarn dev
```

or

```bash
npm run dev
```

You look at the next log. This will be a good signal

```bash
$ shopify hydrogen dev --codegen

Environment variables injected into MiniOxygen:

SESSION_SECRET        from local .env

PUBLIC_STORE_DOMAIN   from local .env

FAVORITES_API_TOKEN   from local .env

➜  Local:   http://localhost:3000/

➜  Network: use --host to expose

➜  press h + enter to show help

success

View Hydrogen app: http://localhost:3000/ [1]

```

## How to access to Favorites Products List Page

You can access to favorites list page by typing in the address bar `http://localhost:3000/favorites`. Also, the website has a navigation button to go to the Favorites List page directly.

## Technologies employed

### GraphQL

It employed `apollo-server` and `graphql` technologies to build the interface of communication between the client and server. It has powerful tools to reduce the latency of the application, cache the requests, and save the number of requests through tools such as aliases or connections. Besides, tools like `graphql-codegen` and `MockSchema` allow you: First, keep up your types based on the schema. Second, provide to frontend application an initial and predictable data which you can start to work quickly.

### Express

This employed `express`, it is being covered by the `apollo-server` framework. Under this layer, functions as `startStandaloneServer` use Apollo Server 4's Express integration. Therefore, it will allow you to build and launch an API sooner with low complexity of configuration. Apart from that, if you need to add some processing before or after, you would have to switch to employ `expressMiddleware`. This was not the use case.

### Mongoose

It employed MongoDB, which is a NoSQL database for storing the product. Actually, you could use both type of database (SQL and NoSQL). However, we decided due to the simplicity and configuration of the model.

### Linting

It employed `ESLint` to organize the code properly

### Jest

It employed `Jest` for testing. This has enough tools to allow you to test your application, you don't need to install too many external packages to test the main methods and functions of your application.

### Docker

It employed `docker-compose` and `docker` to deploy a Mongo service. It will avoid installing third-party packages directly on your local machine and set up them. From Docker, you can manage an image that will host your service from a simple manifest file.
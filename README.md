# Overview

This guide explains how to initialize this Full Stack application locally with a Shopify Hydrogen frontend + NodeJS microservice.

# Requirements

- Docker 24.0.2 or docker-compose 2.19.1
- NodeJS 20.11.0

# Getting started

## Environment Variables

You don't need to worry about environment variables. Both projects employ `dotenv` package. So, they were set up through `.env` and `.env.test` files in each application (client & server). Therefore, you don't have to add new ones to the services.

## Types

Both applications (client & server) have a stage called `postinstall` which will execute after installing the packages. It will generate automatically the types that you need to work with Typescript. Nevertheless, you must have to run the server before you begin installing packages on client side because it needs the server online.

## Run Mongo service

You must run a MongoDB service on your local machine. Here, it will run it through Docker. You must run the command below from the root folder

```bash
docker-compose -f docker-compose-mongo.yml up -d
```

The filename has a different filename standard because it clarifies that the manifest constains just the Mongo service. Therefore, you must add the flag `-f` to `docker-compose` command to point the filename out.

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

Finally, you can run the server from any commands shown below

```bash
yarn dev
```

or

```bash
npm run dev
```

You will observe the next log from the terminal. Now, your server will be running by default `http://localhost:4000/api`

```bash
🚀  Server is running!
📭  Listening on http://localhost:4000/api
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

You look at the next log. This will be a good signal which declares that client is running in `http://localhost:3000/`

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

# How to access to Favorites Products List Page

You can access to favorites list page by typing in the browser address bar `http://localhost:3000/favorites`. Also, you can access directly from the website, there is a navigation button to go to the Favorites List page directly.

# How to run the unit tests

You can run the test from both projects with any of the commands bellow

```bash
yarn test
```
or

```bash
npm run test
```

# How the server knows that favorites can bring?

The client automatically generates a user-ID for each customer's session, meaning that each time customers open the website from their browsers, a user-ID is created. This user-ID is then stored as a cookie, which is queried each time that the client needs to send a GraphQL request to the server. Consequently, the client queries the user-ID and injects it into either GraphQL query or GraphQL mutation as an input.

Once, this information reaches the server, the GraphQL resolver `favorites` can query the database based on the requested user-ID and retrieve the favorites products specific to that user-ID. As a result, two users or customers won't see a same list of favorite products.

The user-ID is stored as cookie due to the itself's features. Some of them are:
- The data isn't quite big to be stored in another place as the LocalStorage.
- This isn't actually a sensite data because this isn't saving any customer's personal information.
- Also, for developement purposes, this doesn't have an expiration time. The cookie will keep until the customer decides to clean the cookies of the website.
- This is useful for demonstrating how two users can see different favorites for development purposes. However, for production purposes this must be orchestrated according to the data pulled from the Login page. Here, it was developed employing a Demo shop or Mock.shop. Therefore, this doesn't have capabilities such as Sign Up,  Log in, and so on.

This development is aware of the limitations and was done for purposes of the test task. Some of them are:
- You will see different favorites list from two or more different browsers because each browser will simulate a different customer and each browser will store an different used-ID.
- This isn't linked with the customer's account because this is employing the demo version from Shopify Hydrogen documentation.
- A process of Signup and Login wasn't request to develop in this test task.

# Authentication

It has a simple authentication which evaluates that the token injected in the requests through the header `Authorization`  matches with the `SOURCE_TOKEN` variable saved in our environment variables. Here, it is employing a development token.


# How to generate Schema types

You can generate types in both projects through GraphQL codegen. It will generate types according to GraphQL Schema and transform some type based on database model. So far, this step is autogenerated once you run `yarn install` or `npm install` because a `postinstall` script was set up in each `package.json`. Nevertheless, You can invoke that script independently on both projects with the next commands shown below.

```bash
yarn generate
```
or

```bash
npm run generate
```
Additionally, on the client project this command avoids the basic authentication process in the server end due to a header called `dev-codegen`. This jumps the authentatication validation and reaches the schema and its type definition. Also, the authentication step is not relevant for this script.

## Technologies employed

### GraphQL

It employs Apollo Server and Graphql technologies to build the interface of communication between the client and server. It has whopping powerful tools to reduce the latency of the application, cache of the requests, and save the number of requests through tools such as aliases or connections. Besides, tools like Graphql Codegen and Mock Schemas give you some advatanges. Some of them, for instance, keep up your types based on the schema. Another one, provide to frontend application an initial and predictable data which you can start to work quickly.

### Express

This employs Express framework together Apollo Server. This is one of the integrations easier with Apollo Server. Besides, it's the most popular Node.js web framework, and it integrates well with many other popular libraries. On other hand, it's using `expressMiddleware`, it sets a custom GraphQL endpoint `/api`. Also, it is preparing our applicattion to be more scalable because you will be able to add new REST or GraphQL endpoints, more middlewares, so on.

### Mongoose

It employs MongoDB, which is a NoSQL database for storing the product. Actually, you could use both type of database (SQL and NoSQL). However, we decided due to the simplicity and configuration of the model.

### Linting

It employs ESLint to organize the code properly

### Jest

It employs Jest for testing the backend side. This has enough tools to allow you to test your application, you don't need to install too many external packages to test the main methods and functions of your application.

### Docker

It employs docker-compose and docker to deploy a Mongo service. It will avoid installing third-party packages directly on your local machine and set up them. From Docker, you can manage an image that will host your service from a simple manifest file.

### Vitest

It employs `@testing-library/react`, `@remix-run/testing`, and `vitest` as main tools to create unit test cases in some Remix components. Vitest employs Jest assertions and it can run natively ESM and NodeJS modules without needing transformers. Furthermore, Shopify Hydrogen project works with ESM instead of CommonJS. It causes that some testing frameworks as Jest requests complex configuration files and low probability of success for running the unit tests properly

# Short Video

This is an Drive folder where you will watch a short video which explains and shows some topics of the work done.

https://drive.google.com/drive/folders/1JVdGado8q1steKvPgVfMlwuRwfyvqre8?usp=sharing
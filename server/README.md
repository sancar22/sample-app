# Backend TS Express Server

This backend server follows and MVCish pattern: `Router -> (MiddleWare) -> Controllers -> Models -> DB`

## The Router

The main point of interest when talking about the router is the use of a root router along with smaller routers. Inside `router/index.ts` we will find the root router. Here, we "register" the smaller router to their corresponding routes.

*Important* to note, all routes within the smaller routers are held within the route that that small router is registered to in the root router. For example: The `messages router` is registered under the `/api/message` route, therefore, the message router route `/getAll` will be found under the complete route: `/api/message/getAll`. 

## Middleware

This project contains only 1 middleware, but it is perhaps the most common use case of such, Authentication Middleware.
The middleware will check for the `Authorization header`, exctract a JWT token from it, and attempt to verify the token and decode the user. Failure to have a correct token, will lead to the route being rejected and a `401` status code being returned.

## Controllers

The controllers are pretty standard, they will take a request, handle the business logic, and use the models to talk to the DB.
The controllers are separated by responsability, we have grouped them into:
  1. Auth controller
  2. Message Controller
  3. User Controller

The split of responsabilities between them is self explanatory with their names.

## Models

To create the models, we have used Node's most popular ORM: _Sequelize_. The apllication currently has 2 models:
  1. User Model
  2. Message Model

We have leveraged Sequelize's `HasMany` and `belongsTo` in order to create a 1 to many relationship, where a user has many messages, but a message only has 1 user. 

*Important* When utilizing sequlize, if table names are not explicitly given (as in our example), the table name is assumed to be the model name, pluralized: Message -> Messages. _*CAREFUL*_ Sequlize uses a library called inflection to do this, therefore, odd pluralizations are done correctly. Goose -> Geese.

*Important2* If the tables have not been crated in the database, calling the method `.sync()` will do it for you, following the pluralization rules discussed above. 

## DataBase

The Database utilized is not really relevant, as long as it is PostgreSQL. Jokes. As long as it is a relational database, it will work, although PostgreSQL is highly suggested simply because it is the best relational database to learn to utilize because of how common it is.

## Tests

The tests found under the `test/` directory, can be run using the command `npm t` or `npm test`.
The script in `package.json` has been changed to utilize mocha, and ts-node, in order to run the tests correctly.

We are using `Mocha` as the testing framework and `Chai` as the assertion library. We are primarily utilizing the assertion `should`. This is simply because it is the preferred assertion by the writers of the test. Finally, we are also utilizing `supertest` for testing HTTP.

### Auth Tests

The Auth tests are made for testing the authorization middleware. They will ensure routes are rejected if no JWT is provided, or if the JWT is incorrect. Additionally, they also test for the next function to be called.

### HTTP Tests

The HTTP tests are meant to test the entire routes. You will notice most are testing both the status codes and the return messages. We are utilizing build up and tear down hooks `before, after, beforeAll, afterAll` in order to ensure the test database is synced, and that we have the correct test data in the database. Note that when ensuring something is undefined, the previous `.should` syntax doesn't work. You need to utilize another syntax. We have chosen to do `should.equal()`. This will only work if you have required and instantiaated `chai.should()`;

### MODEL Tests

Finally, we have tested the models. We have added tests for both the message model and the user model. Since we are utilizing sequlize, a highly tested and trusted ORM, the testing here doesn't need to be as exhaustive. However, we have decided for peace of mind, to add tests that ensure the models have the desired attributes. We are also testing the models for the desired associations. Finally, we have tested that the models are set up correctly, by purposefully giving incorrect data and calling the `.validate()` method. *IMPORTANT* `.validate()` is an async method, so are normal strategies don't work. In order to facilitate this, we have added the npm package `chai-as-promised`. Take a look at the model tests files to see how this is set up. Essentially, though, what this does is allow to test promises. Here, we are testing that `.validate()` correctly throws an Error. 
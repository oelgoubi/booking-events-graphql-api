const Koa = require("koa");
const graphQLHTTP = require("koa-graphql"); // Create a GraphQL HTTP server with Koa.
const bodyParser = require('koa-bodyparser');
const json = require("koa-json");
const mount = require("koa-mount");// Mount koa-graphql as a route handler
const initDB = require("./database");
const graphQLSchema = require("./schema/index");
const graphQLResolvers = require("./resolvers/index");
const isAuth = require("./middlewares/isAuthenticated")




const PORT = process.env.PORT || 8080;



const app = new Koa();

// Json Prettier and Body Parser
app.use(json());
app.use(bodyParser()); // The parsed body will be stored in ctx.request.body 

// Initalize the connection with the DB
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})


// Auth Middleware
app.use(isAuth)



// Using mount because use is expecting a function  or use koa-router
app.use(mount("/graphql", graphQLHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
})));





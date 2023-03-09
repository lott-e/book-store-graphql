
const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const mongoose = require("mongoose")
const schema = require('./schema/schema')
require('dotenv').config()
// invoke our function to create our app
const app = express()


mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@findbooks.mwouloj.mongodb.net/?retryWrites=true&w=majority`);
mongoose.connection.once('open', () => { console.log('connected to database') })

//graphqlHTTP() function will fire on /graphql req. This is middleware 
app.use('/graphql', graphqlHTTP({
    //passing through a schema 
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
})

// nodemon app allows us to no longer keep restarting the server, it will listen for changes and auto restart server
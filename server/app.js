const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const mongoose = require("mongoose")
const schema = require('./schema/schema')
// invoke our function to create our app
const app = express()

mongoose.connect('mongodb+srv://hilottie:pldPN6jtW2IriXEU@findbooks.mwouloj.mongodb.net/?retryWrites=true&w=majority');
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
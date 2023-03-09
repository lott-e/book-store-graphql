const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
})

//make a collection with objects inside of it like our bookSchema
module.exports = mongoose.model('Book', bookSchema)

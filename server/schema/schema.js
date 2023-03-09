const graphql = require('graphql')
const _ = require('lodash');
const Book = require('../models/book')
const Author = require('../models/author')
//describing our schema 
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;


// dummy data
// var books = [
//     { name: 'Berserk', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'Beyond the Deep Woods', genre: 'Fantasy', id: '2', authorId: '3' },
//     { name: 'You Dont Know Javascript', genre: 'Programming', id: '3', authorId: '2' },
//     { name: 'Javascript: The Hard Parts', genre: 'Programming', id: '4', authorId: '2' },
// ]
// var authors = [
//     { name: 'Kentaro Miura', age: 54, id: '1' },
//     { name: 'Kyle Simpson', age: 38, id: '2' },
//     { name: 'Terry Pratchett', age: 48, id: '3' },
// ];

const BookType = new GraphQLObjectType({
    name: 'Book',
    //mutliple types with multiple references to eachother
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                // return _.find(authors, { id: parent.authorId })
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    //mutliple types with multiple references to eachother
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                console.log(parent);
                // return _.filter(books, { authorId: parent.id })
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    //each root query is a field, root query is where in graph you'd like to retrieve data from
    fields: {
        book: {
            type: BookType,
            //takes an id
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                // return _.find(books, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books
            }
        },
        author: {
            type: AuthorType,
            //takes an id
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                // return _.find(authors, { id: args.id });
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})


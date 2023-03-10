const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");
//describing our schema
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

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
  name: "Book",
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
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  //mutliple types with multiple references to eachother
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        console.log(parent);
        return Book.find({ authorId: parent.id });

        // return _.filter(books, { authorId: parent.id })
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  //each root query is a field, root query is where in graph you'd like to retrieve data from
  fields: {
    book: {
      type: BookType,
      //takes an id
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books
        return Book.find({});
      },
    },
    author: {
      type: AuthorType,
      //takes an id
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
        // code to get data from db / other source
        // return _.find(authors, { id: args.id });
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        //create new author obj with mongoose
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        //create new author obj with mongoose
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

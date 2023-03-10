# Books app

Made following the tutorial [GraphQL Full Course - Novice to Expert | freecodecamp](https://www.youtube.com/watch?v=ed8SzALpx1Q&t=85s)


- We got relational data from the books using `Type Relations` within GraphQL, so we can find authors for each book when they're not actually attached within the database
- Can add new books from frontend using GraphQL Mutation
- Can query all books and recieve data onClick of each book title directly from DB


### Client 
- React
- Apollo

#### Testing queries
- GraphiQL
- Loadash 

### Server 
- Node.JS
- Express
- GraphQL


### Database 
- MongoDB Atlas


---

```
cd server
npx nodemon app

cd client
npm start
```

Create a mongoDB Atlas
Add to .env file

```
MONGO_DB_USERNAME
MONGO_DB_PASSWORD
```
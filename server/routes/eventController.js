const express = require("express");
const eventRouter = express.Router();
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const { buildSchema } = require("graphql");

eventRouter.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
      time: String!
    } 

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(name: String): String
    }
      schema{
        query: RootQuery
        mutation: RootMutation
      }
    `),
    //all resolver functions need to match schema
    rootValue: {
      events: () => {
        return ["New Room", "Reoccurring Room", "Old Room"];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
      },
    },
    graphiql: true,
  })
);

module.exports = eventRouter;

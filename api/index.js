// GraphQL Server - Configuration
// JS imports
const { ApolloServer, gql } = require("apollo-server");
const KeywordsAPI = require('./KeywordsAPI');

// Types
const typeDefs = gql`
  type Term {
    word: String!
  }
  type Category {
    keywords: [Term]
  }
  type Query {
    getRelatedKeywords(category: String!): Category
  }
`;
// Resolvers
const resolvers = {
  Query: {
    getRelatedKeywords: async (_source, { category }, { dataSources}) => {
      return {
        keywords: dataSources.keywordsAPI.getKeywords(category)
      }
    }
  }
};
// Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      keywordsAPI: new KeywordsAPI()
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// Import ApolloServer from apollo-server package
const { ApolloServer } = require("apollo-server"); 

// Import importSchema function from graphql-import package
const { importSchema } = require("graphql-import");

// Import EtherDataSource class 
const EtherDataSource = require("./datasource/ethDatasource");

// Import GraphQL schema from schema.graphql file
const typeDefs = importSchema("./schema.graphql"); 

// Load environment variables from .env file
require("dotenv").config();

// Define resolvers map
const resolvers = {
  Query: {

    // Resolver to get ether balance for an address
    etherBalanceByAddress: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver to get total ether supply
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver to get latest Ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver to get average block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  
  // Pass EtherDataSource instance to dataSources
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),
});

// Set timeout to 0 (no timeout)
server.timeout = 0;

// Start server on port 9000
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});

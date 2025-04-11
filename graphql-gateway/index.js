// import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
// import dotenv from 'dotenv';

// import { typeDefs as notificationTypeDefs } from './schemas/notification.schema.js';
// import { notificationResolvers } from './resolvers/notification.resolver.js';

// dotenv.config();

// // You can scale this by adding more typedefs and resolvers later:
// const server = new ApolloServer({
//   typeDefs: [notificationTypeDefs],
//   resolvers: [notificationResolvers],
// });

// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });

// console.log(`🚀 GraphQL Gateway running at ${url}`);
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schemas/notification.schema.js';
import resolvers from './resolvers/notification.resolver.js';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 GraphQL Gateway running at ${url}`);
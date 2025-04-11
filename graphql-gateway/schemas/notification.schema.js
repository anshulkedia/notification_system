// import { gql } from 'graphql-tag';
// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

// export const typeDefs = gql`
//   type Notification {
//     _id: ID!
//     userId: String!
//     type: String!
//     content: String!
//     read: Boolean!
//     sentAt: String!
//   }

//   type Query {
//     getUserNotifications(userId: String!): [Notification]
//   }
// `;

// export const resolvers = {
//   Query: {
//     getUserNotifications: async (_, { userId }) => {
//       try {
//         const response = await axios.get(`${process.env.NOTIFICATION_SERVICE_URL}/notifications/${userId}`);
//         return response.data;
//       } catch (error) {
//         console.error('Failed to fetch notifications:', error);
//         throw new Error('Unable to fetch notifications');
//       }
//     },
//   },
// };

import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Notification {
    _id: ID!
    userId: String!
    type: String!
    content: String!
    read: Boolean!
    sentAt: String!
  }

  type Query {
    getUserNotifications(userId: String!): [Notification]
  }
`;

export default typeDefs;
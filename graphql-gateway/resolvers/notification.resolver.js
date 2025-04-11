// graphql-gateway/resolvers/notification.resolver.js
// import { getUserNotificationsFromAPI } from '../utils/api.js';

// export const notificationResolvers = {
//   Query: {
//     getUserNotifications: async (_, { userId }) => {
//       return await getUserNotificationsFromAPI(userId);
//     },
//   },
// };
//This is basically where we define the resolver logic — you’ve already written this inline in the schema file earlier, 
// but now we’ll move it out to keep things modular and clean.

import { getUserNotificationsFromAPI } from '../utils/api.js';

const resolvers = {
  Query: {
    getUserNotifications: async (_, { userId }) => {
      return await getUserNotificationsFromAPI(userId);
    },
  },
};

export default resolvers;
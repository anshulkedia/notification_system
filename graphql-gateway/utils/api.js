// graphql-gateway/utils/api.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const getUserNotificationsFromAPI = async (userId) => {
  try {
    const response = await axios.get(`${process.env.NOTIFICATION_SERVICE_URL}/api/notifications/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications from microservice:', error.message);
    throw new Error('Could not retrieve notifications');
  }
};

// This file will contain all external API call logic, like talking to the notification microservice using Axios.

# GraphQL Gateway

This is the GraphQL layer for the notification system project. It fetches data from the notification microservice and exposes it using a unified API.

## Features

- Query notifications by userId
- Uses Apollo Server
- Calls notification-service API using Axios

## Setup

1. Create a `.env` file:

```
NOTIFICATION_SERVICE_URL=http://localhost:3002
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

Go to `http://localhost:4000` and test using the playground.

## Query Example

```graphql
query {
  getUserNotifications(userId: "123456") {
    _id
    type
    content
    sentAt
  }
}
```

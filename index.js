const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Set the port for the server to listen on
const PORT = process.env.PORT || 3001;

// Create an instance of the Express application
const app = express();

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount the routes
app.use(routes);

// Connect to the database and start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for your Social Network running on port ${PORT}!`);
  });
});
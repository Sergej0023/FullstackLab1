import express from 'express';  // Import Express for server functionality
import cors from 'cors';  // Import CORS middleware for handling cross-origin requests
import { router } from './src/route/index.js';  // Import your main router
import databaseService from "./src/service/databaseService.js";  // Import your database service

// Connect to the database
await databaseService.connect();

const PORT = process.env.PORT;  // Get the port from the environment variables
const app = express();  // Create an instance of the Express app

// Serve static files (e.g., HTML, CSS, JS, images) from the 'public' directory
app.use(express.static('public'));

// Parse incoming JSON requests
app.use(express.json());

// Use the imported router for all routes
app.use('/', router);

// Start the server on the specified port
app.listen(PORT, () => {
    console.log("Listening on port " + PORT);  // Log a message when the server is ready
});

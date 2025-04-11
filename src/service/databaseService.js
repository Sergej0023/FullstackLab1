import mongoose, { Schema } from 'mongoose';

class DatabaseService {
    #db = null;  // Private field to hold the database connection
    schema = null;  // Schema for the 'dish' collection
    dish = null;  // Model for interacting with the 'dish' collection

    // Method to establish connection to the MongoDB database
    async connect() {
        console.log('Trying to connect to the database...');
        try {
            // Connect to the MongoDB database using Mongoose
            this.#db = await mongoose.connect(process.env.CONNECTION_URI);
            console.log('Connection to DB successful.');

            // Define the schema for the 'dish' collection
            this.schema = new Schema(
                {
                    name: String,
                    ingredients: [String],
                    preparationSteps: [String],
                    origin: String,
                    spiceLevel: String,  // Add spiceLevel to your dish schema
                },
                { collection: 'dish' }  // Specify the collection name
            );

            // Create the model using the schema
            this.dish = mongoose.model('dish', this.schema);

        } catch (err) {
            // Catch any errors during connection
            console.log('Error with connection: ' + err);
        }
    }

    // Method to disconnect from the MongoDB database
    async disconnect() {
        try {
            // Only attempt to disconnect if there is an active connection
            if (this.#db) {
                await mongoose.disconnect();  // Disconnect from the database
                console.log('Database disconnected.');
            }
        } catch (err) {
            // Catch any errors during disconnection
            console.log('Error while disconnecting: ' + err);
        }
    }
}

export default new DatabaseService();

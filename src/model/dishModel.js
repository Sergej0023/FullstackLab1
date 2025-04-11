import databaseService from "../service/databaseService.js"  // Import the database service

class DishModel {

    // Fetch all dishes from the database
    async getAllDishes() {
        try {
            return await databaseService.dish.find();  // Get all dishes
        } catch (err) {
            console.log("Error fetching all dishes:", err);  // Log specific error message
            throw new Error("Could not fetch dishes");  // Propagate the error for higher-level handling
        }
    }

    // Fetch a specific dish by name
    async getDishByName(name) {
        try {
            return await databaseService.dish.findOne({ 'name': name });  // Search for the dish by name
        } catch (err) {
            console.log("Error fetching dish by name:", err);  // Log specific error message
            throw new Error("Could not fetch dish by name");  // Propagate the error for higher-level handling
        }
    }

    // Add a new dish to the database
    async addDish(dish) {
        try {
            return await databaseService.dish.create(dish);  // Create a new dish
        } catch (err) {
            console.log("Error adding dish:", err);  // Log specific error message
            throw new Error("Could not add the dish");  // Propagate the error for higher-level handling
        }
    }

    // Delete a dish by ID
    async deleteDish(id) {
        try {
            return await databaseService.dish.findOneAndDelete({ '_id': id });  // Find and delete the dish by ID
        } catch (err) {
            console.log("Error deleting dish:", err);  // Log specific error message
            throw new Error("Could not delete the dish");  // Propagate the error for higher-level handling
        }
    }

    // Fetch a specific dish by ID
    async getDishById(id) {
        try {
            return await databaseService.dish.findOne({ '_id': id });  // Find the dish by ID
        } catch (err) {
            console.log("Error fetching dish by ID:", err);  // Log specific error message
            throw new Error("Could not fetch dish by ID");  // Propagate the error for higher-level handling
        }
    }

    // Update a dish's information by ID
    async putDish(id, body) {
        try {
            // Update the dish with the new data (name, ingredients, etc.)
            return await databaseService.dish.findByIdAndUpdate(
                { '_id': id },  // Search by the dish's ID
                {
                    'name': body.name,
                    'ingredients': body.ingredients,
                    'preparationSteps': body.preparationSteps,
                    'origin': body.origin,
                    'spiceLevel': body.spiceLevel,
                },
                { new: true }  // Return the updated document
            );
        } catch (err) {
            console.log("Error updating dish:", err);  // Log specific error message
            throw new Error("Could not update the dish");  // Propagate the error for higher-level handling
        }
    }
}

export default new DishModel();  // Export the DishModel as a singleton

import dishModel from '../model/dishModel.js'  // Import the dish model for database operations

class DishesController {

    // Fetch all dishes
    async getAllDishes(req, res) {
        try {
            const dishes = await dishModel.getAllDishes();  // Get all dishes from the model
            res.json(dishes);  // Return dishes as JSON response
        } catch (err) {
            console.log(err);  // Log any errors
            res.status(500).json({ message: 'Server Error' });  // Handle any server errors
        }
    }

    // Fetch a specific dish by its name
    async getDishByName(req, res) {
        try {
            const { name } = req.params;  // Get the dish name from request params
            const dish = await dishModel.getDishByName(name);  // Get dish by name from the model
            if (!dish) {
                return res.status(404).json({ message: 'Dish not found' });  // Return 404 if not found
            }
            res.json(dish);  // Return the dish as JSON response
        } catch (err) {
            console.log(err);  // Log any errors
            res.status(500).json({ message: 'Server Error' });  // Handle server errors
        }
    }

    // Add a new dish to the database
    async postDish(req, res) {
        try {
            const newDish = req.body;  // Get the new dish from the request body
            const existingDish = await dishModel.getDishByName(newDish.name);  // Check if the dish already exists
            if (existingDish) {
                return res.status(409).json({ message: 'Dish already exists!' });  // Return conflict status if exists
            }
            const createDish = await dishModel.addDish(newDish);  // Add new dish to the model
            res.status(201).json(createDish);  // Return the created dish with a 201 status
        } catch (err) {
            console.log(err);  // Log any errors
            res.status(500).json({ message: 'Server Error' });  // Handle server errors
        }
    }

    // Delete a dish by its ID
    async deleteDish(req, res) {
        try {
            const { id } = req.params;  // Get the dish ID from request params
            const existingDish = await dishModel.getDishById(id);  // Check if the dish exists by ID
            if (!existingDish) {
                return res.status(404).json({ message: 'Dish not found!' });  // Return 404 if not found
            }

            const deleteDish = await dishModel.deleteDish(id);  // Delete the dish from the model
            res.json({ message: 'Dish is deleted', deleteDish });  // Return success message
        } catch (err) {
            console.log(err);  // Log any errors
            res.status(500).json({ message: 'Server Error' });  // Handle server errors
        }
    }

    // Update a dish by its ID
    async putDish(req, res) {
        const { id } = req.params;  // Get the dish ID from request params
        const body = req.body;  // Get the updated dish data from the request body

        const existingDish = await dishModel.getDishById(id);  // Check if the dish exists by ID
        if (!existingDish) {
            return res.status(404).json({ message: 'Dish not found!' });  // Return 404 if not found
        }

        const putDish = await dishModel.putDish(id, body);  // Update the dish in the model
        console.log(putDish);  // Log the updated dish (for debugging)
        res.json({ putDish });  // Return the updated dish as JSON response
    }
}

export default new DishesController();  // Export the controller as a singleton

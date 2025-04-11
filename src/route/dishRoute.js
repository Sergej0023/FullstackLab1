import express from "express";  // Import Express for creating the router
import controller from '../controller/dishController.js';  // Import the dish controller

export const router = express.Router();  // Create a new instance of Router

// Route to get all dishes
router.get('/dishes', (req, res) => {
    controller.getAllDishes(req, res);  // Call the getAllDishes method in the controller
});

// Route to get a dish by its name
router.get('/dishes/:name', (req, res) => {
    controller.getDishByName(req, res);  // Call the getDishByName method in the controller
});

// Route to create a new dish
router.post('/dishes', (req, res) => {
    controller.postDish(req, res);  // Call the postDish method in the controller
});

// Route to delete a dish by its ID
router.delete('/dishes/:id', (req, res) => {
    controller.deleteDish(req, res);  // Call the deleteDish method in the controller
});

// Route to update a dish by its ID
router.put('/dishes/:id', (req, res) => {
    controller.putDish(req, res);  // Call the putDish method in the controller
});
document.addEventListener("DOMContentLoaded", function() {
    // DOM Elements
    const dishTableBody = document.getElementById('dishList'); // Table body where dishes will be listed
    const dishForm = document.getElementById('dishForm'); // Form for adding/editing dishes
    const dishNameInput = document.getElementById('dishName'); // Input for dish name
    const dishIngredientsInput = document.getElementById('dishIngredients'); // Input for dish ingredients
    const dishPreparationStepsInput = document.getElementById('dishPreparationSteps'); // Input for preparation steps
    const dishOriginInput = document.getElementById('dishOrigin'); // Input for dish origin
    const dishSpiceLevelInput = document.getElementById('spiceLevel');
    const editDishBtn = document.getElementById('editDishBtn'); // Button to trigger updating a dish



    const addDishBtn = document.getElementById('addDishBtn');
    const newDishName = document.getElementById('newDishName');
    const newDishIngredients = document.getElementById('newDishIngredients');
    const newDishPreparationSteps = document.getElementById('newDishPreparationSteps');
    const newDishOrigin = document.getElementById('newDishOrigin');
    const newSpiceLevel = document.getElementById('newSpiceLevel');


    let currentDishId = null; // Holds the ID of the dish being edited

    // Fetch all dishes from the API
    function fetchDishes() {
        fetch("http://localhost:5000/api/dishes")
            .then(response => response.json())
            .then(data => {
                dishTableBody.innerHTML = ''; // Clear the existing table content

                // Loop through all dishes and create rows for the table
                data.forEach(dish => {
                    const dishRow = document.createElement('tr');
                    dishRow.setAttribute("data-dish-id", dish._id); // Store the dish ID in the row

                    // Convert ingredients and preparation steps into list items
                    const ingredientsList = dish.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
                    const preparationStepsList = dish.preparationSteps.map(step => `<li>${step}</li>`).join('');

                    // Create the row HTML structure
                    dishRow.innerHTML = `
                        <td>${dish.name}</td>
                        <td><ul>${ingredientsList}</ul></td>
                        <td><ul>${preparationStepsList}</ul></td>
                        <td>${dish.origin}</td>
                        <td>${dish.spiceLevel}</td>
                        <td>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                            <div class="delete-confirmation" style="display: none;">
                                <button class="confirm-delete">Yes</button>
                                <button class="cancel-delete">No</button>
                            </div>
                        </td>
                    `;
                    dishTableBody.appendChild(dishRow); // Append the row to the table
                });

                // Add event listeners for Edit and Delete buttons
                addEventListeners();
            })
            .catch(error => console.error('Error fetching dishes:', error));
    }

    // Add event listeners to all Edit and Delete buttons
    function addEventListeners() {
        // Handle Edit button clicks
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = button.closest('tr');
                const dishId = row.getAttribute('data-dish-id'); // Get the dish ID from the row
                const name = row.cells[0].textContent;
                const ingredients = Array.from(row.cells[1].querySelectorAll('li')).map(li => li.textContent).join(', ');
                const preparationSteps = Array.from(row.cells[2].querySelectorAll('li')).map(li => li.textContent).join(', ');
                const origin = row.cells[3].textContent;
                const spiceLevel = row.cells[4].textContent;

                // Open the form to edit the dish
                editDish(dishId, name, ingredients, preparationSteps, origin, spiceLevel);
            });
        });

        // Handle Delete button clicks
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = button.closest('tr');
                const confirmation = row.querySelector('.delete-confirmation');
                confirmation.style.display = 'block'; // Show confirmation dialog
                button.style.display = 'none'; // Hide original delete button
            });
        });

        // Handle confirm delete button clicks
        const confirmDeleteButtons = document.querySelectorAll('.confirm-delete');
        confirmDeleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = button.closest('tr');
                const dishId = row.getAttribute('data-dish-id'); // Get the dish ID
                deleteDish(row, dishId); // Call delete function
            });
        });

        // Handle cancel delete button clicks
        const cancelDeleteButtons = document.querySelectorAll('.cancel-delete');
        cancelDeleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = button.closest('tr');
                const deleteButton = row.querySelector('.delete-btn');
                const confirmation = row.querySelector('.delete-confirmation');

                confirmation.style.display = 'none'; // Hide confirmation dialog
                deleteButton.style.display = 'block'; // Show original delete button again
            });
        });
    }

    // Function to edit a dish (populate form with the current values)
    function editDish(id, name, ingredients, preparationSteps, origin, spiceLevel) {
        currentDishId = id; // Set the current dish ID
        dishNameInput.value = name; // Set the dish name in the form
        dishIngredientsInput.value = ingredients; // Set the ingredients in the form
        dishPreparationStepsInput.value = preparationSteps; // Set the preparation steps in the form
        dishOriginInput.value = origin; // Set the origin in the form
        dishSpiceLevelInput.value = spiceLevel;

        dishForm.style.display = 'block'; // Show the form
    }

    // Handle the update dish button click (when the form is submitted)
    editDishBtn.addEventListener('click', function() {
        const name = dishNameInput.value;
        const ingredients = dishIngredientsInput.value.split(',').map(item => item.trim()); // Split ingredients into an array
        const preparationSteps = dishPreparationStepsInput.value.split(',').map(item => item.trim()); // Split steps into an array
        const origin = dishOriginInput.value;
        const spiceLevel = dishSpiceLevelInput.value;

        // Validate the input before updating
        if (currentDishId && name.trim() && ingredients.length && preparationSteps.length && origin.trim() && spiceLevel.trim()) {
            fetch(`http://localhost:5000/api/dishes/${currentDishId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, ingredients, preparationSteps, origin , spiceLevel }),
            })
                .then(response => response.json())
                .then(() => {
                    // Clear the form after successful update
                    dishNameInput.value = '';
                    dishIngredientsInput.value = '';
                    dishPreparationStepsInput.value = '';
                    dishOriginInput.value = '';
                    dishSpiceLevelInput.value = '';
                    dishForm.style.display = 'none'; // Hide the form

                    // Refresh the list of dishes
                    fetchDishes();
                })
                .catch(error => console.error('Error updating dish:', error));
        } else {
            alert("Please fill in all fields correctly."); // Show error if validation fails
        }
    });

    // Function to delete a dish
    function deleteDish(row, dishId) {
        fetch(`http://localhost:5000/api/dishes/${dishId}`, {
            method: 'DELETE' // Send DELETE request to the server
        })
            .then(response => response.json())
            .then(() => {
                row.remove(); // Remove the row from the table after deletion
            })
            .catch(error => console.error('Error deleting dish:', error));
    }


    addDishBtn.addEventListener('click', function () {
        const name = newDishName.value.trim();
        const ingredients = newDishIngredients.value.split(',').map(item => item.trim());
        const preparationSteps = newDishPreparationSteps.value.split(',').map(item => item.trim());
        const origin = newDishOrigin.value.trim();
        const spiceLevel = newSpiceLevel.value.trim();

        if (name && ingredients.length && preparationSteps.length && origin && spiceLevel) {
            fetch('http://localhost:5000/api/dishes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, ingredients, preparationSteps, origin, spiceLevel })
            })
                .then(response => response.json())
                .then(() => {
                    // Clear form
                    newDishName.value = '';
                    newDishIngredients.value = '';
                    newDishPreparationSteps.value = '';
                    newDishOrigin.value = '';
                    newSpiceLevel.value = '';

                    // Refresh dish list
                    fetchDishes();
                })
                .catch(error => console.error('Error adding dish:', error));
        } else {
            alert("Please fill out all fields to add a new dish.");
        }
    });

    // Initial fetch of dishes when the page loads
    fetchDishes();
});

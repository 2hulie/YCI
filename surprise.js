document.addEventListener('DOMContentLoaded', function () {
    const surpriseButton = document.getElementById('surprise-button');

    // Define the recipe options for each meal type
    const recipes = {
        breakfast: ['breakfast1.html', 'breakfast2.html', 'breakfast3.html'],
        lunch: ['lunch1.html', 'lunch2.html', 'lunch3.html'],
        dinner: ['dinner1.html', 'dinner2.html', 'dinner3.html'],
        snack: ['snack1.html', 'snack2.html', 'snack3.html']
    };

    // Function to get a random recipe from a meal type
    function getRandomRecipe(mealType) {
        const options = recipes[mealType];
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    }

    // Add event listener to the surprise button
    surpriseButton.addEventListener('click', function () {
        // You can determine which meal type to surprise the user with
        const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
        const randomMealType = mealTypes[Math.floor(Math.random() * mealTypes.length)];

        // Get a random recipe for the chosen meal type
        const randomRecipe = getRandomRecipe(randomMealType);

        // Redirect to the chosen recipe
        window.location.href = randomRecipe;
    });
});

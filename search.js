document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('suggestions');

    // List of HTML files to fetch titles from
    const recipeFiles = [
        'breakfast1.html',
        'breakfast2.html',
        'breakfast3.html',
        'lunch1.html',
        'lunch2.html',
        'lunch3.html',
        'dinner1.html',
        'dinner2.html',
        'dinner3.html',
        'snack1.html',
        'snack2.html',
        'snack3.html'
    ];

    // Store titles for suggestions
    let titles = [];

    // Function to fetch titles from the given HTML files
    async function fetchTitles() {
        const fetchPromises = recipeFiles.map(file =>
            fetch(file)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.text();
                })
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const h2Elements = doc.querySelectorAll('h2');
                    h2Elements.forEach(h2 => {
                        titles.push(h2.innerText); // Collect titles
                    });
                })
                .catch(error => console.error('Error fetching titles:', error)) // Handle errors
        );

        await Promise.all(fetchPromises); // Wait for all fetches to complete
    }

    // Fetch titles when the page loads
    fetchTitles();

    // Function to apply the custom cursor style to suggestions
    function applyCustomCursor() {
        suggestionsContainer.style.cursor = 'url("assets/cursor_select.svg"), pointer';
        // Optionally, you can apply the same for each suggestion item:
        const suggestionItems = document.querySelectorAll('.suggestion-item');
        suggestionItems.forEach(item => {
            item.style.cursor = 'url("assets/cursor_select.svg"), pointer';
        });
    }

    // Event listener for search input
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        suggestionsContainer.innerHTML = ''; // Clear previous suggestions

        if (query) {
            const filteredTitles = titles.filter(title => title.toLowerCase().includes(query));
            if (filteredTitles.length === 0) {
                suggestionsContainer.style.display = 'none'; // Hide suggestions if no matches
                searchInput.placeholder = 'No suggestions found'; // Update placeholder
            } else {
                filteredTitles.forEach(title => {
                    const suggestion = document.createElement('div');
                    suggestion.classList.add('suggestion-item');
                    suggestion.innerText = title;
                    suggestion.addEventListener('click', function () {
                        searchInput.value = title; // Set input value to clicked title
                        suggestionsContainer.innerHTML = ''; // Clear suggestions
                        window.location.href = mapTitleToPage(title); // Redirect
                    });
                    suggestionsContainer.appendChild(suggestion);
                });
                suggestionsContainer.style.display = 'block'; // Show suggestions if there are any
                applyCustomCursor(); // Reapply custom cursor for suggestions

                searchInput.placeholder = 'Search for recipe'; // Reset placeholder when there are matches
            }
        } else {
            suggestionsContainer.style.display = 'none'; // Hide suggestions when input is empty
            searchInput.placeholder = 'Search for recipe'; // Reset placeholder
        }
    });

    // Function to map title to corresponding HTML page
    function mapTitleToPage(title) {
        const titleToPageMap = {
            'Goto Lugaw': 'breakfast1.html',
            'Tortang Talong': 'breakfast2.html',
            'Champorado': 'breakfast3.html',
            'Sinigang na Baboy': 'lunch1.html',
            'Fried Chicken': 'lunch2.html',
            'Chicken Curry': 'lunch3.html',
            'Crispy Pork Sisig': 'dinner1.html',
            'Pork Dinakdakan': 'dinner2.html',
            'Fried Cream Dory': 'dinner3.html',
            'Homemade Chocolate Ice Cream': 'snack1.html',
            'Mango Float': 'snack2.html',
            'Cheesy Buchi': 'snack3.html'
        };
        return titleToPageMap[title] || 'breakfast.html'; // Default redirection if no match
    }

    // Search button functionality
    document.getElementById('search-button').addEventListener('click', function () {
        const query = searchInput.value.trim(); // Get the current input value
        if (query) {
            const matchingTitle = titles.find(title => title.toLowerCase() === query.toLowerCase());
            if (matchingTitle) {
                // Redirect to the corresponding page
                window.location.href = mapTitleToPage(matchingTitle);
            } else {
                // Update placeholder with no matching message
                searchInput.placeholder = 'No matching recipe found'; // Update placeholder
                searchInput.value = ''; // Clear the input field
            }
        } else {
            searchInput.placeholder = 'Please enter a recipe name to search'; // Update placeholder
        }
    });

    // Listen for Enter key press to trigger the search button action
    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                const matchingTitle = titles.find(title => title.toLowerCase() === query.toLowerCase());
                if (matchingTitle) {
                    // Redirect to the corresponding page
                    window.location.href = mapTitleToPage(matchingTitle);
                } else {
                    // Update placeholder with no matching message
                    searchInput.placeholder = 'No matching recipe found';
                    searchInput.value = ''; // Clear the input field
                }
            } else {
                searchInput.placeholder = 'Please enter a recipe name to search';
            }
        }
    });

    // Close suggestions if clicking outside of the input or suggestions
    document.addEventListener('click', function (event) {
        if (!searchInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
            suggestionsContainer.style.display = 'none'; // Hide suggestions
        }
    });

    // Reapply cursor style on visibility change
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') {
            applyCustomCursor(); // Reapply cursor when the page becomes visible again
        }
    });
});

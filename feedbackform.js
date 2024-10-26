document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this); // Create a FormData object from the form

    // Send data to Formspree using Fetch API
    fetch('https://formspree.io/f/mldernaj', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json' // Specify that we accept JSON response
        }
    })
    .then(response => {
        if (response.ok) {
            // If the response is OK, show success message
            alert('Your feedback has been sent successfully!');
            document.getElementById('feedback-text').value = ''; // Clear the textarea
        } else {
            // If there is an error, show an error message
            alert('There was a problem sending your feedback. Please try again.');
        }
    })
    .catch(error => {
        // Handle any errors that may occur
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    });
});

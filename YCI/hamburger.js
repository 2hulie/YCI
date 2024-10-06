document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuContainer = document.querySelector('.menu-container');

    // Toggle the active class on click
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        menuContainer.classList.toggle('active'); // Toggle active class on menu
    });
});
// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
    } else {
        navbar.classList.remove('scrolled');
        navbar.classList.add('transparent');
    }
})

// Initialize navbar as transparent
navbar.classList.add('transparent');
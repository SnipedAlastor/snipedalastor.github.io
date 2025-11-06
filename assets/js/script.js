// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
    } else {
        // Only remove scrolled if dropdown is closed
        const featuredDropdown = document.getElementById('featuredDropdown');
        if (featuredDropdown && !featuredDropdown.classList.contains('open')) {
            navbar.classList.remove('scrolled');
            navbar.classList.add('transparent');
        }
    }
});

// Initialize navbar as transparent
navbar.classList.add('transparent');

// === LOGO EXPANSION EFFECT ===
const logoLink = document.getElementById('logoLink');
const logoText = logoLink.querySelector('.logo-text');

// Animation states
const stages = [
    'SS',
    'Sc St',
    'Sco Stu',
    'Scor Stud',
    'Scori Studi',
    'Scoria Studio',
    'Scoria Studios'
];

let currentStage = 0;
let isExpanding = false;
let animationInterval;

// Expand logo on hover
logoLink.addEventListener('mouseenter', () => {
    if (isExpanding) return;
    isExpanding = true;
    currentStage = 0;
    
    animationInterval = setInterval(() => {
        if (currentStage < stages.length) {
            logoText.textContent = stages[currentStage];
            currentStage++;
        } else {
            clearInterval(animationInterval);
            isExpanding = false;
        }
    }, 50);
});

// Collapse logo on mouse leave
logoLink.addEventListener('mouseleave', () => {
    clearInterval(animationInterval);
    isExpanding = false;
    currentStage = 0;
    
    let reverseStage = stages.length - 1;
    const reverseInterval = setInterval(() => {
        if (reverseStage >= 0) {
            logoText.textContent = stages[reverseStage];
            reverseStage--;
        } else {
            clearInterval(reverseInterval);
        }
    }, 50);
});

// === MOBILE MENU TOGGLE ===
const menuToggle = document.getElementById('menuToggle');
const menuIcon = document.getElementById('menuIcon');
const navMenu = document.getElementById('navMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        
        // Change icon
        if (navMenu.classList.contains('active')) {
            menuIcon.textContent = '✕';
        } else {
            menuIcon.textContent = '☰';
        }
    });

    // Close menu when clicking overlay
    mobileOverlay.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        menuIcon.textContent = '☰';
    });

    // Close menu when clicking a link (optional)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileOverlay.classList.remove('active');
                menuIcon.textContent = '☰';
            }
        });
    });
}

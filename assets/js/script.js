// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
    } else {
        // Only remove scrolled if dropdown is closed
        if (!featuredDropdown.classList.contains('open')) {
            navbar.classList.remove('scrolled');
            navbar.classList.add('transparent');
        }
    }
});

// Initialize navbar as transparent
navbar.classList.add('transparent');

// ========== LOGO EXPANSION EFFECT ==========
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

// ========== FEATURED GAMES DROPDOWN ==========
const gamesToggle = document.getElementById('gamesToggle');
const gamesArrow = document.getElementById('gamesArrow');
const featuredDropdown = document.getElementById('featuredDropdown');
const featuredGamesGrid = document.getElementById('featuredGamesGrid');

let isDropdownOpen = false;

// Toggle dropdown
gamesToggle.addEventListener('click', (e) => {
    e.preventDefault();
    isDropdownOpen = !isDropdownOpen;
    
    if (isDropdownOpen) {
        // Open dropdown
        featuredDropdown.classList.add('open');
        gamesToggle.classList.add('active');
        gamesArrow.classList.add('rotated');
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
        
        // Load games if not already loaded
        if (featuredGamesGrid.children.length === 0) {
            loadFeaturedGames();
        }
    } else {
        // Close dropdown
        featuredDropdown.classList.remove('open');
        gamesToggle.classList.remove('active');
        gamesArrow.classList.remove('rotated');
        
        // Check scroll position
        if (window.scrollY <= 50) {
            navbar.classList.remove('scrolled');
            navbar.classList.add('transparent');
        }
    }
});

// Load featured games from JSON
async function loadFeaturedGames() {
    try {
        const response = await fetch('games.json');
        const data = await response.json();
        const games = data.featuredGames.slice(0, 5); // Get max 5 games
        
        featuredGamesGrid.innerHTML = '';
        
        games.forEach(game => {
            const gameCard = document.createElement('a');
            gameCard.href = game.link;
            gameCard.className = 'game-card';
            
            gameCard.innerHTML = `
                <img src="${game.image}" alt="${game.title}">
                <div class="game-card-overlay">
                    <div class="game-card-title">${game.title}</div>
                </div>
            `;
            
            featuredGamesGrid.appendChild(gameCard);
        });
    } catch (error) {
        console.error('Error loading featured games:', error);
        featuredGamesGrid.innerHTML = '<p style="color: #fff; text-align: center;">Failed to load games</p>';
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (isDropdownOpen && 
        !featuredDropdown.contains(e.target) && 
        !gamesToggle.contains(e.target)) {
        gamesToggle.click();
    }
});

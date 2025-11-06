// === FEATURED GAMES DROPDOWN ===
const gamesToggle = document.getElementById('gamesToggle');
const gamesArrow = document.getElementById('gamesArrow');
const featuredDropdown = document.getElementById('featuredDropdown');
const featuredGamesGrid = document.getElementById('featuredGamesGrid');

let isDropdownOpen = false;

// Inline games data
const gamesData = {
    "featuredGames": [
        {
            "id": 1,
            "title": "Barotraumatic",
            "image": "assets/images/featuredGames/barotraumatic.png",
            "link": "games/barotraumatic.html"
        },
    ]
};

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

// Load featured games
function loadFeaturedGames() {
    const games = gamesData.featuredGames.slice(0, 5);
    
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
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (isDropdownOpen && 
        !featuredDropdown.contains(e.target) && 
        !gamesToggle.contains(e.target)) {
        gamesToggle.click();
    }
});
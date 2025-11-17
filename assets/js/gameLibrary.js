// === GAME LIBRARY DATA ===
const gameLibraryData = {
    title: "Game Library",
    description: "All Scoria Studios titles, from upcoming releases like Barotraumatic to the classics.",
    topRow: [
        {
            id: 1,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        },
        {
            id: 2,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        },
        {
            id: 3,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        },
        {
            id: 4,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        },
        {
            id: 5,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        },
        {
            id: 6,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        },
        {
            id: 7,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        },
        {
            id: 8,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        }
    ],
    bottomRow: [
        {
            id: 9,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        },
        {
            id: 10,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        },
        {
            id: 11,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        },
        {
            id: 12,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        },
        {
            id: 13,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        },
        {
            id: 14,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        },
        {
            id: 15,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        },
        {
            id: 16,
            title: "Afloaters",
            image: "assets/images/game-library/afloaters.png",
            link: "afloaters.html"
        }
    ],
    viewAllLink: "games.html"
};

// === RENDER GAME LIBRARY ===
function renderGameLibrary() {
    const topRowContainer = document.getElementById('gameLibraryTopRow');
    const bottomRowContainer = document.getElementById('gameLibraryBottomRow');

    if (!topRowContainer || !bottomRowContainer) return;

    // Duplicate games for infinite scroll effect
    const topRowGames = [...gameLibraryData.topRow, ...gameLibraryData.topRow];
    const bottomRowGames = [...gameLibraryData.bottomRow, ...gameLibraryData.bottomRow];

    // Render Top Row (duplicated for seamless loop)
    topRowGames.forEach(game => {
        const gameCard = createGameCard(game);
        topRowContainer.appendChild(gameCard);
    });

    // Render Bottom Row (duplicated for seamless loop)
    bottomRowGames.forEach(game => {
        const gameCard = createGameCard(game);
        bottomRowContainer.appendChild(gameCard);
    });
}

// === CREATE GAME CARD ===
function createGameCard(game) {
    const card = document.createElement('a');
    card.href = game.link;
    card.className = 'game-card';

    card.innerHTML = `
        <img src="${game.image}" alt="${game.title}" class="game-card-image">
        <div class="game-card-overlay">
            <h3 class="game-card-title">${game.title}</h3>
        </div>
    `;

    return card;
}

// === INITIALIZE ===
document.addEventListener('DOMContentLoaded', () => {
    renderGameLibrary();
});

// === GAME LIBRARY DATA ===
const gameLibraryData = {
    title: "Game Library",
    description: "All Scoria Studios titles, from upcoming releases like Barotraumatic to the classics.",
    topRow: [
        {
            id: 1,
            title: "Barotraumatic",
            image: "assets/images/game-library/barotraumatic.jpg",
            link: "barotraumatic.html"
        },
        {
            id: 2,
            title: "KaxkekForge",
            image: "assets/images/game-library/kaxkekforge.png",
            link: "kaxkekforge.html"
        },
        {
            id: 3,
            title: "Barotraumatic",
            image: "assets/images/game-library/barotraumatic.jpg",
            link: "barotraumatic.html"
        },
        {
            id: 4,
            title: "Barotraumatic",
            image: "assets/images/game-library/barotraumatic.jpg",
            link: "barotraumatic.html"
        },
        {
            id: 5,
            title: "Barotraumatic",
            image: "assets/images/game-library/barotraumatic.jpg",
            link: "barotraumatic.html"
        },
        {
            id: 6,
            title: "Barotraumatic",
            image: "assets/images/game-library/barotraumatic.jpg",
            link: "barotraumatic.html"
        },
        {
            id: 7,
            title: "Barotraumatic",
            image: "assets/images/game-library/barotraumatic.jpg",
            link: "barotraumatic.html"
        },
        {
            id: 8,
            title: "Barotraumatic",
            image: "assets/images/game-library/barotraumatic.jpg",
            link: "barotraumatic.html"
        }
    ],
    bottomRow: [
        {
            id: 9,
            title: "Barotraumatic",
            image: "assets/images/game-library/barotraumatic.jpg",
            link: "barotraumatic.html"
        },
        {
            id: 10,
            title: "KaxkekForge",
            image: "assets/images/game-library/kaxkekforge.png",
            link: "kaxkekforge.html"
        },
        {
            id: 11,
            title: "Barotraumatic",
            image: "assets/images/game-library/barotraumatic.jpg",
            link: "barotraumatic.html"
        },
        {
            id: 12,
            title: "Barotraumatic",
            image: "assets/images/game-library/barotraumatic.jpg",
            link: "barotraumatic.html"
        },
        {
            id: 13,
            title: "Barotraumatic",
            image: "assets/images/game-library/barotraumatic.jpg",
            link: "barotraumatic.html"
        },
        {
            id: 14,
            title: "Barotraumatic",
            image: "assets/images/game-library/barotraumatic.jpg",
            link: "barotraumatic.html"
        },
        {
            id: 15,
            title: "Barotraumatic",
            image: "assets/images/game-library/barotraumatic.jpg",
            link: "barotraumatic.html"
        },
        {
            id: 16,
            title: "Barotraumatic",
            image: "assets/images/game-library/barotraumatic.jpg",
            link: "barotraumatic.html"
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

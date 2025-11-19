// === NEWS DATABASE ===
const newsData = [
    {
        id: 1,
        game: "Afloaters",
        category: "Afloaters",
        title: "Afloaters in Development!",
        image: "assets/images/news/afloaters.png",
        date: "November 17, 2025",
        link: "news/barotraumatic-development.html"
    }
];

// Function to get latest news
// Returns articles with highest IDs
function getLatestNews(limit = 4) {
    // Sort by ID in descending order (highest = newest)
    const sortedNews = [...newsData].sort((a, b) => b.id - a.id);
    
    // Return the top 'limit' articles
    return sortedNews.slice(0, limit);
}

// Function to get news by game
function getNewsByGame(gameName) {
    return newsData
        .filter(news => news.game.toLowerCase() === gameName.toLowerCase())
        .sort((a, b) => b.id - a.id); // Also sort by newest first
}

// Function to get news by ID
function getNewsById(id) {
    return newsData.find(news => news.id === id);
}

// Function to get all news sorted by newest
function getAllNews() {
    return [...newsData].sort((a, b) => b.id - a.id);
}

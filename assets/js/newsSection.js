// === NEWS SECTION ===
function initNewsSection() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;

    // Get latest 4 news articles
    const latestNews = getLatestNews(4);

    // Clear existing content
    newsGrid.innerHTML = '';

    // Create news cards
    latestNews.forEach((news, index) => {
        const newsCard = document.createElement('a');
        newsCard.href = news.link;
        newsCard.className = 'news-card';
        newsCard.style.animationDelay = `${index * 0.1}s`;

        newsCard.innerHTML = `
            <div class="news-image">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
                <div class="news-overlay"></div>
            </div>
            <div class="news-content">
                <span class="news-category">${news.category}</span>
                <h3 class="news-title">${news.title}</h3>
                <span class="news-date">${news.date}</span>
            </div>
        `;

        newsGrid.appendChild(newsCard);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNewsSection();
});

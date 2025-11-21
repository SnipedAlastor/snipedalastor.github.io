// === NEWSWIRE DYNAMIC LOADER ===

// Configuration
const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let allNews = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeNewswire();
});

// Initialize the newswire
function initializeNewswire() {
    allNews = [...newsData].sort((a, b) => b.id - a.id);
    
    if (allNews.length === 0) {
        showEmptyState();
        return;
    }
    
    loadHeroNews();
    loadNewsGrid();
    setupLoadMoreButton();
}

// Load the hero/featured news (latest news)
function loadHeroNews() {
    const heroContainer = document.getElementById('newsHero');
    if (!heroContainer || allNews.length === 0) return;
    
    const latestNews = allNews[0];
    
    heroContainer.innerHTML = `
        <a href="${latestNews.articleUrl}" class="news-hero" style="text-decoration: none; color: inherit; display: block;">
            <img src="${latestNews.image}" alt="${latestNews.title}" class="news-hero-image">
            <div class="news-hero-content">
                <span class="news-hero-category">${latestNews.category}</span>
                <span class="news-hero-date">${latestNews.date}</span>
                <h2 class="news-hero-title">${latestNews.title}</h2>
            </div>
        </a>
    `;
}

// Load news grid (excluding the hero news)
function loadNewsGrid() {
    const gridContainer = document.getElementById('newsGrid');
    if (!gridContainer) return;
    
    const newsToShow = allNews.slice(1);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentNews = newsToShow.slice(startIndex, endIndex);
    
    if (currentNews.length === 0 && currentPage === 1) {
        gridContainer.innerHTML = '<p class="loading">No more news available.</p>';
        return;
    }
    
    currentNews.forEach(news => {
        const newsCard = createNewsCard(news);
        gridContainer.appendChild(newsCard);
    });
    
    updateLoadMoreButton(newsToShow.length, endIndex);
}

// Create a news card element
function createNewsCard(news) {
    const card = document.createElement('a');
    card.href = news.articleUrl;
    card.className = 'news-card';
    card.style.textDecoration = 'none';
    card.style.color = 'inherit';
    card.style.display = 'block';
    
    card.innerHTML = `
        <img src="${news.image}" alt="${news.title}" class="news-card-image">
        <div class="news-card-content">
            <span class="news-card-category">${news.category}</span>
            <span class="news-card-date">${news.date}</span>
            <h3 class="news-card-title">${news.title}</h3>
        </div>
    `;
    
    return card;
}

// Setup load more button
function setupLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        loadNewsGrid();
    });
}

// Update load more button state
function updateLoadMoreButton(totalItems, currentEndIndex) {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const noMoreMessage = document.getElementById('noMoreNews');
    
    if (!loadMoreBtn) return;
    
    if (currentEndIndex >= totalItems) {
        loadMoreBtn.style.display = 'none';
        if (noMoreMessage) {
            noMoreMessage.classList.add('show');
        }
    } else {
        loadMoreBtn.style.display = 'inline-block';
        if (noMoreMessage) {
            noMoreMessage.classList.remove('show');
        }
    }
}

// Show empty state
function showEmptyState() {
    const heroContainer = document.getElementById('newsHero');
    const gridContainer = document.getElementById('newsGrid');
    const loadMoreSection = document.querySelector('.news-load-more');
    
    if (heroContainer) {
        heroContainer.innerHTML = `
            <div class="news-empty">
                <h2 class="news-empty-title">No News Available</h2>
                <p class="news-empty-text">Check back later for updates!</p>
            </div>
        `;
    }
    
    if (gridContainer) {
        gridContainer.innerHTML = '';
    }
    
    if (loadMoreSection) {
        loadMoreSection.style.display = 'none';
    }
}

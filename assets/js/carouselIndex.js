// === CAROUSEL DATA ===
const carouselData = [
    {
        id: 1,
        game: "Barotraumatic",
        logo: "assets/images/logos/barotraumatic.png",
        title: "BAROTRAUMATIC IN DEVELOPMENT",
        subtitle: "COMING 2027",
        background: "assets/images/carouselIndex/barotraumatic.png",
        buttons: [
            { text: "Watch Trailer", icon: "▶", link: "https://www.youtube.com/watch?v=YUOWk-o8vaM" },
            { text: "Explore News", icon: "", link: "#explore-barotraumatic" }
        ]
    },
    {
        id: 2,
        game: "KaxkekForge",
        logo: "assets/images/logos/kaxkekforge.png",
        title: "KAXKEKFORGE IN DEVELOPMENT",
        subtitle: "COMING LATE 2026",
        background: "assets/images/carouselIndex/barotraumatic.png",
        buttons: [
            { text: "Watch Trailer", icon: "▶", link: "https://www.youtube.com/watch?v=YUOWk-o8vaM" },
            { text: "Explore News", icon: "", link: "#explore-barotraumatic" }
        ]
    }
];

// === CAROUSEL VARIABLES ===
let currentSlide = 0;
let isPlaying = true;
let autoPlayInterval;
let progressInterval;
const SLIDE_DURATION = 5000; // 5 seconds
const PROGRESS_UPDATE_RATE = 50; // Update every 50ms

// Drag variables
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let dragThreshold = 100; // Minimum drag distance to trigger slide change

// === DOM ELEMENTS ===
const heroSection = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const carouselDotsContainer = document.querySelector('.carousel-dots');
const pausePlayBtn = document.querySelector('.carousel-pause');

// === INITIALIZE CAROUSEL ===
function initCarousel() {
    createDots();
    loadSlide(currentSlide);
    if (isPlaying) {
        startAutoPlay();
    }
    setupDragListeners();
}

// === CREATE DOTS ===
function createDots() {
    carouselDotsContainer.innerHTML = '';
    
    carouselData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === currentSlide) {
            dot.classList.add('active');
        }
        
        // Create progress bar inside dot
        const progress = document.createElement('div');
        progress.className = 'dot-progress';
        dot.appendChild(progress);
        
        // Click to navigate
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        
        carouselDotsContainer.appendChild(dot);
    });
}

// === LOAD SLIDE ===
function loadSlide(index) {
    const slide = carouselData[index];
    
    // Update background with fade effect
    heroSection.style.opacity = '0';
    
    setTimeout(() => {
        heroSection.style.backgroundImage = `url('${slide.background}')`;
        
        // Update content
        heroContent.innerHTML = `
            <div class="game-logo-index">
                <img src="${slide.logo}" alt="${slide.game} Logo" draggable="false">
            </div>
            <h2 class="hero-subtitle">${slide.subtitle}</h2>
            <h1 class="hero-title">${slide.title}</h1>
            <div class="hero-buttons">
                ${slide.buttons.map(btn => `
                    <a href="${btn.link}" class="btn-${btn.icon ? 'primary' : 'secondary'}">
                        ${btn.icon ? `<span class="btn-icon">${btn.icon}</span>` : ''}
                        ${btn.text}
                    </a>
                `).join('')}
            </div>
        `;
        
        heroSection.style.opacity = '1';
    }, 300);
    
    // Update dots
    updateDots();
}

// === UPDATE DOTS ===
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        const progress = dot.querySelector('.dot-progress');
        
        if (index === currentSlide) {
            dot.classList.add('active');
            progress.style.width = '0%';
        } else {
            dot.classList.remove('active');
            progress.style.width = '0%';
        }
    });
}

// === ANIMATE PROGRESS ===
function animateProgress() {
    const activeDot = document.querySelector('.dot.active .dot-progress');
    if (!activeDot) return;
    
    let progress = 0;
    const increment = (PROGRESS_UPDATE_RATE / SLIDE_DURATION) * 100;
    
    progressInterval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(progressInterval);
            return;
        }
        
        progress += increment;
        activeDot.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, PROGRESS_UPDATE_RATE);
}

// === AUTO PLAY ===
function startAutoPlay() {
    stopAutoPlay(); // Clear any existing intervals
    
    animateProgress();
    
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, SLIDE_DURATION);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
    clearInterval(progressInterval);
}

// === NAVIGATION ===
function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselData.length;
    loadSlide(currentSlide);
    if (isPlaying) {
        startAutoPlay();
    }
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + carouselData.length) % carouselData.length;
    loadSlide(currentSlide);
    if (isPlaying) {
        startAutoPlay();
    }
}

function goToSlide(index) {
    currentSlide = index;
    loadSlide(currentSlide);
    if (isPlaying) {
        startAutoPlay();
    }
}

// === DRAG/SWIPE FUNCTIONALITY ===
function setupDragListeners() {
    // Mouse events
    heroSection.addEventListener('mousedown', dragStart);
    heroSection.addEventListener('mousemove', drag);
    heroSection.addEventListener('mouseup', dragEnd);
    heroSection.addEventListener('mouseleave', dragEnd);
    
    // Touch events
    heroSection.addEventListener('touchstart', dragStart);
    heroSection.addEventListener('touchmove', drag);
    heroSection.addEventListener('touchend', dragEnd);
    
    // Prevent default drag behavior on images
    heroSection.addEventListener('dragstart', (e) => e.preventDefault());
}

function dragStart(e) {
    isDragging = true;
    startPos = getPositionX(e);
    
    // Stop auto-play while dragging
    if (isPlaying) {
        stopAutoPlay();
    }
    
    // Add dragging cursor
    heroSection.style.cursor = 'grabbing';
    
    // Cancel animation if running
    cancelAnimationFrame(animationID);
}

function drag(e) {
    if (!isDragging) return;
    
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
}

function dragEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    
    // Calculate drag distance
    const movedBy = currentTranslate - prevTranslate;
    
    // Determine if we should change slides
    if (movedBy < -dragThreshold && currentSlide < carouselData.length - 1) {
        // Dragged left - go to next slide
        nextSlide();
    } else if (movedBy > dragThreshold && currentSlide > 0) {
        // Dragged right - go to previous slide
        prevSlide();
    } else {
        // Not enough drag - stay on current slide
        if (isPlaying) {
            startAutoPlay();
        }
    }
    
    // Reset values
    currentTranslate = 0;
    prevTranslate = 0;
    
    // Reset cursor
    heroSection.style.cursor = 'grab';
}

function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

// === PAUSE/PLAY TOGGLE ===
pausePlayBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        pausePlayBtn.innerHTML = '❚❚';
        startAutoPlay();
    } else {
        pausePlayBtn.innerHTML = '▶';
        stopAutoPlay();
    }
});

// === KEYBOARD NAVIGATION ===
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === ' ') {
        e.preventDefault();
        pausePlayBtn.click();
    }
});

// === PAUSE ON HOVER ===
heroSection.addEventListener('mouseenter', () => {
    if (isPlaying && !isDragging) {
        stopAutoPlay();
    }
    heroSection.style.cursor = 'grab';
});

heroSection.addEventListener('mouseleave', () => {
    if (isPlaying && !isDragging) {
        startAutoPlay();
    }
    heroSection.style.cursor = 'default';
});

// === INITIALIZE ON PAGE LOAD ===
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});
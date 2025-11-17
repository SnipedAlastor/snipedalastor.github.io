// === FEATURED GAME SECTION DATA ===

// === VIDEO PLAYER ===
let featuredVideo;
let isVideoPlaying = false;

function initFeaturedGameSection() {
    featuredVideo = document.getElementById('featuredVideo');
    const playPauseBtn = document.getElementById('videoPlayPause');
    const videoOverlay = document.getElementById('videoOverlay');
    const logoOverlay = document.getElementById('videoLogoOverlay');

    if (!featuredVideo) return;

    // Play/Pause button click
    playPauseBtn.addEventListener('click', toggleVideoPlayback);
    videoOverlay.addEventListener('click', toggleVideoPlayback);

    // Video ended - loop
    featuredVideo.addEventListener('ended', () => {
        featuredVideo.currentTime = 0;
        featuredVideo.play();
    });

    // Update play/pause button when video state changes
    featuredVideo.addEventListener('play', () => {
        isVideoPlaying = true;
        playPauseBtn.innerHTML = '<span class="pause-icon">⏸</span>';
        videoOverlay.style.opacity = '0';
        videoOverlay.style.pointerEvents = 'none';
        
        // Hide logo when video plays
        logoOverlay.style.opacity = '0';
        logoOverlay.style.pointerEvents = 'none';
    });

    featuredVideo.addEventListener('pause', () => {
        isVideoPlaying = false;
        playPauseBtn.innerHTML = '<span class="play-icon">▶</span>';
        videoOverlay.style.opacity = '1';
        videoOverlay.style.pointerEvents = 'auto';
        
        // Show logo when video pauses
        logoOverlay.style.opacity = '1';
        logoOverlay.style.pointerEvents = 'auto';
    });

    // Initialize tabs
    initTabs();
}

function toggleVideoPlayback() {
    if (featuredVideo.paused) {
        featuredVideo.play();
    } else {
        featuredVideo.pause();
    }
}

// === TABS SYSTEM ===
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFeaturedGameSection();
});

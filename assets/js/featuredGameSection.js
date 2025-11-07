// === FEATURED GAME SECTION DATA ===
const featuredGameData = {
    logo: "assets/images/logos/barotraumatic-white.png",
    videoSrc: "assets/videos/barotraumatic-gameplay.mp4",
    videoPoster: "assets/images/featured/barotraumatic-poster.jpg",
    title: "Barotraumatic",
    description: "Explore the depths of Europa, a dynamic underwater world for cooperative survival gameplay, featuring all the terror and content since announcement, playable solo or with friends.",
    buttons: [
        { text: "Watch Trailer", icon: "▶", link: "https://www.youtube.com/watch?v=YUOWk-o8vaM" },
        { text: "Learn More", icon: "", link: "barotraumatic.html" }
    ],
    tabs: [
        {
            id: "missions",
            title: "Story Missions",
            cards: [
                {
                    image: "assets/images/featured/mission-1.jpg",
                    title: "The premium Membership for Barotraumatic players.",
                    buttonText: "Learn More",
                    buttonLink: "#"
                },
                {
                    image: "assets/images/featured/mission-2.jpg",
                    title: "Create your own personalized submarine designs.",
                    buttonText: "Create Now",
                    buttonLink: "#"
                },
                {
                    image: "assets/images/featured/mission-3.jpg",
                    title: "New story mission available now.",
                    buttonText: "Watch Trailer",
                    buttonLink: "#"
                },
                {
                    image: "assets/images/featured/mission-4.jpg",
                    title: "See all the challenges you've completed in your Career.",
                    buttonText: "View Progress",
                    buttonLink: "#"
                }
            ]
        },
        {
            id: "updates",
            title: "Latest Updates",
            cards: [
                {
                    image: "assets/images/featured/update-1.jpg",
                    title: "New submarine classes added to the fleet.",
                    buttonText: "Explore",
                    buttonLink: "#"
                },
                {
                    image: "assets/images/featured/update-2.jpg",
                    title: "Enhanced creature AI and behaviors.",
                    buttonText: "Read More",
                    buttonLink: "#"
                },
                {
                    image: "assets/images/featured/update-3.jpg",
                    title: "New weapons and equipment available.",
                    buttonText: "View Items",
                    buttonLink: "#"
                },
                {
                    image: "assets/images/featured/update-4.jpg",
                    title: "Expanded map with new biomes.",
                    buttonText: "Discover",
                    buttonLink: "#"
                }
            ]
        },
        {
            id: "guides",
            title: "Guides & Tips",
            cards: [
                {
                    image: "assets/images/featured/guide-1.jpg",
                    title: "Beginner's guide to submarine management.",
                    buttonText: "Read Guide",
                    buttonLink: "#"
                },
                {
                    image: "assets/images/featured/guide-2.jpg",
                    title: "Advanced combat tactics and strategies.",
                    buttonText: "Learn More",
                    buttonLink: "#"
                },
                {
                    image: "assets/images/featured/guide-3.jpg",
                    title: "Resource gathering and crafting guide.",
                    buttonText: "View Guide",
                    buttonLink: "#"
                },
                {
                    image: "assets/images/featured/guide-4.jpg",
                    title: "Creature encyclopedia and weaknesses.",
                    buttonText: "Explore",
                    buttonLink: "#"
                }
            ]
        },
        {
            id: "community",
            title: "Community",
            cards: [
                {
                    image: "assets/images/featured/community-1.jpg",
                    title: "Join our official Discord server.",
                    buttonText: "Join Now",
                    buttonLink: "#"
                },
                {
                    image: "assets/images/featured/community-2.jpg",
                    title: "Share your submarine designs.",
                    buttonText: "Upload",
                    buttonLink: "#"
                },
                {
                    image: "assets/images/featured/community-3.jpg",
                    title: "Watch community highlights and clips.",
                    buttonText: "Watch",
                    buttonLink: "#"
                },
                {
                    image: "assets/images/featured/community-4.jpg",
                    title: "Participate in community events.",
                    buttonText: "View Events",
                    buttonLink: "#"
                }
            ]
        }
    ]
};

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

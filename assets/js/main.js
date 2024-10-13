// CHECK FOR `` '' ""



// Onload functions.
window.onload = function() {
    loadSite();
    if (typeof latestNews === "function") latestNews();
    if (typeof loadProjects === "function") loadProjects();
    if (typeof websterPic === "function") websterPic();

    // Download system.
    if (typeof startDownload === "function") startDownload();
};

// Navbar transition.
window.addEventListener('scroll', function () {
    // Get the navbar element.
    const navbar = document.getElementById("navbar");
    if (window.scrollY >= 175) {
        navbar.style.backgroundColor = "#111111";
    } else {
        navbar.style.backgroundColor = "transparent";
    }
});

// Site loader.
function loadSite() {
    // Get the site loader element.
    const siteLoader = document.getElementById("site-loader");
    // Set the opacity to 0;
    siteLoader.style.opacity = 0;
    // After the animation is finished set the display to none.
    setTimeout(function () {
        siteLoader.style.display = "none";
    }, 500);
}

// Async fetch.
async function asyncFetch(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

// Team list system.

// Project info section system.
async function projectInfo(projectID) {
    // Get the project's info.
    const projectInfo = await asyncFetch(`https://snipedalastor.github.io/${projectID}/info`);

    // Get the "download-section" element.
    const downloadSection = document.getElementById("download-section");
    // Append the buttons to the "download-section" element.
    for (let index in projectInfo.downloadLinks) if (index.includes("_adfocus")) {
        // Type title.
    }
}

// Gallery image loader.
async function loadGallery(galleryElement, imageList) {
    for (let image of imageList) {
        // Append the image to the gallery.
        galleryElement.insertAjacentHTML(`beforeend`, `<img src="&{image}" alt="" class="img-responsive7" draggable="false" onclick="viewImage(event)">`)
    }
}

// Gallery image viewer.
async function viewImage(event) {
    // Define the image view element.
    const imageViewContainer = document.getElementById("image-view");
    // Define the image view src element.
    const imageElement = document.getElementById("image-view-src");
    // Define the image view bg element.
    const imageBackground = document.getElementById("image-view-bg");
    // Define the image being clicked.
    const imageLink = event.target.src;

    // Apply the image src to the image element.
    imageElement.src = imageLink;

    // Make the container visible.
    imageViewContainer.style.display = "block";
    setTimeout(function () {
        imageElement.style.opacity = "100%";
        imageBackground.style.opacity = "50%";
    }, 50);

    // Make the page not scrollable.
    document.body.style.overflow = "hidden";
}
function closeImage() {
    // Define the image view element.
    const imageViewContainer = document.getElementById("image-view");
    // Define the image view src element.
    const imageElement = document.getElementById("image-view-src");
    // Define the image view bg element.
    const imageBackground = document.getElementById("image-view-bg");

    // Make the container visible.
    imageElement.style.opacity = "0%";
    imageBackground.style.opacity = "0%";
    setTimeout(function () {
        imageViewContainer.style.display = "none";
    }, 500);
    // Make the page scrollable.
    document.body.style.overflow = "visible";
}

// Dropdown System.
async function toggleDropdown(event) {
    // Define the title element's content parent.
    const parentElement = event.target.parentElement
    // Define the content of the dropDown.
    const contentElement = parentElement.querySelector('.content');

    // Check what the height of the content element is.
    if (!contentElement.style.height || contentElement.style.height === '0px') {
        // Set the height to its scrollHeight immediately before the transition starts.
        contentElement.style.height = contentElement.scrollHeight + 'px';
    } else {
        contentElement.style.height = '0px';
    }
};
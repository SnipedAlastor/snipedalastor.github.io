// Onload functions.
window.onload = function () {
    loadSite();
    if (typeof latestNews === "function") latestNews();
    if (typeof loadProjects === "function") loadProjects();

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
async function teamList(listElement, listUrl, onTeamReact) {
    // Get the list of users.
    const userList = await asyncFetch(listUrl);
    // Loop through the users, and add them to the list.
    for (let team in userList) {
        for (let index in userList[team]) {
            // Define the icon.
            const cardIcon = (userList[team][index].iconUrl) ? userList[team][index].iconUrl : `https://snipedalastor.github.io/render/${userList[team][index].skinAPIPose}/${userList[team][index].Username}/bust?
borderHighlight=true&borderHighlightRadius=5`
            // Define the social links.
            const cardSocials = userList[team][index].socials.map(social => {
                return `<li class="no-padding"><a href="${social}" target="_blank"><img src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${social}&size=256" alt="" class="badge badge-img center-block"
draggable="false"></a></li>`
            }).join(" ");
            // Format the card.
            const card = `
        <div class="card card-default animations-borderhover" style="width: 240px;">
        <div class="card-media">
                <img src="${cardIcon}" height="120" loading="lazy" draggable="false">
        </div>
        <div class="card-title">
            <h1 class="no-margin">${userList[team][index].displayName}</h1>
            <h3 class="no-margin">${userList[team][index].roles[0]}</h3>
            <ul class="list-inline">
                ${cardSocials}
            </ul>
        </div>
    </div>`
            
            // If the user isn't on the team don't list them.
            if (onTeamReact == true) {
                if (userList[team][index].onTeam == true) {
                    // Apply the team cards.
                    listElement.insertAdjacentHTML("beforeend", card);
                }
            } else {
                // Apply the team cards.
                listElement.insertAdjacentHTML("beforeend", card);
            }
        }
    }
}

// Project info section system.
async function projectInfo(projectID) {
    // Get the project's info.
    const projectInfo = await asyncFetch(`https://snipedalastor.github.io/${projectID}/info`);

    // Get the "download-section" element.
    const downloadSection = document.getElementById("download-section");
    // Append the buttons to the "download-section" element.
    for (let index in projectInfo.downloadLinks) if (index.includes("_adfocus")) {
        // Type title.
        let downloadTypeTitle = (projectID == "Two-Moons" && index.replace("_adfocus", "") == "resourcepack_secondary") ? "LexLim Version" : (projectID == "Two-Moons" && index.replace("_adfocus", "") == "resorcepack") ? "Vanilla Version" :
index.replace("_adfocus", "");
        downloadTypeTitle = downloadTypeTitle.charAt(0).toUpperCase() + downloadTypeTitle.substring(1);
        downloadSection.insertAdjacentElement(`beforeend`, `<a href="${projectInfo.downloadLinks[index]}" class="btn ui-${projectID.toLowerCase()} text-light" targer="_blank">Download ${downloadTypeTitle}</a>`)
    }
    // Append the github button.
    downloadSection.insertAdjacentHTML(`beforeend`, `<a target="_blank" href="https://github.com/SnipedAlastor/${projectInfo.projectID}" class="btn ui-github text-light">Github</a>`);

    // Get the "pack-version" element.
    const packVersion = document.getElementById("pack-version");
    // Update the "pack-version" element with the latest pack version.
    packVersion.innerText = "Wersja Gry " + projectInfo.latestVersion.split("-")[1];

    // Get the "pack-downloads" element.
    const packDownloads = document.getElementById("pack-downloads");
    // Update the "pack-downloads" element with the latest pack version.
    packDownloads.innerText = projectInfo.downloadCount.total.toLocaleString() + "Downloads";
}

// Gallery image loader.
async function loadGallery(galleryElement, imageList) {
    for (let image of imageList) {
        // Append the image to the gallery.
        galleryElement.insertAjacentHTML(`beforeend`, `<img src="${image}" alt="" class="img-responsive7" draggable="false" onclick="viewImage(event)">`)
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
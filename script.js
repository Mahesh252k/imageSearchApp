const accessKey = "9wOm8cbWNHK5mcrDY97TW3VDEn5B51o30N_8nHCGGuA";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

// Function to search and display images
async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = ""; // Clear the default images
        }

        results.forEach((result) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image";

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description || "View Image";

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;
        showMore.style.display = results.length > 0 ? "block" : "none";
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

// Event listener for form submission
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

// Event listener for "Show More" button
showMore.addEventListener("click", () => {
    searchImages();
});

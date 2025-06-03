const accessKey = "SX5uyFus66ixeWBaXjBZHCBj01CP5vNpqfGHhCQR8Ak";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;



async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        if (data.results.length === 0) {
            displayNoResults();
            return ;
           
        }

        data.results.forEach(result => {
            const card = document.createElement("div");
            card.className = "card";

            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image);

            card.appendChild(imageLink);
            searchResult.appendChild(card);
        });

        showMoreBtn.style.display = data.total_pages > page ? "block" : "none";
    } catch (error) {
        console.error("Error fetching images:", error);
        searchResult.innerHTML = "<p>Something went wrong. Please try again.</p>";
    }
}

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    page = 1;
    searchImages(); 
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});

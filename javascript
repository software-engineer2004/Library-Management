let searchInput = document.getElementById('searchInput');

let searchResults = document.getElementById("searchResults");

let spinner = document.getElementById("spinner");

let message = document.getElementById("message");
message.classList.add("message");

let heading = document.createElement("h1");
searchResults.appendChild(heading);


function createAndAppendBooks(search_results) {
    searchResults.textContent = "";
    if (search_results.length < 1) {
        message.textContent = "No results found";
        searchResults.textContent = "";
        heading.textContent = "";
    } else {
        message.textContent = "";
        searchResults.textContent = "";
        heading.textContent = "Popular Books";

        let rowEl = document.createElement("div");
        rowEl.classList.add("row");
        searchResults.appendChild(rowEl);


        for (let eachItem of search_results) {
            let title = eachItem.title;
            let image = eachItem.imageLink;
            let author = eachItem.author;

            let colEl = document.createElement("div");
            colEl.classList.add("col-6", "col-md-6", "text-center", "mb-3");
            rowEl.appendChild(colEl);

            let bookContainer = document.createElement("div");
            bookContainer.classList.add("d-flex", "flex-column", "align-items-center");
            colEl.appendChild(bookContainer);

            let imageEl = document.createElement("img");
            imageEl.src = image;
            imageEl.classList.add("result-image", "w-100", "p-2", "mt-2");
            bookContainer.appendChild(imageEl);

            let paraEl = document.createElement("p");
            paraEl.textContent = author;
            bookContainer.appendChild(paraEl);
            console.log(eachItem);
        }
    }
}

searchInput.addEventListener("keydown", function(event) {
    searchResults.classList.remove("d-none");

    if (event.key === "Enter") {
        spinner.classList.remove("d-none");
        searchResults.classList.add("d-none");

        let url = "https://apis.ccbp.in/book-store?title=" + searchInput.value;
        let options = {
            method: "GET",
        };


        fetch(url, options)
            .then(function(response) {
                return response.json();
            })

            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                spinner.classList.add("d-none");
                searchResults.classList.remove("d-none");
                createAndAppendBooks(search_results);
            });
    }
});
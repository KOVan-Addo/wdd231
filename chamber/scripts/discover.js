
import { attractions } from "../data/attractions.mjs";

// Select the container where the attraction cards will appear
const attractionGrid = document.querySelector("#attraction-grid");

// Generate a card for each attraction
function displayAttractions(items) {
    attractionGrid.innerHTML = "";

    items.forEach((attraction) => {
        const card = document.createElement("article");
        card.classList.add("attraction-card");

        const heading = document.createElement("h2");
        heading.textContent = attraction.name;

        const figure = document.createElement("figure");
        const image = document.createElement("img");

        image.src = `images/${attraction.image}`;
        image.alt = attraction.name;
        image.loading = "lazy";
        image.width = 300;
        image.height = 200;

        figure.appendChild(image);

        const address = document.createElement("address");
        address.textContent = attraction.address;

        const description = document.createElement("p");
        description.textContent = attraction.description;

        const button = document.createElement("button");
        button.textContent = "Learn More";
        button.type = "button";
        button.addEventListener("click", () => {
            alert(`Learn more about ${attraction.name}!`);
        });

        card.append(heading, figure, address, description, button);
        attractionGrid.appendChild(card);
    });
}

// Display all attractions
displayAttractions(attractions);

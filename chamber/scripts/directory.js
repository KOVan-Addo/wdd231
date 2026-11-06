
// Get the location of the JSON data file
const url = "data/members.json";

// Select the HTML elements we need
const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

// Convert membership numbers into readable labels
const membershipNames = {
    1: "Member",
    2: "Silver Member",
    3: "Gold Member"
};

// Fetch the business information from the JSON file
async function getMembers() {
    try {
        const response = await fetch(url);

        // Check whether the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Convert the response into JavaScript data
        const data = await response.json();

        // Display the businesses
        displayMembers(data.members);

    } catch (error) {
        console.error("Error loading business directory:", error);

        membersContainer.textContent =
            "Sorry, the business directory could not be loaded. Please try again later.";
    }
}

// Create and display the business cards
function displayMembers(members) {
    // Clear the container before adding businesses
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        // Create the card
        const card = document.createElement("section");
        card.classList.add("member-card");

        // Create the business name
        const name = document.createElement("h2");
        name.textContent = member.name;

        // Create the business image
        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} business image`;
        image.loading = "lazy";
        image.width = 300;
        image.height = 200;

        // Create the business category
        const category = document.createElement("p");
        category.classList.add("category");
        category.textContent = member.category;

        // Create the address
        const address = document.createElement("p");
        address.textContent = `Address: ${member.address}`;

        // Create the phone number
        const phone = document.createElement("p");
        phone.textContent = `Phone: ${member.phone}`;

        // Create the membership level
        const membership = document.createElement("p");
        membership.classList.add("membership");
        membership.textContent =
            `Membership: ${membershipNames[member.membershipLevel] || "Member"}`;

        // Create the business description
        const description = document.createElement("p");
        description.textContent = member.description;

        // Create the website link
        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";
        website.classList.add("website-link");

        // Add all elements to the card
        card.append(
            name,
            image,
            category,
            address,
            phone,
            membership,
            description,
            website
        );

        // Add the completed card to the page
        membersContainer.appendChild(card);
    });
}

// Switch to grid view
gridButton.addEventListener("click", () => {
    membersContainer.classList.remove("list-view");
    membersContainer.classList.add("grid-view");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});

// Switch to list view
listButton.addEventListener("click", () => {
    membersContainer.classList.remove("grid-view");
    membersContainer.classList.add("list-view");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
});

// Load the businesses when the page opens
getMembers();

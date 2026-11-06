// Select the navigation button and menu
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-navigation");

// Toggle the navigation menu when the button is clicked
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    // Check whether the menu is open
    const isOpen = navigation.classList.contains("open");

    // Update accessibility information
    menuButton.setAttribute("aria-expanded", isOpen);

    // Update the button label
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    // Change the hamburger symbol
    menuButton.textContent = isOpen ? "✕" : "☰";
});
// Get the current year
const currentYear = new Date().getFullYear();

// Display the current year in the footer
document.querySelector("#current-year").textContent = currentYear;

// Get the page's last modification date
const lastModified = document.lastModified;

// Display the last modification date
document.querySelector("#last-modified").textContent = lastModified;
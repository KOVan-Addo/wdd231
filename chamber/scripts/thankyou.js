// Retrieve submitted form data from the URL
const urlParams = new URLSearchParams(window.location.search);

// Get the application details container
const detailsContainer = document.querySelector("#application-details");

// Retrieve the submitted values
const firstName = urlParams.get("firstName");
const lastName = urlParams.get("lastName");
const email = urlParams.get("email");
const phone = urlParams.get("phone");
const organization = urlParams.get("organization");
const timestamp = urlParams.get("timestamp");

// Display the submitted information
if (detailsContainer) {
    detailsContainer.innerHTML = `
        <p><strong>First Name:</strong> ${firstName || "Not provided"}</p>
        <p><strong>Last Name:</strong> ${lastName || "Not provided"}</p>
        <p><strong>Email:</strong> ${email || "Not provided"}</p>
        <p><strong>Mobile Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Business / Organization:</strong> ${organization || "Not provided"}</p>
        <p><strong>Application Date:</strong> ${timestamp || "Not available"}</p>
    `;
}
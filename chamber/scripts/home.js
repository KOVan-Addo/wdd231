
// Accra Weather - OpenWeatherMap API

const API_KEY = "5ba81df9e756bc50bf5c90f9215bd4fd";
const LATITUDE = 5.6037;
const LONGITUDE = -0.1870;

const currentTemp = document.querySelector("#current-temp");
const weatherDescription = document.querySelector("#weather-description");
const weatherIcon = document.querySelector("#weather-icon");
const forecastContainer = document.querySelector("#forecast-container");

const BASE_URL = "https://api.openweathermap.org/data/2.5";


// Fetch current weather
async function getCurrentWeather() {
    const url = `${BASE_URL}/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Weather request failed: ${response.status}`);
        }

        const data = await response.json();

        currentTemp.textContent = `${data.main.temp.toFixed(1)} °C`;
        weatherDescription.textContent = data.weather[0].description;

        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIcon.alt = data.weather[0].description;
        weatherIcon.hidden = false;

    } catch (error) {
        console.error("Current weather error:", error);
        currentTemp.textContent = "Weather unavailable";
        weatherDescription.textContent = "Please try again later.";
    }
}


// Fetch the five-day forecast and display the next three days
async function getWeatherForecast() {
    const url = `${BASE_URL}/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Forecast request failed: ${response.status}`);
        }

        const data = await response.json();

        // Group forecast entries by calendar date.
        const dailyForecasts = {};

        data.list.forEach((item) => {
            const date = item.dt_txt.split(" ")[0];

            // Exclude today's forecast.
            const today = new Date().toLocaleDateString("en-CA", {
                timeZone: "Africa/Accra"
            });

            if (date <= today) return;

            if (!dailyForecasts[date]) {
                dailyForecasts[date] = [];
            }

            dailyForecasts[date].push(item);
        });

        // Select the next three available forecast dates.
        const forecastDates = Object.keys(dailyForecasts)
            .sort()
            .slice(0, 3);

        forecastContainer.innerHTML = "";

        forecastDates.forEach((date) => {
            const entries = dailyForecasts[date];

            // Use the forecast entry closest to midday for the weather icon.
            const middayForecast = entries.reduce((closest, item) => {
                const hour = Number(item.dt_txt.split(" ")[1].slice(0, 2));

                const closestHour = Number(
                    closest.dt_txt.split(" ")[1].slice(0, 2)
                );

                return Math.abs(hour - 12) < Math.abs(closestHour - 12)
                    ? item
                    : closest;
            });

            const highTemp = Math.max(
                ...entries.map((item) => item.main.temp_max)
            );

            const lowTemp = Math.min(
                ...entries.map((item) => item.main.temp_min)
            );

            const description = middayForecast.weather[0].description;
            const iconCode = middayForecast.weather[0].icon;

            const formattedDate = new Date(`${date}T12:00:00Z`)
                .toLocaleDateString("en-GH", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    timeZone: "Africa/Accra"
                });

            // Create the forecast card.
            const card = document.createElement("article");
            card.classList.add("forecast-day");

            const heading = document.createElement("h4");
            heading.textContent = formattedDate;

            const icon = document.createElement("img");
            icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            icon.alt = description;

            const conditions = document.createElement("p");
            conditions.textContent = description;

            const temperatures = document.createElement("p");
            temperatures.textContent =
                `High: ${highTemp.toFixed(1)} °C | Low: ${lowTemp.toFixed(1)} °C`;

            card.append(heading, icon, conditions, temperatures);
            forecastContainer.appendChild(card);
        });

        if (forecastDates.length === 0) {
            forecastContainer.textContent = "Forecast unavailable.";
        }

    } catch (error) {
        console.error("Forecast error:", error);
        forecastContainer.textContent =
            "Unable to load the forecast. Please try again later.";
    }
}


// Load both weather sections.
getCurrentWeather();
getWeatherForecast();


// Business Spotlights

async function getBusinessSpotlights() {
    const spotlightsContainer = document.querySelector("#spotlights-container");

    try {
        // Fetch business information from the JSON file.
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`Members request failed: ${response.status}`);
        }

        const data = await response.json();

        // Keep only Silver and Gold members.
        const eligibleMembers = data.members.filter(
            (member) => member.membershipLevel === 2 ||
                member.membershipLevel === 3
        );

        // Randomly shuffle eligible members.
        const shuffledMembers = eligibleMembers.sort(
            () => Math.random() - 0.5
        );

        // Select three random businesses.
        const selectedMembers = shuffledMembers.slice(0, 3);

        // Clear the loading message.
        spotlightsContainer.innerHTML = "";

        // Create a card for each selected business.
        selectedMembers.forEach((member) => {
            const card = document.createElement("article");
            card.classList.add("spotlight-card");

            const heading = document.createElement("h3");
            heading.textContent = member.name;

            const logo = document.createElement("img");
            logo.src = `images/${member.image}`;
            logo.alt = `${member.name} logo`;
            logo.loading = "lazy";

            const category = document.createElement("p");
            category.textContent = member.category;

            const phone = document.createElement("p");
            phone.textContent = `Phone: ${member.phone}`;

            const address = document.createElement("p");
            address.textContent = `Address: ${member.address}`;

            const membership = document.createElement("p");
            membership.textContent =
                `Membership: ${member.membershipLevel === 3 ? "Gold" : "Silver"}`;

            const website = document.createElement("a");
            website.href = member.website;
            website.textContent = "Visit Website";
            website.target = "_blank";
            website.rel = "noopener noreferrer";

            // Assemble the business card.
            card.append(
                heading,
                logo,
                category,
                phone,
                address,
                membership,
                website
            );

            spotlightsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Business spotlight error:", error);

        spotlightsContainer.textContent =
            "Business spotlights are currently unavailable.";
    }
}

// Load business spotlights.
getBusinessSpotlights();

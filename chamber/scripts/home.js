// ==========================================
// CAMPINAS CHAMBER OF COMMERCE - HOME PAGE
// ==========================================

// OpenWeatherMap settings (Campinas, SP)
const API_KEY = "dcea2f931417880b8a1e51aaeacb35e8";
const LATITUDE = -22.9056;
const LONGITUDE = -47.0608;
const WEATHER_URL = "https://api.openweathermap.org/data/2.5";
const QUERY = `lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`;

// ==========================================
// HELPERS
// ==========================================

// Shift a UTC timestamp (seconds) by the city's timezone offset.
// Read the result with the getUTC... methods to get Campinas local time.
function toLocalDate(seconds, timezoneOffset) {
    return new Date((seconds + timezoneOffset) * 1000);
}

function dateKey(date) {
    return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

// Fisher-Yates shuffle (unbiased, unlike sort(() => Math.random() - 0.5))
function shuffle(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

// ==========================================
// CURRENT WEATHER
// ==========================================

async function getCurrentWeather() {
    const container = document.querySelector("#current-weather");

    try {
        const response = await fetch(`${WEATHER_URL}/weather?${QUERY}`);

        if (!response.ok) {
            throw new Error(`Current weather request failed (${response.status})`);
        }

        const data = await response.json();
        const { description, icon } = data.weather[0];

        container.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png"
                 alt="" width="100" height="100">
            <p class="weather-temperature">${Math.round(data.main.temp)}°C</p>
            <p class="weather-description">${description}</p>
            <p>Feels like ${Math.round(data.main.feels_like)}°C · Humidity ${data.main.humidity}%</p>
        `;

    } catch (error) {
        console.error("Current weather error:", error);
        container.textContent = "Weather information is currently unavailable.";
    }
}

// ==========================================
// THREE-DAY FORECAST
// ==========================================

async function getForecast() {
    const container = document.querySelector("#weather-forecast");

    try {
        const response = await fetch(`${WEATHER_URL}/forecast?${QUERY}`);

        if (!response.ok) {
            throw new Error(`Forecast request failed (${response.status})`);
        }

        const data = await response.json();
        const timezone = data.city.timezone;

        // Group the 3-hour entries by Campinas local date
        const days = {};

        data.list.forEach((item) => {
            const local = toLocalDate(item.dt, timezone);
            const key = dateKey(local);

            if (!days[key]) {
                days[key] = [];
            }

            days[key].push({ item, hour: local.getUTCHours() });
        });

        // Today in Campinas, so only future days are shown
        const todayKey = dateKey(
            toLocalDate(Math.floor(Date.now() / 1000), timezone)
        );

        const nextDays = Object.keys(days)
            .filter((key) => key > todayKey)
            .slice(0, 3);

        if (nextDays.length === 0) {
            container.textContent = "Forecast is currently unavailable.";
            return;
        }

        container.innerHTML = "";

        nextDays.forEach((key) => {
            // Use the entry closest to midday
            const { item } = days[key].reduce((best, entry) =>
                Math.abs(entry.hour - 12) < Math.abs(best.hour - 12)
                    ? entry
                    : best
            );

            const label = new Date(`${key}T12:00:00Z`).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                timeZone: "UTC"
            });

            const card = document.createElement("div");
            card.classList.add("forecast-card");

            card.innerHTML = `
                <h4>${label}</h4>
                <p>${Math.round(item.main.temp)}°C</p>
                <p class="weather-description">${item.weather[0].description}</p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Forecast error:", error);
        container.textContent = "Forecast information is currently unavailable.";
    }
}

// ==========================================
// BUSINESS SPOTLIGHTS
// ==========================================

const LEVELS = {
    2: "Silver Member",
    3: "Gold Member"
};

async function getSpotlights() {
    const container = document.querySelector("#spotlight-container");

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`Member data request failed (${response.status})`);
        }

        const members = await response.json();

        // Gold (3) and Silver (2) members only
        const eligible = members.filter((member) =>
            Number(member.membership) in LEVELS
        );

        // Random 2 or 3 members on every page load
        const count = Math.min(eligible.length, Math.random() < 0.5 ? 2 : 3);
        const selected = shuffle(eligible).slice(0, count);

        if (selected.length === 0) {
            container.textContent = "No Gold or Silver members are available.";
            return;
        }

        container.innerHTML = "";

        selected.forEach((member) => {
            const card = document.createElement("article");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <h3>${member.name}</h3>
                <p class="spotlight-tagline">${member.tagline}</p>
                <img src="images/members/${member.image}"
                     alt="${member.name} logo"
                     width="120" height="120"
                     loading="lazy">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p>
                    <a href="${member.website}"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="Visit the ${member.name} website">
                        Visit Website
                    </a>
                </p>
                <p class="spotlight-level">${LEVELS[Number(member.membership)]}</p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Spotlight error:", error);
        container.textContent = "Business spotlights are currently unavailable.";
    }
}

// ==========================================
// RUN HOME PAGE FUNCTIONS
// ==========================================

getCurrentWeather();
getForecast();
getSpotlights();
// weather.js

// --- 1. CONFIGURATION ---
// PASTE YOUR API KEY HERE
const API_KEY = '7415c75cda9307962882f308d8e7f806';

// --- 2. DOM ELEMENT SELECTIONS ---
const widget = document.getElementById('weather-widget');
const loadingMessage = document.getElementById('loading-message');
const cityEl = document.getElementById('city');
const iconEl = document.getElementById('weather-icon');
const tempEl = document.getElementById('temperature');
const descEl = document.getElementById('weather-desc');
const minMaxEl = document.getElementById('min-max-temp');

// --- 3. GEOLOCATION ---
function getLocation() {
    if (navigator.geolocation) {
        // This prompts the user for permission.
        // It calls onSuccess if they agree, onError if they deny or an error occurs.
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        loadingMessage.textContent = 'Geolocation is not supported by your browser.';
    }
}

// If user allows location access
function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    fetchWeather(latitude, longitude);
}

// If user denies location access or an error occurs
function onError(error) {
    console.error('Geolocation Error:', error.message);
    loadingMessage.textContent = `Error: ${error.message}. Fetching weather for a default location.`;
    // Fallback to a default location (e.g., Amsterdam)
    fetchWeather(52.37, 4.89); 
}

// --- 4. API FETCH ---
async function fetchWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Weather Fetch Error:', error);
        loadingMessage.textContent = 'Could not fetch weather data. Please check the API key.';
    }
}

// --- 5. UPDATE UI ---
function updateUI(data) {
    // Hide loading message and show the widget
    loadingMessage.style.display = 'none';
    widget.style.display = 'block';

    // Extract data
    const city = data.name;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const tempMin = Math.round(data.main.temp_min);
    const tempMax = Math.round(data.main.temp_max);

    // Update the DOM elements
    cityEl.textContent = city;
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    tempEl.textContent = `${temp}°C`;
    descEl.textContent = description;
    minMaxEl.textContent = `L: ${tempMin}° / H: ${tempMax}°`;
}

// --- 6. INITIALIZE ---
// Start the process when the script loads
getLocation();
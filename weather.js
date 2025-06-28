// weather.js
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DOM ELEMENT SELECTIONS ---
    const pageContainer = document.getElementById('weather-page-container');
    const widgetBody = document.getElementById('widget-body');
    const loadingMessage = document.getElementById('loading-message');
    const cityEl = document.getElementById('city');
    const iconEl = document.getElementById('weather-icon');
    const tempEl = document.getElementById('temperature');
    const descEl = document.getElementById('weather-desc');
    const localTimeEl = document.getElementById('local-time');
    const feelsLikeEl = document.getElementById('feels-like');
    const humidityEl = document.getElementById('humidity');
    const windSpeedEl = document.getElementById('wind-speed');

    let localTimeInterval = null;

    // NEW: Mapping of weather conditions to background images
    const backgroundMap = {
        'Thunderstorm': 'https://images.unsplash.com/photo-1605727226352-8d93a7e0a2f4?q=80&w=2574&auto=format&fit=crop',
        'Drizzle': 'https://images.unsplash.com/photo-1542512039-509529944811?q=80&w=2670&auto=format&fit=crop',
        'Rain': 'https://images.unsplash.com/photo-1515694346937-94d85e41e620?q=80&w=2564&auto=format&fit=crop',
        'Snow': 'https://images.unsplash.com/photo-1547754980-3df97fed72a8?q=80&w=2670&auto=format&fit=crop',
        'Clear': 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=2574&auto=format&fit=crop',
        'Clouds': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2551&auto=format&fit=crop',
        // Atmosphere group (Mist, Smoke, Haze, etc.)
        'Mist': 'https://images.unsplash.com/photo-1487621167305-5d248087c824?q=80&w=2574&auto=format&fit=crop',
        'Smoke': 'https://images.unsplash.com/photo-1487621167305-5d248087c824?q=80&w=2574&auto=format&fit=crop',
        'Haze': 'https://images.unsplash.com/photo-1487621167305-5d248087c824?q=80&w=2574&auto=format&fit=crop',
        'Dust': 'https://images.unsplash.com/photo-1487621167305-5d248087c824?q=80&w=2574&auto=format&fit=crop',
        'Fog': 'https://images.unsplash.com/photo-1487621167305-5d248087c824?q=80&w=2574&auto=format&fit=crop',
        // Default
        'default': 'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2670&auto=format&fit=crop'
    };

    // --- 2. CORE LOGIC ---
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeatherData(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error('Geolocation Error:', error.message);
                    setLoadingState(`Location error. Please allow location access.`);
                    // Fallback to a default if user denies location
                    fetchWeatherData(52.37, 4.89); // Amsterdam
                }
            );
        } else {
            setLoadingState('Geolocation is not supported by your browser.');
        }
    }

    async function fetchWeatherData(lat, lon) {
        setLoadingState('Fetching weather...');
        const apiUrl = `https://leonardo-portfolio-api.onrender.com/api/weather?lat=${lat}&lon=${lon}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`API call failed: ${response.statusText}`);
            }
            const data = await response.json();
            updateUI(data);
        } catch (error) {
            console.error('Weather Fetch Error:', error);
            setLoadingState('Could not fetch weather data.');
        }
    }

    // --- 3. UI UPDATE ---
    function updateUI(data) {
        loadingMessage.style.display = 'none';
        widgetBody.style.display = 'block';

        if (localTimeInterval) clearInterval(localTimeInterval);

        // Update Text & Icons
        cityEl.textContent = `${data.name}, ${data.sys.country}`;
        iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        tempEl.textContent = `${Math.round(data.main.temp)}°`;
        descEl.textContent = data.weather[0].description;
        feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°`;
        humidityEl.textContent = `${data.main.humidity}%`;
        windSpeedEl.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

        // NEW: Update background image
        const weatherCondition = data.weather[0].main;
        const backgroundUrl = backgroundMap[weatherCondition] || backgroundMap['default'];
        pageContainer.style.backgroundImage = `url('${backgroundUrl}')`;

        // Update Local Time
        const timezoneOffset = data.timezone;
        updateLocalTime(timezoneOffset);
        localTimeInterval = setInterval(() => updateLocalTime(timezoneOffset), 1000);
    }

    function updateLocalTime(offsetSeconds) {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const cityTime = new Date(utc + (offsetSeconds * 1000));
        const hours = String(cityTime.getHours()).padStart(2, '0');
        const minutes = String(cityTime.getMinutes()).padStart(2, '0');
        localTimeEl.textContent = `Local Time: ${hours}:${minutes}`;
    }

    function setLoadingState(message) {
        widgetBody.style.display = 'none';
        loadingMessage.style.display = 'block';
        loadingMessage.textContent = message;
    }
    
    // --- 4. INITIALIZE ---
    getLocation();
});
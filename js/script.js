const url = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = 'bf52ad315cee5dde3463ffc38c900df9'
const city = document.getElementById('city');
const searchBtn = document.getElementById('search');
const weatherIcon = document.querySelector('.weather-icon');
const showPhotos = document.getElementById('show')
const weatherCard = document.querySelector('.card-weather')



/**
 * Fetches weather data for a given city from OpenWeatherMap API and updates the UI accordingly.
 * If the weather data is not available or an error occurs, it displays an error message and removes the background image.
 *
 * @param {string} city - The name of the city to fetch weather data for.
 * @returns {Promise<void>} - A promise that resolves when the weather data is fetched and UI is updated.
 */
async function checkWeather(city) {
    try {
        const response = await fetch(url + city + `&appid=${key}` + `&units=metric`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        updateWeatherUI(data);
    } catch (error) {
        displayErrorMessage();
        console.error('Error:', error);
    }
}

/**
 * Updates the weather UI with the fetched data.
 *
 * @param {Object} data - The weather data fetched from the API.
 */
function updateWeatherUI(data) {
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

    const weatherCondition = data.weather[0].main;
    const weatherIconSrc = getWeatherIconSrc(weatherCondition);
    weatherIcon.src = weatherIconSrc;

    hideErrorMessage();
    showWeatherCard();
}

/**
 * Returns the appropriate weather icon source based on the weather condition.
 *
 * @param {string} weatherCondition - The weather condition (e.g., Clear, Clouds, Rain, Snow, etc.).
 * @returns {string} - The source URL of the weather icon.
 */
function getWeatherIconSrc(weatherCondition) {
    switch (weatherCondition) {
        case 'Clear':
            return 'images/clear.png';
        case 'Clouds':
            return 'images/clouds.png';
        case 'Drizzle':
            return 'images/drizzle.png';
        case 'Rain':
            return 'images/rain.png';
        case 'Snow':
            return 'images/snow.png';
        case 'Mist':
            return 'images/mist.png';
        case 'Wind':
            return 'images/wind.png';
        default:
            return 'images/clear.png';
    }
}

/**
 * Displays an error message in the UI and removes the background image.
 */
function displayErrorMessage() {
    document.querySelector('.weather').style.opacity = 0;
    document.querySelector('.weather').style.height = '0';
    document.querySelector('.error').style.display = 'block';
    document.querySelector('body').style.backgroundImage = 'none';
    weatherCard.classList.remove("filter");
}

/**
 * Hides the error message in the UI.
 */
function hideErrorMessage() {
    document.querySelector('.error').style.display = 'none';
}

/**
 * Shows the weather card in the UI.
 */
function showWeatherCard() {
    document.querySelector('.weather').style.opacity = 1;
    document.querySelector('.weather').style.height = '448px';
}

/**
 * Event listener for the search button click event.
 * Calls the checkWeather function with the value of the city input field.
 * If the showPhotos checkbox is checked, it calls the getPhoto function with the value of the city input field
 * and adds the "filter" class to the weatherCard element.
 * Otherwise, it removes the background image and sets the weatherCard element's background color.
 */
searchBtn.addEventListener('click', () => {
    checkWeather(city.value);

    if (showPhotos.checked == true) {
        getPhoto(city.value);
        weatherCard.classList.add("filter");
    } else {
        document.querySelector('body').style.backgroundImage = 'none';
        weatherCard.style.backgroundColor = 'linear-gradient(135deg, #00feba, #5b548a)';
        weatherCard.classList.remove("filter");
    }
});


/**
 * Fetches a random photo related to the given city from Unsplash API and sets it as the background image.
 * If no photos are found, the background image is set to none.
 *
 * @param {string} city - The name of the city to search for photos.
 * @returns {Promise<void>} - A promise that resolves when the background image is set.
 */
async function getPhoto(city) {
    // Fetch a random photo related to the city
    const unsplashResponse = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=tt7jtSDzXkYFim6A1yl5GPJ_3pr6ZlzJ5owotnnLHX8`);
    const unsplashData = await unsplashResponse.json();
    if (unsplashData.results.length > 2) {
        const randomPhoto = unsplashData.results[Math.floor(Math.random() * unsplashData.results.length)];
        document.querySelector('body').style.backgroundImage = `url(${randomPhoto.urls.regular})`;
    } else {
        document.querySelector('body').style.backgroundImage = 'none';
    }
}


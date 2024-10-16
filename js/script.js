const url = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = 'bf52ad315cee5dde3463ffc38c900df9'
const city = document.getElementById('city');
const searchBtn = document.getElementById('search');
const weatherIcon = document.querySelector('.weather-icon');
const showPhotos = document.getElementById('show')
const weatherCard = document.querySelector('.card-weather')
async function checkWeather(city) {
    const response = await fetch(url + city + `&appid=${key}` + `&units=metric`)
    var data = await response.json();
    console.log(data);
    if (response.statusText != 'OK') {
        document.querySelector('.weather').style.opacity = 0;
        document.querySelector('.weather').style.height = '0';
        document.querySelector('.error').style.display = 'block';
        document.querySelector('body').style.backgroundImage = 'none';
    } else {

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
        if (data.weather[0].main == 'Clear')
            weatherIcon.src = '/images/clear.png';
        else if (data.weather[0].main == 'Clouds')
            weatherIcon.src = '/images/clouds.png';
        else if (data.weather[0].main == 'Drizzle')
            weatherIcon.src = '/images/drizzle.png';
        else if (data.weather[0].main == 'Rain')
            weatherIcon.src = '/images/rain.png';
        else if (data.weather[0].main == 'Snow')
            weatherIcon.src = '/images/snow.png';
        else if (data.weather[0].main == 'Mist')
            weatherIcon.src = '/images/mist.png';
        else if (data.weather[0].main == 'Wind')
            weatherIcon.src = '/images/wind.png';
        else
            weatherIcon.src = '/images/clear.png';
        console.log(data.weather[0].main);


        document.querySelector('.error').style.display = 'none';
        document.querySelector('.weather').style.opacity = 1;
        document.querySelector('.weather').style.height = '448px';


    }
}
searchBtn.addEventListener('click', () => {
    checkWeather(city.value);


    if (showPhotos.checked == true) {
        getPhoto(city.value)
        weatherCard.classList.add("filter")
    }
    else {
        document.querySelector('body').style.backgroundImage = 'none';
        weatherCard.style.backgroundColor = 'linear-gradient(135deg, #00feba, #5b548a)';
        weatherCard.classList.remove("filter")
    }
})


// 

// ...

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


// ...
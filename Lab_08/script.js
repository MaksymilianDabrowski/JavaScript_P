document.getElementById('getWeather').addEventListener('click', () => getWeather(document.getElementById('cityInput').value));
document.getElementById('storeWeather').addEventListener('click', saveCity);


function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (city == '') {
    console.log('Nie podano nazwy miasta');
    return;
  }

  const apiKey = 'd1224e2b6ffaca9a2479336994313c14';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      return response.json();
    }).then(data => {
      const temperature = data.main.temp;
      const pressure = data.main.pressure;
      const humidity = data.main.humidity;
      const weatherIcon = data.weather[0].icon; // Pobieranie ikony z api

      const weatherInfo = document.getElementById('weatherInfo');
      weatherInfo.innerHTML =
        `
        <h2>${city}</h2>
        <p>Temperatura: ${temperature} C</p>
        <p>Ciśnienie: ${pressure} hPa</p>
        <p>Wilgotność: ${humidity}%</p>
        <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="weather icon">
        `
        ;
    })
}

// Funkcja zapisuje wpisane miasto
function saveCity() {
  const city = document.getElementById('cityInput').value;
  if (city == '') {
    console.log('Nie podano nazwy miasta');
    return;
  }

  const places = getPlaces();
  if (places.includes(city)) {
    alert('To miasto zostało już zapisane');
    return;
  }

  places.push(city);
  localStorage.setItem('places', JSON.stringify(places));
  console.log('zapisano', city);
  window.location.reload();
}

// Funkcja do pobierania danych z local storage
function getPlaces() {
  const storedPlaces = localStorage.getItem('places');
  if (storedPlaces) {
    const parsedPlaces = JSON.parse(storedPlaces);
    if (Array.isArray(parsedPlaces)) {
      return parsedPlaces;
    }
  }
  return [];
}

// Wyciąganie pogody dla poprzednio zapisanych miast
window.onload = () => {
  const places = getPlaces();
  places.forEach(city => getWeatherForCity(city));
}

// Wyciąganie pogody dla konkrentego miasta na local storage
function getWeatherForCity(city) {
  const apiKey = 'd1224e2b6ffaca9a2479336994313c14';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeatherForCity(city, data);
    })
    .catch(error => {
      console.error('error fetching data', error);
    });
}

// Wyświetlanie pogody
function displayWeatherForCity(city, data) {
  const weatherList = document.getElementById('weatherList');

  const weatherElement = document.createElement('div');
  weatherElement.innerHTML =
    `
        <h2>${city}</h2>
        <p>Temperatura: ${data.main.temp} C</p>     
        <p>Ciśnienie: ${data.main.pressure} hPa</p>
        <p>Wilgotność: ${data.main.humidity}%</p>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon">
        <br>
        <button onclick="removePlace('${city}')">Usuń</button>
    `
    ;
  weatherList.appendChild(weatherElement);
}

// Usuwanie miast 
function removePlace(city) {
  const places = getPlaces();
  const index = places.indexOf(city); // szuka indeksu miasta
  if (index > -1) {
    places.splice(index, 1); // usuwa element konkretnego indeksu
    localStorage.setItem('places', JSON.stringify(places)); // update w local storage
    console.log('place removed', city);
  }
  window.location.reload();
}

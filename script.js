const API_KEY = "3492a9646023fb0ddda5d463423858c1";

const cityNameElem = document.getElementById("city-name");
const weatherIconElem = document.getElementById("weather-icon");
const temperatureElem = document.getElementById("temperature");
const descriptionElem = document.getElementById("description");
const tempRangeElem = document.getElementById("temp-range");

const todayTempElem = document.getElementById("today-temp");
const todayIconElem = document.getElementById("today-icon");
const todayDescElem = document.getElementById("today-desc");

const forecastElem = document.getElementById("forecast");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

function formatCityName(name) {
  return name
    .trim()
    .toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Get coordinates first
async function getCoordinates(city) {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  const data = await res.json();
  if (data.length > 0) {
    return { lat: data[0].lat, lon: data[0].lon, name: data[0].name };
  } else {
    alert("City not found. Please try again.");
    return null;
  }
}

async function fetchWeatherByCoords(lat, lon, displayName) {
  try {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const weatherData = await weatherRes.json();

    cityNameElem.textContent = displayName;
    temperatureElem.textContent = `${Math.round(weatherData.main.temp)}°`;
    descriptionElem.textContent = weatherData.weather[0].description;
    tempRangeElem.textContent = `H: ${Math.round(weatherData.main.temp_max)}° | L: ${Math.round(weatherData.main.temp_min)}°`;
    weatherIconElem.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    // Today Card
    todayTempElem.textContent = `${Math.round(weatherData.main.temp_min)}° / ${Math.round(weatherData.main.temp_max)}°`;
    todayIconElem.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    todayDescElem.textContent = weatherData.weather[0].description;

    fetchForecastByCoords(lat, lon);
  } catch (error) {
    console.error(error);
  }
}

async function fetchForecastByCoords(lat, lon) {
  try {
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const forecastData = await forecastRes.json();

    forecastElem.innerHTML = "";
    const dailyData = {};

    forecastData.list.forEach(item => {
      const date = new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
      if (!dailyData[date]) {
        dailyData[date] = item;
      }
    });

    Object.keys(dailyData).slice(1, 7).forEach(day => {
      const data = dailyData[day];
      const icon = data.weather[0].icon;
      const temp = Math.round(data.main.temp);
      const description = temp < 22 ? "Light Rain" : data.weather[0].description;

      forecastElem.innerHTML += `
        <div class="forecast-day">
          <p>${day}</p>
          <img src="https://openweathermap.org/img/wn/${icon}.png" alt="">
          <p>${temp}°</p>
          <p class="forecast-desc">${description}</p>
        </div>
      `;
    });
  } catch (error) {
    console.error(error);
  }
}

// Main fetch by city name
async function fetchWeather(city) {
  const coords = await getCoordinates(city);
  if (coords) {
    fetchWeatherByCoords(coords.lat, coords.lon, formatCityName(coords.name));
  }
}

// Search
searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) fetchWeather(city);
});

searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    const city = searchInput.value.trim();
    if (city) fetchWeather(city);
  }
});

// Load current location
navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude } = position.coords;
  fetchWeatherByCoords(latitude, longitude, "Kukatpally");
});

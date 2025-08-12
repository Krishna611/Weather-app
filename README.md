# 🌤 Weather App

A simple and responsive weather application built with **HTML**, **CSS**, and **JavaScript**, powered by the **OpenWeatherMap API**.  
It displays current weather, a "Today" card, and a 6-day forecast for any city, with live search functionality and geolocation support.

---

## 🚀 Features
- 🌎 **Search by City** — Enter any city name to get its current weather and forecast.
- 📍 **Current Location** — Automatically fetches weather based on your device's location.
- 📅 **6-Day Forecast** — Shows upcoming daily weather details with icons.
- 🎨 **Responsive UI** — Works on desktop and mobile devices.
- 🖼 **Dynamic Icons** — Weather icons update based on current conditions.

---

## 🛠 Technologies Used
- **HTML5**
- **CSS3** (Responsive, Flexbox, Grid, Gradients)
- **JavaScript (ES6+)**
- **OpenWeatherMap API** (Weather, Geocoding, and Forecast endpoints)
- **Google Fonts** (Poppins)

---

## 📦 Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
Open index.html in your browser
Or use a local server like Live Server (VS Code extension).

🔑 API Key Setup
Create a free account at OpenWeatherMap.

Get your API key from the dashboard.

Open script.js and replace the placeholder with your API key:

javascript
Copy
Edit
const API_KEY = "YOUR_API_KEY_HERE";
📂 Project Structure
bash
Copy
Edit
weather-app/
│── index.html      # Main HTML structure
│── style.css       # Styling for the app
│── script.js       # JavaScript logic for fetching and displaying data
│── README.md       # Project documentation
🖥 Usage
Search for a City:
Type the city name in the search bar and click the search button (or press Enter).

Current Location:
On page load, allow location access to automatically show your local weather.

📌 API Endpoints Used
Geocoding API
https://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid={API_KEY}

Current Weather API
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric

5-Day Forecast API
https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric

📷 Screenshots
<img width="1122" height="883" alt="image" src="https://github.com/user-attachments/assets/83f97f92-907f-43fe-a870-9b6d3509f2fc" />

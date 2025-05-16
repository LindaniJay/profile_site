document.addEventListener('DOMContentLoaded', () => {
  const apiKey = "d82c248e3173ba526765c92a5bc7056e";
  const defaultCoords = { lat: -33.9249, lon: 18.4241 }; // Cape Town

  function formatTime(dt) {
    const date = new Date(dt * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  function getNowHour() {
    const now = new Date();
    return now.getHours();
  }

  function showWeatherEffects(main) {
    const rain = document.getElementById('rainAnim');
    const lightning = document.getElementById('lightningAnim');
    if (!rain || !lightning) return;
    // Rain for rain, drizzle, snow
    if (["Rain", "Drizzle", "Snow"].includes(main)) {
      rain.style.display = 'block';
    } else {
      rain.style.display = 'none';
    }
    // Lightning for thunderstorm
    if (main === "Thunderstorm") {
      lightning.style.display = 'block';
    } else {
      lightning.style.display = 'none';
    }
  }

  function setWeatherCardBg(main) {
    const card = document.querySelector('.weather-card-glass');
    if (!card) return;
    card.classList.remove('bg-rain', 'bg-cloudy', 'bg-sunny', 'bg-clear', 'bg-thunderstorm', 'bg-snow');
    if (["Rain", "Drizzle"].includes(main)) card.classList.add('bg-rain');
    else if (["Clouds", "Mist", "Fog"].includes(main)) card.classList.add('bg-cloudy');
    else if (["Clear"].includes(main)) card.classList.add('bg-sunny');
    else if (["Thunderstorm"].includes(main)) card.classList.add('bg-thunderstorm');
    else if (["Snow"].includes(main)) card.classList.add('bg-snow');
    else card.classList.add('bg-clear');
  }

  async function fetchWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const locationEl = document.getElementById('weatherLocation');
    const tempEl = document.getElementById('weatherTemp');
    const windEl = document.getElementById('weatherWind');
    const summaryEl = document.getElementById('weatherSummary'); // not used
    const highLowEl = document.getElementById('weatherHighLow');
    const hourlyScroll = document.getElementById('weatherHourlyScroll');
    const iconEl = document.getElementById('weatherIcon');
    const descEl = document.getElementById('weatherDesc');
    const feelsLikeEl = document.getElementById('weatherFeelsLike');
    const humidityEl = document.getElementById('weatherHumidity');
    const pressureEl = document.getElementById('weatherPressure');
    const visibilityEl = document.getElementById('weatherVisibility');
    const sunriseEl = document.getElementById('weatherSunrise');
    const sunsetEl = document.getElementById('weatherSunset');

    try {
      locationEl.textContent = 'Loading...';
      tempEl.textContent = '--°';
      windEl.textContent = '';
      highLowEl.textContent = '';
      hourlyScroll.innerHTML = '';
      if (iconEl) iconEl.style.display = 'none';
      if (descEl) descEl.textContent = '';
      if (feelsLikeEl) feelsLikeEl.textContent = '--°';
      if (humidityEl) humidityEl.textContent = '--%';
      if (pressureEl) pressureEl.textContent = '-- hPa';
      if (visibilityEl) visibilityEl.textContent = '-- km';
      if (sunriseEl) sunriseEl.textContent = '--:--';
      if (sunsetEl) sunsetEl.textContent = '--:--';

      // Fetch current weather
      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) throw new Error('Weather API error: ' + weatherRes.status);
      const weatherData = await weatherRes.json();

      // Fetch forecast
      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok) throw new Error('Forecast API error: ' + forecastRes.status);
      const forecastData = await forecastRes.json();

      // Main info
      locationEl.textContent = weatherData.name;
      tempEl.textContent = `${Math.round(weatherData.main.temp)}°`;
      windEl.innerHTML = `<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;"><path d="M3 10h14M7 6h10M5 14h8" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg> ${Math.round(weatherData.wind.speed)}km/h (${weatherData.wind.deg ? degToCompass(weatherData.wind.deg) : ''})`;
      highLowEl.textContent = `H: ${Math.round(weatherData.main.temp_max)}° L: ${Math.round(weatherData.main.temp_min)}°`;

      // Icon & description
      if (iconEl && weatherData.weather[0].icon) {
        iconEl.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        iconEl.style.display = 'inline-block';
      }
      if (descEl) descEl.textContent = weatherData.weather[0].description.replace(/\b\w/g, l => l.toUpperCase());

      // Extra info
      if (feelsLikeEl) feelsLikeEl.textContent = `${Math.round(weatherData.main.feels_like)}°`;
      if (humidityEl) humidityEl.textContent = `${weatherData.main.humidity}%`;
      if (pressureEl) pressureEl.textContent = `${weatherData.main.pressure} hPa`;
      if (visibilityEl) visibilityEl.textContent = weatherData.visibility ? `${(weatherData.visibility/1000).toFixed(1)} km` : '-- km';
      if (sunriseEl) sunriseEl.textContent = formatTime(weatherData.sys.sunrise);
      if (sunsetEl) sunsetEl.textContent = formatTime(weatherData.sys.sunset);

      // Weather effects
      showWeatherEffects(weatherData.weather[0].main);
      setWeatherCardBg(weatherData.weather[0].main);

      // Hourly (3-hour steps)
      const nowHour = getNowHour();
      hourlyScroll.innerHTML = '';
      // First card is 'Now'
      const nowCard = document.createElement('div');
      nowCard.className = 'weather-hour-card now';
      nowCard.innerHTML = `
        <div class="weather-hour-time" style="color:#39ff14">Now</div>
        <div class="weather-hour-bar">
          <div class="weather-hour-bar-water" style="height:60%; --water-level:60%;"></div>
        </div>
        <div class="weather-hour-rain">--</div>
      `;
      hourlyScroll.appendChild(nowCard);
      // Next 8 forecast periods (3-hour steps)
      forecastData.list.slice(0, 8).forEach((item, idx) => {
        const dt = item.dt;
        const hourLabel = formatTime(dt);
        const rain = item.rain && item.rain["3h"] ? item.rain["3h"] : 0;
        const temp = Math.round(item.main.temp);
        const barHeight = Math.min(100, Math.round((rain / 2) * 100));
        const rainText = rain ? `${rain.toFixed(2)}in` : '0in';
        const card = document.createElement('div');
        card.className = 'weather-hour-card';
        card.innerHTML = `
          <div class="weather-hour-time">${hourLabel}</div>
          <div class="weather-hour-bar">
            <div class="weather-hour-bar-water" style="height:${barHeight}%; --water-level:${barHeight}%;"></div>
          </div>
          <div class="weather-hour-rain">${rainText}</div>
        `;
        hourlyScroll.appendChild(card);
      });
      // Set updated time
      const updatedAt = document.getElementById('weatherUpdatedAt');
      if (updatedAt) {
        const now = new Date();
        updatedAt.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    } catch (err) {
      locationEl.textContent = 'Could not load weather.';
      tempEl.textContent = '--°';
      windEl.textContent = '';
      highLowEl.textContent = '';
      hourlyScroll.innerHTML = `<div style="color:#fff;">Error loading weather data.<br>${err.message}</div>`;
      if (iconEl) iconEl.style.display = 'none';
      if (descEl) descEl.textContent = '';
      if (feelsLikeEl) feelsLikeEl.textContent = '--°';
      if (humidityEl) humidityEl.textContent = '--%';
      if (pressureEl) pressureEl.textContent = '-- hPa';
      if (visibilityEl) visibilityEl.textContent = '-- km';
      if (sunriseEl) sunriseEl.textContent = '--:--';
      if (sunsetEl) sunsetEl.textContent = '--:--';
      showWeatherEffects('');
      console.error('Error fetching weather data:', err);
    }
  }

  function degToCompass(num) {
    const val = Math.floor((num / 22.5) + 0.5);
    const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          fetchWeather(defaultCoords.lat, defaultCoords.lon);
        }
      );
    } else {
      fetchWeather(defaultCoords.lat, defaultCoords.lon);
    }
  }

  getLocation();
});
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
    const effects = document.getElementById('weather-anim-effects');
    if (!effects) return;
    effects.innerHTML = '';
    if (["Clear"].includes(main)) {
      effects.innerHTML = '<div class="weather-sun"></div>';
    } else if (["Clouds", "Mist", "Fog"].includes(main)) {
      effects.innerHTML = '<div class="weather-cloud"></div>';
    } else if (["Rain", "Drizzle"].includes(main)) {
      effects.innerHTML = '<div class="weather-cloud"></div>' +
                         '<div class="weather-rain" style="left:40%;"></div>' +
                         '<div class="weather-rain" style="left:50%;animation-delay:0.3s;"></div>' +
                         '<div class="weather-rain" style="left:60%;animation-delay:0.6s;"></div>';
    } else if (["Thunderstorm"].includes(main)) {
      effects.innerHTML = '<div class="weather-cloud"></div>' +
                         '<div class="weather-rain" style="left:40%;"></div>' +
                         '<div class="weather-rain" style="left:50%;animation-delay:0.3s;"></div>' +
                         '<div class="weather-rain" style="left:60%;animation-delay:0.6s;"></div>';
      // You can add a lightning effect here if desired
    }
  }

  function setWeatherCardBg(main) {
    const card = document.querySelector('.weather-card-glass');
    if (!card) return;
    card.classList.remove('bg-rain', 'bg-cloudy', 'bg-sunny', 'bg-clear', 'bg-thunderstorm', 'bg-snow');
    card.classList.remove('weather-bg-rain', 'weather-bg-sun', 'weather-bg-clouds', 'weather-bg-thunder', 'weather-bg-snow');
    if (["Rain", "Drizzle"].includes(main)) card.classList.add('weather-bg-rain');
    else if (["Thunderstorm"].includes(main)) card.classList.add('weather-bg-thunder');
    else if (["Snow"].includes(main)) card.classList.add('weather-bg-snow');
    else if (["Clear"].includes(main)) card.classList.add('weather-bg-sun');
    else if (["Clouds", "Mist", "Fog"].includes(main)) card.classList.add('weather-bg-clouds');
    // else no animated bg
  }

  async function fetchWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const locationEl = document.getElementById('weatherLocation');
    const tempEl = document.getElementById('weatherTemp');
    const windEl = document.getElementById('weatherWind');
    const summaryEl = document.getElementById('weatherSummary'); // not used
    const highLowEl = document.getElementById('weatherHighLow');
    const hourlyScroll = document.querySelector('.weather-hour-scroll');
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
      if (forecastData.list && Array.isArray(forecastData.list)) {
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
      } else {
        hourlyScroll.innerHTML += '<div style="color:#fff;">No forecast data available.</div>';
      }
      // 5-Day Forecast
      const fiveDayEl = document.getElementById('weather-5day');
      if (fiveDayEl) {
        fiveDayEl.innerHTML = '';
        // Group forecastData.list by day
        const days = {};
        forecastData.list.forEach(item => {
          const date = new Date(item.dt * 1000);
          const day = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
          if (!days[day]) days[day] = [];
          days[day].push(item);
        });
        // Only show next 5 days (skip today if less than 4 periods left)
        const dayKeys = Object.keys(days).slice(0, 5);
        dayKeys.forEach((day, idx) => {
          const items = days[day];
          // Get min/max temp, icon at midday or first, and main description
          let min = 100, max = -100, icon = '', desc = '';
          let middayIdx = Math.floor(items.length / 2);
          items.forEach((item, i) => {
            if (item.main.temp_min < min) min = item.main.temp_min;
            if (item.main.temp_max > max) max = item.main.temp_max;
            if (i === middayIdx) {
              icon = item.weather[0].icon;
              desc = item.weather[0].main;
            }
          });
          const card = document.createElement('div');
          card.className = 'weather-5day-day';
          card.innerHTML = `
            <div class="accent-bar"></div>
            <div class="weather-day-name">${day}</div>
            <img class="weather-day-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" />
            <div class="weather-day-desc">${desc}</div>
            <div class="weather-day-temps">${Math.round(max)}° / ${Math.round(min)}°</div>
          `;
          fiveDayEl.appendChild(card);
        });
      }
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

  // Add a Retry Location button if geolocation is blocked
  function showRetryLocationButton() {
    let retryBtn = document.getElementById('retryLocationBtn');
    if (!retryBtn) {
      retryBtn = document.createElement('button');
      retryBtn.id = 'retryLocationBtn';
      retryBtn.textContent = 'Retry Location';
      retryBtn.className = 'modern-btn';
      retryBtn.style = 'margin:1.2rem auto 0 auto;display:block;';
      retryBtn.onclick = () => {
        retryBtn.remove();
        getLocation();
      };
      document.querySelector('.weather-card-glass').appendChild(retryBtn);
    }
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          document.getElementById('weatherLocation').textContent = 'Using Johannesburg (location blocked)';
          fetchWeather(-26.2041, 28.0473); // Johannesburg coords
          showRetryLocationButton();
        }
      );
    } else {
      document.getElementById('weatherLocation').textContent = 'Using Johannesburg (no geolocation)';
      fetchWeather(-26.2041, 28.0473);
    }
  }

  getLocation();
});
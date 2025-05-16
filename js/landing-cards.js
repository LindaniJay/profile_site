document.addEventListener('DOMContentLoaded', function() {
  // Salutation
  function updateSalutation() {
    const now = new Date();
    const hour = now.getHours();
    let greet = 'Hello';
    if (hour < 12) greet = 'Good morning';
    else if (hour < 18) greet = 'Good afternoon';
    else greet = 'Good evening';
    document.getElementById('salutationCard').textContent = `${greet}, Lindani!`;
  }
  updateSalutation();
  setInterval(updateSalutation, 60000);

  // Digital Clock
  function updateTime() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    document.getElementById('timeCard').textContent = `${h}:${m}:${s}`;
  }
  updateTime();
  setInterval(updateTime, 1000);

  // Weather Mini Card
  async function updateWeatherMini() {
    const apiKey = 'd82c248e3173ba526765c92a5bc7056e'; // Use your own API key
    const city = 'Johannesburg';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather error');
      const data = await res.json();
      document.getElementById('weatherMiniCity').textContent = data.name;
      document.getElementById('weatherMiniTemp').textContent = Math.round(data.main.temp) + '°';
      document.getElementById('weatherMiniDesc').textContent = data.weather[0].main;
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
      const iconEl = document.getElementById('weatherMiniIcon');
      iconEl.src = iconUrl;
      iconEl.style.display = 'inline-block';
    } catch (e) {
      document.getElementById('weatherMiniCity').textContent = '--';
      document.getElementById('weatherMiniTemp').textContent = '--°';
      document.getElementById('weatherMiniDesc').textContent = '--';
      document.getElementById('weatherMiniIcon').style.display = 'none';
    }
  }
  updateWeatherMini();
  setInterval(updateWeatherMini, 600000); // update every 10 min
}); 
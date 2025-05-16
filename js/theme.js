document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('themeToggle');
  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : '');
  });

  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
  }

  // Update profile time every minute
  function updateProfileTime() {
    const timeEl = document.getElementById('profileTime');
    if (timeEl) {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      timeEl.textContent = `${hours}:${minutes}${ampm}`;
    }
  }
  updateProfileTime();
  setInterval(updateProfileTime, 60000);
});
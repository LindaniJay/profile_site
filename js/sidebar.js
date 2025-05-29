// Sidebar and top bar logic for navigation, theme toggle, and live clock

document.addEventListener('DOMContentLoaded', function() {
  // Get references to sidebar and key UI elements
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.getElementById('sidebarToggle');
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleLabel = document.getElementById('themeToggleLabel');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

  // Sidebar minimize/expand (for desktop)
  function toggleSidebar() {
    // Toggle the minimized class to shrink or expand the sidebar
    sidebar.classList.toggle('sidebar-minimized');
  }
  if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);

  // Digital clock in sidebar/top bar
  function updateSidebarClock() {
    const clock = document.getElementById('sidebarClock');
    if (!clock) return;
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    // Pad with zeros if needed
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    clock.textContent = `${h}:${m}:${s}`;
  }
  updateSidebarClock();
  setInterval(updateSidebarClock, 1000); // Update every second

  // Add tooltips to sidebar links when minimized
  function updateSidebarTooltips() {
    const links = sidebar.querySelectorAll('.sidebar-links li a');
    links.forEach(link => {
      const text = link.textContent.trim();
      link.setAttribute('title', text);
    });
  }
  updateSidebarTooltips();

  // THEME TOGGLE (persistent across pages)
  function setTheme(mode) {
    // Switch between dark and light mode
    if (mode === 'light') {
      document.body.classList.add('light');
      if (themeToggleLabel) themeToggleLabel.textContent = 'Light Mode';
      if (themeIcon) themeIcon.className = 'fas fa-sun';
    } else {
      document.body.classList.remove('light');
      if (themeToggleLabel) themeToggleLabel.textContent = 'Dark Mode';
      if (themeIcon) themeIcon.className = 'fas fa-moon';
    }
    // Save preference
    localStorage.setItem('theme', mode);
  }
  function toggleTheme() {
    // Toggle between light and dark mode
    const isLight = document.body.classList.contains('light');
    setTheme(isLight ? 'dark' : 'light');
  }
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // On load, apply saved theme
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme === 'light' ? 'light' : 'dark');

  // Hide sidebar by default on mobile, show on desktop
  function handleResize() {
    if (window.innerWidth <= 900) {
      // On mobile/tablet, hide sidebar by default
      sidebar.classList.remove('sidebar-visible');
      sidebar.classList.add('sidebar-hidden');
    } else {
      // On desktop, show sidebar
      sidebar.classList.add('sidebar-visible');
      sidebar.classList.remove('sidebar-hidden');
    }
  }
  window.addEventListener('resize', handleResize);
  handleResize(); // Run on page load
}); 
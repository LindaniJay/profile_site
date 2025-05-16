document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.getElementById('sidebarToggle');
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleLabel = document.getElementById('themeToggleLabel');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

  // Sidebar minimize/expand
  function toggleSidebar() {
    sidebar.classList.toggle('sidebar-minimized');
  }
  if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);

  // Digital clock in sidebar
  function updateSidebarClock() {
    const clock = document.getElementById('sidebarClock');
    if (!clock) return;
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    clock.textContent = `${h}:${m}:${s}`;
  }
  updateSidebarClock();
  setInterval(updateSidebarClock, 1000);

  // Tooltips for minimized sidebar
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
    if (mode === 'light') {
      document.body.classList.add('light');
      if (themeToggleLabel) themeToggleLabel.textContent = 'Light Mode';
      if (themeIcon) themeIcon.className = 'fas fa-sun';
    } else {
      document.body.classList.remove('light');
      if (themeToggleLabel) themeToggleLabel.textContent = 'Dark Mode';
      if (themeIcon) themeIcon.className = 'fas fa-moon';
    }
    localStorage.setItem('theme', mode);
  }
  function toggleTheme() {
    const isLight = document.body.classList.contains('light');
    setTheme(isLight ? 'dark' : 'light');
  }
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // On load, apply saved theme
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme === 'light' ? 'light' : 'dark');

  // Hide sidebar by default on mobile
  function handleResize() {
    if (window.innerWidth <= 900) {
      sidebar.classList.remove('sidebar-visible');
      sidebar.classList.add('sidebar-hidden');
    } else {
      sidebar.classList.add('sidebar-visible');
      sidebar.classList.remove('sidebar-hidden');
    }
  }
  window.addEventListener('resize', handleResize);
  handleResize();
}); 
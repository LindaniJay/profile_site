// Top Navigation Bar logic for navigation, theme toggle, and live clock

document.addEventListener('DOMContentLoaded', function() {
  // Get references to navbar and key UI elements
  const navbar = document.querySelector('.top-navbar');
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarLinks = document.getElementById('navbarLinks');
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleLabel = document.getElementById('themeToggleLabel');
  const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;

  // Mobile menu toggle functionality
  function toggleMobileMenu() {
    const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
    navbarToggle.setAttribute('aria-expanded', !isExpanded);
    navbarLinks.classList.toggle('open');
    
    // Prevent body scroll when menu is open
    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  if (navbarToggle) {
    navbarToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when clicking on a link
  const navbarLinkElements = navbarLinks.querySelectorAll('.navbar-link');
  navbarLinkElements.forEach(link => {
    link.addEventListener('click', () => {
      navbarToggle.setAttribute('aria-expanded', 'false');
      navbarLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navbarLinks.classList.contains('open')) {
      navbarToggle.setAttribute('aria-expanded', 'false');
      navbarLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbarLinks.classList.contains('open')) {
      navbarToggle.setAttribute('aria-expanded', 'false');
      navbarLinks.classList.remove('open');
      document.body.style.overflow = '';
      navbarToggle.focus();
    }
  });

  // Digital clock in navbar
  function updateNavbarClock() {
    const clock = document.getElementById('navbarClock');
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
  updateNavbarClock();
  setInterval(updateNavbarClock, 1000); // Update every second

  // THEME TOGGLE (persistent across pages)
  function setTheme(mode) {
    // Switch between dark and light mode
    if (mode === 'light') {
      document.body.classList.add('light');
      if (themeToggleLabel) themeToggleLabel.textContent = 'Light Mode';
      if (themeIcon) {
        themeIcon.innerHTML = '<path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0L17.05 4.58c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06z"/>';
      }
    } else {
      document.body.classList.remove('light');
      if (themeToggleLabel) themeToggleLabel.textContent = 'Dark Mode';
      if (themeIcon) {
        themeIcon.innerHTML = '<path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>';
      }
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

  // Set active navigation link based on current page
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navbarLinkElements.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  setActiveNavLink();

  // Handle window resize
  function handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      navbarToggle.setAttribute('aria-expanded', 'false');
      navbarLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  
  window.addEventListener('resize', handleResize);
  
  // Keyboard navigation support
  navbarLinkElements.forEach((link, index) => {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (index + 1) % navbarLinkElements.length;
        navbarLinkElements[nextIndex].focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (index - 1 + navbarLinkElements.length) % navbarLinkElements.length;
        navbarLinkElements[prevIndex].focus();
      }
    });
  });
}); 
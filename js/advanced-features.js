// Advanced Portfolio Features
// GitHub integration, performance optimization, accessibility, and more

document.addEventListener('DOMContentLoaded', function() {
  
  // ===========================================
  // GITHUB API INTEGRATION
  // ===========================================
  
  class GitHubIntegration {
    constructor() {
      this.username = 'lindanijay';
      this.apiUrl = 'https://api.github.com';
      this.cache = new Map();
      this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }
    
    async fetchGitHubData(endpoint) {
      const cacheKey = endpoint;
      const cached = this.cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
      
      try {
        const response = await fetch(`${this.apiUrl}${endpoint}`);
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        
        const data = await response.json();
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
      } catch (error) {
        console.warn('GitHub API error:', error);
        return null;
      }
    }
    
    async getUserStats() {
      const user = await this.fetchGitHubData(`/users/${this.username}`);
      if (!user) return null;
      
      const repos = await this.fetchGitHubData(`/users/${this.username}/repos?sort=updated&per_page=6`);
      const languages = await this.getLanguageStats();
      
      return {
        user,
        repos: repos || [],
        languages,
        stats: {
          publicRepos: user.public_repos,
          followers: user.followers,
          following: user.following,
          createdAt: user.created_at
        }
      };
    }
    
    async getLanguageStats() {
      const repos = await this.fetchGitHubData(`/users/${this.username}/repos?per_page=100`);
      if (!repos) return {};
      
      const languageStats = {};
      
      for (const repo of repos) {
        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
        }
      }
      
      return languageStats;
    }
    
    async updatePortfolioWithGitHubData() {
      const data = await this.getUserStats();
      if (!data) return;
      
      // Update GitHub stats in about section
      this.updateGitHubStats(data.stats);
      
      // Update recent repositories
      this.updateRecentRepos(data.repos);
      
      // Update language distribution
      this.updateLanguageStats(data.languages);
    }
    
    updateGitHubStats(stats) {
      const statsContainer = document.querySelector('.github-stats');
      if (!statsContainer) return;
      
      statsContainer.innerHTML = `
        <div class="stat-item">
          <div class="stat-number">${stats.publicRepos}</div>
          <div class="stat-label">Repositories</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${stats.followers}</div>
          <div class="stat-label">Followers</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${stats.following}</div>
          <div class="stat-label">Following</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${new Date(stats.createdAt).getFullYear()}</div>
          <div class="stat-label">GitHub Member Since</div>
        </div>
      `;
    }
    
    updateRecentRepos(repos) {
      const reposContainer = document.querySelector('.recent-repos');
      if (!reposContainer || !repos.length) return;
      
      reposContainer.innerHTML = repos.slice(0, 6).map(repo => `
        <div class="repo-card">
          <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
          <p>${repo.description || 'No description available'}</p>
          <div class="repo-meta">
            <span class="repo-language">${repo.language || 'Unknown'}</span>
            <span class="repo-stars">⭐ ${repo.stargazers_count}</span>
            <span class="repo-updated">Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
      `).join('');
    }
    
    updateLanguageStats(languages) {
      const languagesContainer = document.querySelector('.language-stats');
      if (!languagesContainer || !Object.keys(languages).length) return;
      
      const total = Object.values(languages).reduce((sum, count) => sum + count, 0);
      const sortedLanguages = Object.entries(languages)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 8);
      
      languagesContainer.innerHTML = sortedLanguages.map(([lang, count]) => {
        const percentage = ((count / total) * 100).toFixed(1);
        return `
          <div class="language-item">
            <div class="language-name">${lang}</div>
            <div class="language-bar">
              <div class="language-progress" style="width: ${percentage}%"></div>
            </div>
            <div class="language-count">${count} repos</div>
          </div>
        `;
      }).join('');
    }
  }
  
  // ===========================================
  // PERFORMANCE OPTIMIZATION
  // ===========================================
  
  class PerformanceOptimizer {
    constructor() {
      this.observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      };
      this.imageObserver = new IntersectionObserver(this.handleImageIntersection.bind(this), this.observerOptions);
      this.initLazyLoading();
      this.initServiceWorker();
    }
    
    initLazyLoading() {
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => this.imageObserver.observe(img));
    }
    
    handleImageIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.classList.add('loaded');
          this.imageObserver.unobserve(img);
        }
      });
    }
    
    async initServiceWorker() {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered:', registration);
        } catch (error) {
          console.log('Service Worker registration failed:', error);
        }
      }
    }
    
    optimizeImages() {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (img.src && !img.src.includes('data:')) {
          img.loading = 'lazy';
          img.decoding = 'async';
        }
      });
    }
  }
  
  // ===========================================
  // ACCESSIBILITY ENHANCEMENTS
  // ===========================================
  
  class AccessibilityEnhancer {
    constructor() {
      this.initKeyboardNavigation();
      this.initFocusManagement();
      this.initScreenReaderSupport();
      this.initHighContrastMode();
    }
    
    initKeyboardNavigation() {
      document.addEventListener('keydown', (e) => {
        // Skip to main content
        if (e.key === 'Tab' && e.shiftKey && e.altKey) {
          e.preventDefault();
          const mainContent = document.querySelector('main, .main-content');
          if (mainContent) mainContent.focus();
        }
        
        // Close modals with Escape
        if (e.key === 'Escape') {
          const modals = document.querySelectorAll('.modal, .project-modal');
          modals.forEach(modal => {
            if (modal.style.display !== 'none') {
              modal.style.display = 'none';
            }
          });
        }
      });
    }
    
    initFocusManagement() {
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          const focusable = Array.from(document.querySelectorAll(focusableElements))
            .filter(el => !el.disabled && !el.hidden);
          
          const currentIndex = focusable.indexOf(document.activeElement);
          
          if (e.shiftKey) {
            if (currentIndex === 0) {
              e.preventDefault();
              focusable[focusable.length - 1].focus();
            }
          } else {
            if (currentIndex === focusable.length - 1) {
              e.preventDefault();
              focusable[0].focus();
            }
          }
        }
      });
    }
    
    initScreenReaderSupport() {
      // Add ARIA labels to interactive elements
      const buttons = document.querySelectorAll('button:not([aria-label])');
      buttons.forEach(button => {
        if (!button.textContent.trim()) {
          button.setAttribute('aria-label', 'Interactive button');
        }
      });
      
      // Add skip links
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.textContent = 'Skip to main content';
      skipLink.className = 'skip-link';
      skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        transition: top 0.3s;
      `;
      
      skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
      });
      
      skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
      });
      
      document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    initHighContrastMode() {
      const highContrastToggle = document.createElement('button');
      highContrastToggle.textContent = 'High Contrast';
      highContrastToggle.className = 'high-contrast-toggle';
      highContrastToggle.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: #000;
        color: #fff;
        border: 2px solid #fff;
        padding: 10px;
        cursor: pointer;
        z-index: 1000;
      `;
      
      highContrastToggle.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        const isHighContrast = document.body.classList.contains('high-contrast');
        highContrastToggle.textContent = isHighContrast ? 'Normal Contrast' : 'High Contrast';
      });
      
      document.body.appendChild(highContrastToggle);
    }
  }
  
  // ===========================================
  // MOBILE GESTURES & TOUCH INTERACTIONS
  // ===========================================
  
  class MobileGestureHandler {
    constructor() {
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.touchEndX = 0;
      this.touchEndY = 0;
      this.minSwipeDistance = 50;
      
      this.initSwipeGestures();
      this.initTouchInteractions();
    }
    
    initSwipeGestures() {
      document.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
        this.touchStartY = e.changedTouches[0].screenY;
      });
      
      document.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.touchEndY = e.changedTouches[0].screenY;
        this.handleSwipe();
      });
    }
    
    handleSwipe() {
      const deltaX = this.touchEndX - this.touchStartX;
      const deltaY = this.touchEndY - this.touchStartY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > this.minSwipeDistance) {
          if (deltaX > 0) {
            this.handleSwipeRight();
          } else {
            this.handleSwipeLeft();
          }
        }
      } else {
        if (Math.abs(deltaY) > this.minSwipeDistance) {
          if (deltaY > 0) {
            this.handleSwipeDown();
          } else {
            this.handleSwipeUp();
          }
        }
      }
    }
    
    handleSwipeLeft() {
      // Navigate to next project or page
      const nextButton = document.querySelector('.next-btn, .carousel-next');
      if (nextButton) nextButton.click();
    }
    
    handleSwipeRight() {
      // Navigate to previous project or page
      const prevButton = document.querySelector('.prev-btn, .carousel-prev');
      if (prevButton) prevButton.click();
    }
    
    handleSwipeUp() {
      // Scroll to top or previous section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    handleSwipeDown() {
      // Scroll down or show more content
      const nextSection = document.querySelector('section:nth-of-type(2)');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    initTouchInteractions() {
      // Add touch feedback to interactive elements
      const touchElements = document.querySelectorAll('button, .project-card, .nav-link');
      
      touchElements.forEach(element => {
        element.addEventListener('touchstart', () => {
          element.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', () => {
          element.style.transform = 'scale(1)';
        });
      });
    }
  }
  
  // ===========================================
  // SEARCH FUNCTIONALITY
  // ===========================================
  
  class SearchEngine {
    constructor() {
      this.searchIndex = [];
      this.initSearch();
    }
    
    async initSearch() {
      await this.buildSearchIndex();
      this.createSearchInterface();
    }
    
    async buildSearchIndex() {
      // Index all content for search
      const contentElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .project-card, .blog-card');
      
      this.searchIndex = Array.from(contentElements).map((element, index) => ({
        id: index,
        text: element.textContent.toLowerCase(),
        element: element,
        type: element.tagName.toLowerCase(),
        category: this.getCategory(element)
      }));
    }
    
    getCategory(element) {
      if (element.closest('.project-card')) return 'project';
      if (element.closest('.blog-card')) return 'blog';
      if (element.tagName.match(/^H[1-6]$/)) return 'heading';
      return 'content';
    }
    
    createSearchInterface() {
      const searchContainer = document.createElement('div');
      searchContainer.className = 'search-container';
      searchContainer.innerHTML = `
        <div class="search-box">
          <input type="text" id="searchInput" placeholder="Search portfolio..." />
          <button id="searchBtn">🔍</button>
        </div>
        <div id="searchResults" class="search-results"></div>
      `;
      
      searchContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        padding: 2rem;
        border-radius: 1rem;
        z-index: 10000;
        display: none;
        min-width: 400px;
      `;
      
      document.body.appendChild(searchContainer);
      
      const searchInput = document.getElementById('searchInput');
      const searchResults = document.getElementById('searchResults');
      
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
          this.performSearch(query, searchResults);
        } else {
          searchResults.innerHTML = '';
        }
      });
      
      // Show search on Ctrl+K
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
          e.preventDefault();
          searchContainer.style.display = 'block';
          searchInput.focus();
        }
        
        if (e.key === 'Escape') {
          searchContainer.style.display = 'none';
        }
      });
    }
    
    performSearch(query, resultsContainer) {
      const results = this.searchIndex.filter(item => 
        item.text.includes(query)
      ).slice(0, 10);
      
      if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
        return;
      }
      
      resultsContainer.innerHTML = results.map(result => `
        <div class="search-result-item" onclick="this.scrollToElement('${result.id}')">
          <h4>${result.element.textContent.substring(0, 50)}...</h4>
          <p>${result.category} • ${result.type}</p>
        </div>
      `).join('');
    }
    
    scrollToElement(elementId) {
      const element = this.searchIndex.find(item => item.id == elementId)?.element;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.style.background = 'rgba(255, 224, 102, 0.2)';
        setTimeout(() => element.style.background = '', 2000);
      }
    }
  }
  
  // ===========================================
  // ANALYTICS & MONITORING
  // ===========================================
  
  class AnalyticsTracker {
    constructor() {
      this.events = [];
      this.initTracking();
    }
    
    initTracking() {
      // Track page views
      this.trackEvent('page_view', {
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      });
      
      // Track user interactions
      this.trackUserInteractions();
      this.trackPerformance();
    }
    
    trackUserInteractions() {
      // Track button clicks
      document.addEventListener('click', (e) => {
        if (e.target.matches('button, .btn, .nav-link')) {
          this.trackEvent('button_click', {
            element: e.target.textContent,
            page: window.location.pathname
          });
        }
      });
      
      // Track form submissions
      document.addEventListener('submit', (e) => {
        this.trackEvent('form_submit', {
          form: e.target.id || 'unknown',
          page: window.location.pathname
        });
      });
      
      // Track scroll depth
      let maxScroll = 0;
      window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent;
          this.trackEvent('scroll_depth', { percent: scrollPercent });
        }
      });
    }
    
    trackPerformance() {
      // Track page load time
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        this.trackEvent('page_load_time', { time: loadTime });
      });
      
      // Track Core Web Vitals
      if ('web-vital' in window) {
        // This would integrate with web-vitals library
        console.log('Web Vitals tracking would be implemented here');
      }
    }
    
    trackEvent(eventName, data) {
      const event = {
        name: eventName,
        data: data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      this.events.push(event);
      console.log('Analytics Event:', event);
      
      // In a real implementation, you would send this to your analytics service
      // this.sendToAnalytics(event);
    }
  }
  
  // ===========================================
  // INITIALIZE ALL FEATURES
  // ===========================================
  
  // Initialize all advanced features
  const githubIntegration = new GitHubIntegration();
  const performanceOptimizer = new PerformanceOptimizer();
  const accessibilityEnhancer = new AccessibilityEnhancer();
  const mobileGestureHandler = new MobileGestureHandler();
  const searchEngine = new SearchEngine();
  const analyticsTracker = new AnalyticsTracker();
  
  // Load GitHub data
  githubIntegration.updatePortfolioWithGitHubData();
  
  // Optimize performance
  performanceOptimizer.optimizeImages();
  
  console.log('🚀 Advanced portfolio features loaded successfully!');
});

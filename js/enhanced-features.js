// Enhanced Portfolio Features
// Typing animation, project filtering, testimonials, and more

document.addEventListener('DOMContentLoaded', function() {
  // Typing Animation for Hero Section
  function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const texts = [
      'Welcome to My Portfolio',
      'I Build Amazing Web Solutions',
      'Passionate Software Engineer',
      'Creating Digital Experiences'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }
      
      setTimeout(typeText, typeSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(typeText, 1000);
  }
  
  // Project Filtering
  function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Skills Progress Bars Animation
  function initSkillsProgress() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const percentage = progressBar.getAttribute('data-percentage');
          progressBar.style.width = percentage + '%';
        }
      });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
  }
  
  // Testimonials Carousel
  function initTestimonialsCarousel() {
    const slider = document.querySelector('.testimonials-slider');
    const dots = document.querySelectorAll('.testimonial-dot');
    const cards = document.querySelectorAll('.testimonial-card');
    
    if (!slider || dots.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = cards.length;
    
    function updateSlider() {
      const translateX = -currentSlide * 100;
      slider.style.transform = `translateX(${translateX}%)`;
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    }
    
    // Auto-advance testimonials
    setInterval(nextSlide, 5000);
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
      });
    });
  }
  
  // Enhanced Contact Form
  function initEnhancedContactForm() {
    const form = document.querySelector('form[action*="formspree"]');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Form validation
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearError);
    });
    
    form.addEventListener('submit', handleSubmit);
    
    function validateField(e) {
      const field = e.target;
      const value = field.value.trim();
      const fieldName = field.name;
      
      clearError(e);
      
      if (!value) {
        showError(field, `${fieldName} is required`);
        return false;
      }
      
      if (fieldName === 'email' && !isValidEmail(value)) {
        showError(field, 'Please enter a valid email address');
        return false;
      }
      
      return true;
    }
    
    function clearError(e) {
      const field = e.target;
      const errorElement = field.parentNode.querySelector('.form-error');
      if (errorElement) {
        errorElement.style.display = 'none';
      }
      field.style.borderColor = 'rgba(255, 224, 102, 0.3)';
    }
    
    function showError(field, message) {
      const errorElement = field.parentNode.querySelector('.form-error') || createErrorElement(field.parentNode);
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      field.style.borderColor = '#ff6b6b';
    }
    
    function createErrorElement(parent) {
      const errorElement = document.createElement('div');
      errorElement.className = 'form-error';
      parent.appendChild(errorElement);
      return errorElement;
    }
    
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    function handleSubmit(e) {
      e.preventDefault();
      
      // Validate all fields
      let isValid = true;
      inputs.forEach(input => {
        if (!validateField({ target: input })) {
          isValid = false;
        }
      });
      
      if (!isValid) return;
      
      // Show loading state
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        showSuccessMessage();
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }
    
    function showSuccessMessage() {
      const successElement = document.createElement('div');
      successElement.className = 'form-success';
      successElement.textContent = 'Thank you! Your message has been sent successfully.';
      successElement.style.display = 'block';
      
      const form = document.querySelector('form[action*="formspree"]');
      form.parentNode.insertBefore(successElement, form);
      
      setTimeout(() => {
        successElement.remove();
      }, 5000);
    }
  }
  
  // Scroll Progress Indicator
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }
  
  // Smooth Scroll Navigation
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  // Back to Top Button
  function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '⬆️';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Intersection Observer for Animations
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => observer.observe(element));
  }
  
  // Initialize all features
  initTypingAnimation();
  initProjectFiltering();
  initSkillsProgress();
  initTestimonialsCarousel();
  initEnhancedContactForm();
  initScrollProgress();
  initSmoothScroll();
  initBackToTop();
  initScrollAnimations();
  
  // Add loading screen
  function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p>Loading Portfolio...</p>
      </div>
    `;
    loadingScreen.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #0a1124;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 1000);
    });
  }
  
  initLoadingScreen();
});

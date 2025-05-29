# Lindani Jonase Portfolio Website.

A modern, professional, and fully responsive portfolio website for Lindani Jonase. This project is a showcase of advanced front-end development, design, and interactivity, featuring a dark, masculine theme, animated backgrounds, dynamic weather dashboard, and a seamless user experience across all devices.

---

## 🌟 Key Features

- **Multi-Page Layout:** Home, About, Portfolio, Blog, Weather, Contact, and Game pages, each with a unique, modern design.
- **Animated Video Background:** Every page features a looping, dark-themed video background for a striking, immersive look.
- **Sidebar & Top Bar Navigation:**
  - On desktop, a fixed vertical sidebar with avatar, name, emoji icons, and theme toggle.
  - On mobile/tablet, the sidebar transforms into a sleek horizontal top bar for easy navigation.
- **Dark, Masculine Theme:** Navy, black, and deep accent colors throughout. No bright or pastel accents, for a bold, professional feel.
- **Glassmorphism & Modern Cards:** All content is presented in glassy, blurred cards with smooth shadows and subtle animations.
- **Responsive Design:** Fully adapts to all screen sizes. Navigation, layouts, and cards adjust for mobile, tablet, and desktop.
- **Weather Dashboard:**
  - Real-time weather using the OpenWeatherMap API.
  - Animated backgrounds and effects (sun, clouds, rain, thunder, snow) that reflect current conditions.
  - 5-day forecast with interactive, animated cards.
  - Robust error handling and fallback location.
- **Formal Introduction & About:**
  - Home page features a formal, professional intro.
  - About page includes a skills section and modern, centered card layout.
- **Portfolio Showcase:**
  - Latest projects displayed as stylish, interactive cards.
  - Each card highlights project details and links.
- **Blog:**
  - Technical articles and project write-ups in a modern, readable format.
- **Contact Page:**
  - Modern contact form for easy communication.
- **Game Page:**
  - Fun, interactive JavaScript game for engagement.
- **Theme Toggle:**
  - Persistent dark/light mode toggle, with user preference saved across sessions.
- **Live Clock:**
  - Sidebar/top bar displays a real-time digital clock (desktop only).
- **Modern Animations:**
  - Smooth fade-ins, hover effects, and animated weather visuals.

---

## 🖥️ Responsive & Mobile Experience
- **Desktop:**
  - Sidebar is always visible, providing quick access to all pages.
  - Content fills the viewport, with cards and sections centered and spaced for readability.
- **Mobile/Tablet:**
  - Sidebar becomes a top bar, with navigation links in a horizontal row.
  - Avatar, name, and theme toggle remain accessible.
  - All cards and layouts adjust for smaller screens, ensuring usability and beauty.

---

## 🛠️ Tech Stack
- **HTML5:** Semantic, accessible markup for all pages.
- **CSS3:**
  - Custom properties, Flexbox, Grid, glassmorphism, gradients, and video backgrounds.
  - Responsive design with media queries for all breakpoints.
- **Vanilla JavaScript (ES6+):**
  - Handles interactivity, sidebar/top bar logic, theme toggling, live clock, and weather API integration.
- **OpenWeatherMap API:**
  - Provides real-time weather data (current, hourly, and 5-day forecast).
- **FontAwesome:**
  - Crisp, scalable icons for navigation and UI.
- **Assets:**
  - Custom images, profile photos, and a looping background video.

---

## 📦 Project Structure
```
portfolio_site/
├── Assets/
│   ├── Images/
│   └── video/bg.mp4
├── css/
│   └── styles.css
├── js/
│   ├── sidebar.js
│   ├── weather.js
│   └── landing-cards.js
├── index.html
├── about.html
├── portfolio.html
├── blog.html
├── weather.html
├── contact.html
├── game.html
└── README.md
```

---

## 🚀 Getting Started
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd portfolio_site
   ```
2. **Open `index.html` in your browser.**
   - No build step required; all files are static.
3. **(Optional) Set your own OpenWeatherMap API key:**
   - Edit `js/weather.js` and `js/landing-cards.js` and replace the API key with your own for production use.

---

## 🖌️ Customization
- **Avatar & Name:** Replace `Assets/Images/JONAS2.JPG` and update your name in the sidebar HTML.
- **Projects/Blog:** Edit `portfolio.html` and `blog.html` to add your own content.
- **Theme Colors:** Tweak `css/styles.css` for your preferred color palette.
- **Background Video:** Replace `Assets/video/bg.mp4` with your own video for a unique look.

---

## 📋 Credits
- **Design & development:** Lindani Jonase
- **Weather data:** [OpenWeatherMap](https://openweathermap.org/)
- **Icons:** [FontAwesome](https://fontawesome.com/)
- **Background video:** Royalty-free or custom video (see `Assets/video/bg.mp4`)

---

## 💡 Philosophy & Approach
This project demonstrates advanced front-end skills, modern UI/UX, and real-world API integration. Every detail—from the animated backgrounds to the responsive navigation—was crafted for both beauty and usability. The codebase is clean, modular, and easy to extend for future features or personal branding.

---

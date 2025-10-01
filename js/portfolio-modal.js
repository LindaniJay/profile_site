// Project Details Modal Logic

document.addEventListener('DOMContentLoaded', function() {
  // Project data (expand as needed)
  const projects = {
    ride_share: {
      title: 'RIDE-SHARE',
      tech: 'TypeScript • React • Real-time',
      description: 'A modern ride-sharing application built with TypeScript, featuring real-time location tracking, driver matching, and secure payment processing. Designed for the South African market with local payment methods and route optimization.',
      image: 'Assets/Images/ride_share.png',
      links: [
        { label: 'GitHub', url: 'https://github.com/lindanijay/RIDE-SHARE' },
        { label: 'Live Demo', url: '#' }
      ]
    },
    thirdeye: {
      title: 'THIRDEYE',
      tech: 'React • Node.js • MongoDB',
      description: 'A full-stack web application for booking professional vehicle and property inspection services. Features include 200+ point mechanical inspection, full diagnostic scan, body and chassis assessment, pre-lease condition assessment, plumbing and electrical checks, and comprehensive photo/video documentation with detailed condition reports. Built with React 19, TypeScript, Tailwind CSS, Node.js, Express.js, and MongoDB.',
      image: 'Assets/Images/thirdeye.png',
      links: [
        { label: 'GitHub', url: 'https://github.com/lindanijay/THIRDEYE' },
        { label: 'Live Demo', url: '#' }
      ]
    },
    profile_site: {
      title: 'Portfolio Website',
      tech: 'CSS • HTML • JavaScript',
      description: 'A modern personal portfolio website showcasing projects, skills, and professional experience with glassmorphism design and responsive layout. Optimised for South African internet conditions.',
      image: 'Assets/Images/profile_site.png',
      links: [
        { label: 'GitHub', url: 'https://github.com/lindanijay/profile_site' },
        { label: 'Live Demo', url: '#' }
      ]
    },
    load_shedding: {
      title: 'Smart Load Shedding Manager',
      tech: 'JavaScript • South African Utility',
      description: 'A smart utility application designed specifically for South African load shedding schedules, helping users manage power outages and plan accordingly. Features real-time updates and notifications.',
      image: 'Assets/Images/load_shedding.png',
      links: [
        { label: 'GitHub', url: 'https://github.com/lindanijay/smart-load-shedding-manager' },
        { label: 'Live Demo', url: '#' }
      ]
    },
    chess_multiplayer: {
      title: 'Chess Multiplayer',
      tech: 'TypeScript • WebSocket • Game',
      description: 'A multiplayer chess game built with modern web technologies, featuring real-time gameplay, responsive design, and competitive play. Includes South African time zones and local tournaments.',
      image: 'Assets/Images/chess.png',
      links: [
        { label: 'GitHub', url: 'https://github.com/lindanijay/chess_multiplayer' },
        { label: 'Live Demo', url: '#' }
      ]
    },
    ai_web_builder: {
      title: 'AI Web Builder',
      tech: 'JavaScript • AI • Web Development',
      description: 'An intelligent web development tool powered by AI that helps developers create websites faster with automated code generation and smart suggestions. Designed for South African developers.',
      image: 'Assets/Images/ai_web_builder.png',
      links: [
        { label: 'GitHub', url: 'https://github.com/lindanijay/ai-web_builder' },
        { label: 'Live Demo', url: '#' }
      ]
    },
    website_builder: {
      title: 'Website Builder',
      tech: 'Python • Django • PostgreSQL',
      description: 'A powerful website builder tool that allows users to create professional websites with drag-and-drop functionality and custom templates. Built for South African small businesses.',
      image: 'Assets/Images/website_builder.png',
      links: [
        { label: 'GitHub', url: 'https://github.com/lindanijay/Wbsite-Builder' },
        { label: 'Live Demo', url: '#' }
      ]
    },
    tic_tac_toe: {
      title: 'Tic-Tac-Toe',
      tech: 'Python • AI • Game Logic',
      description: 'A classic Tic-Tac-Toe game with an intuitive interface and smart AI opponent for challenging gameplay and learning purposes. Features multiple difficulty levels.',
      image: 'Assets/Images/tic_tac_toe.png',
      links: [
        { label: 'GitHub', url: 'https://github.com/lindanijay/Tic-Tac-Toe' },
        { label: 'Play Online', url: '#' }
      ]
    }
  };

  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('projectModalBody');
  const closeBtn = document.getElementById('closeProjectModal');

  // Open modal and populate with project info
  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const key = btn.getAttribute('data-project');
      const project = projects[key];
      if (!project) return;
      modalBody.innerHTML = `
        <h2 style="color:#ffe066;margin-bottom:0.7rem;">${project.title}</h2>
        <div style="color:#b0b8c1;margin-bottom:0.7rem;">${project.tech}</div>
        <img src="${project.image}" alt="${project.title}" style="width:100%;max-width:320px;border-radius:0.7rem;margin-bottom:1rem;box-shadow:0 2px 12px #0006;" onerror="this.style.display='none'" />
        <p style="margin-bottom:1.2rem;">${project.description}</p>
        <div style="display:flex;gap:1.2rem;flex-wrap:wrap;">
          ${project.links.map(link => `<a href="${link.url}" class="modern-btn outline" target="_blank">${link.label}</a>`).join('')}
        </div>
      `;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
  });

  // Close modal
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) closeModal();
  });
}); 
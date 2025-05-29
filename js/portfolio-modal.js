// Project Details Modal Logic

document.addEventListener('DOMContentLoaded', function() {
  // Project data (expand as needed)
  const projects = {
    chess_multiplayer: {
      title: 'chess_multiplayer',
      tech: 'TypeScript',
      description: 'A multiplayer chess game with real-time play, chat, and elegant UI. Built with TypeScript and WebSockets.',
      image: 'Assets/Images/chess.png', // Replace with your image
      links: [
        { label: 'GitHub', url: 'https://github.com/lindanijay/chess_multiplayer' },
        { label: 'Live Demo', url: '#' }
      ]
    },
    'Wbsite-Builder': {
      title: 'Wbsite-Builder',
      tech: 'Python',
      description: 'A website builder tool that lets users create and deploy static sites with ease. Features drag-and-drop UI and template support.',
      image: 'Assets/Images/website_builder.png', // Replace with your image
      links: [
        { label: 'GitHub', url: 'https://github.com/lindanijay/Wbsite-Builder' },
        { label: 'Live Demo', url: '#' }
      ]
    },
    'Tic-Tac-Toe': {
      title: 'Tic-Tac-Toe',
      tech: 'Python',
      description: 'A classic Tic-Tac-Toe game with a clean UI and smart AI opponent. Play against the computer or a friend.',
      image: 'Assets/Images/tic_tac_toe.png', // Replace with your image
      links: [
        { label: 'GitHub', url: 'https://github.com/lindanijay/Tic-Tac-Toe' },
        { label: 'Play Online', url: '#' }
      ]
    },
    profile_site: {
      title: 'profile_site',
      tech: 'CSS',
      description: 'A personal profile website template with modern design, responsive layout, and easy customization.',
      image: 'Assets/Images/profile_site.png', // Replace with your image
      links: [
        { label: 'GitHub', url: 'https://github.com/lindanijay/profile_site' },
        { label: 'Live Demo', url: '#' }
      ]
    },
    // Add more projects here...
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
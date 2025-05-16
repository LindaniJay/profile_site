document.addEventListener('DOMContentLoaded', () => {
  const collaborateBtn = document.getElementById('collaborateBtn');
  if (!collaborateBtn) return;

  collaborateBtn.addEventListener('click', () => {
    const target = document.getElementById('portfolio');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
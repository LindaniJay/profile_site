document.addEventListener('DOMContentLoaded', () => {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (!copyEmailBtn) return;

  copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('lindanijonase@gmail.com')
      .then(() => alert('Email copied to clipboard!'))
      .catch(() => alert('Failed to copy email.'));
  });
});
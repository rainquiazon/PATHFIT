
// Highlight current page link
const current = window.location.pathname.split('/').pop();
document.querySelectorAll('.main-nav a').forEach(link => {
  if (link.getAttribute('href') === current) link.classList.add('active');
});

// Simple dropdown toggle for mobile
document.querySelectorAll('.dropbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const dropdown = btn.nextElementSibling;
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });
});

// Contact form save (demo)
const form = document.getElementById('contactForm');
if (form) {
  const list = document.getElementById('messagesList');
  const success = document.getElementById('successMsg');

  const render = () => {
    const msgs = JSON.parse(localStorage.getItem('roc_messages') || '[]');
    list.innerHTML = msgs.length
      ? msgs.map(m => `<li><b>${m.name}</b> (${m.email}): ${m.message}</li>`).join('')
      : '<li>No messages yet.</li>';
  };

  render();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = {
      name: name.value.trim(),
      email: email.value.trim(),
      subject: subject.value.trim(),
      message: message.value.trim()
    };
    if (!msg.name || !msg.email || !msg.message) return alert('Fill in all required fields.');
    const msgs = JSON.parse(localStorage.getItem('roc_messages') || '[]');
    msgs.unshift(msg);
    localStorage.setItem('roc_messages', JSON.stringify(msgs));
    form.reset();
    success.style.display = 'block';
    render();
    setTimeout(() => (success.style.display = 'none'), 3000);
  });
}
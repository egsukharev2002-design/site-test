// Minimal JS: update year and handle demo form
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Demo only: form has been “submitted” locally.');
  this.reset();
});
// год в подвале / footer year
document.getElementById('year').textContent = new Date().getFullYear();

// демо-форма / demo form
document.getElementById('contactForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  alert('Спасибо! Это демо. Подключим отправку позже.');
  e.target.reset();
});

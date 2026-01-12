// год в подвале
document.getElementById('year').textContent = new Date().getFullYear();

// демо-форма
document.getElementById('contactForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  alert('Спасибо! Это демо. Подключим отправку позже.');
  e.target.reset();
});

// Видео-превью на ховер
document.querySelectorAll('.card video.preview').forEach(v=>{
  if (!v.getAttribute('src')) return;

  const startPlay = () => {
    try {
      if (v.currentTime < 0.05) v.currentTime = 0.1;
      v.play().catch(()=>{});
    } catch {}
  };

  v.pause(); v.currentTime = 0;

  v.addEventListener('mouseenter', startPlay);
  v.addEventListener('mouseleave', ()=>{ v.pause(); v.currentTime = 0; });
  v.addEventListener('click', (e)=>{
    e.preventDefault();
    if (v.paused) startPlay(); else { v.pause(); v.currentTime = 0; }
  });
});

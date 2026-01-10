// год + демо-форма (оставь как было)
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('contactForm')?.addEventListener('submit', e=>{
  e.preventDefault(); alert('Спасибо! Это демо. Подключим отправку позже.'); e.target.reset();
});

// ▶️ ВИДЕО-ПРЕВЬЮ НА ХОВЕР (минимум кода)
document.querySelectorAll('.card video.preview').forEach(v => {
  // гарантируем паузу при загрузке
  v.pause(); v.currentTime = 0;

  v.addEventListener('mouseenter', () => { v.play().catch(()=>{}); });
  v.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });

  // на тач-экранах — проигрывать по тапу, повторный тап — пауза
  v.addEventListener('click', (e) => {
    e.preventDefault();
    if (v.paused) v.play().catch(()=>{}); else { v.pause(); v.currentTime = 0; }
  });
});

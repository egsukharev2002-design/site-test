// год в подвале
document.getElementById('year').textContent = new Date().getFullYear();

// демо-форма
document.getElementById('contactForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  alert('Спасибо! Это демо. Подключим отправку позже.');
  e.target.reset();
});

// видео-превью на ховер (одна карточка, но работает и для будущих)
document.querySelectorAll('.card video.preview').forEach(v=>{
  v.pause(); v.currentTime = 0;
  v.addEventListener('mouseenter', ()=>{ v.play().catch(()=>{}); });
  v.addEventListener('mouseleave', ()=>{ v.pause(); v.currentTime = 0; });
  // на телефонах — по тапу
  v.addEventListener('click', (e)=>{
    e.preventDefault();
    if (v.paused) v.play().catch(()=>{}); else { v.pause(); v.currentTime = 0; }
  });
});

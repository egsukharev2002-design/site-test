// Год в подвале
document.getElementById('year').textContent = new Date().getFullYear();

// Демо-форма (позже подключим Formspree/Web3Forms)
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Спасибо! Это демо. Подключим реальную отправку позже.');
  e.target.reset();
});

// Лайтбокс для изображений/видео из портфолио
const lightbox = document.getElementById('lightbox');
const lbContent = lightbox.querySelector('.lightbox-content');
const closeBtn = lightbox.querySelector('.close');

document.querySelectorAll('#work .card a').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const url = a.getAttribute('href');
    const type = a.dataset.type || 'image';

    lbContent.innerHTML = '';
    if (type === 'video') {
      const v = document.createElement('video');
      v.src = url;
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      lbContent.appendChild(v);
    } else {
      const img = document.createElement('img');
      img.src = url;
      img.alt = '';
      lbContent.appendChild(img);
    }
    lightbox.showModal();
  });
});

closeBtn.addEventListener('click', ()=> lightbox.close());
lightbox.addEventListener('click', (e)=>{
  const backdropClick = e.target === lightbox;
  if (backdropClick) lightbox.close();
});

// ===== Общие вещи =====
document.getElementById('year').textContent = new Date().getFullYear();

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

  v.pause();
  v.currentTime = 0;

  v.addEventListener('mouseenter', startPlay);
  v.addEventListener('mouseleave', ()=>{ v.pause(); v.currentTime = 0; });
  v.addEventListener('click', (e)=>{
    e.preventDefault();
    if (v.paused) startPlay(); else { v.pause(); v.currentTime = 0; }
  });
});

// ===== Режим редактирования + localStorage =====
const STORAGE_PREFIX = 'egs-portfolio-';

function loadEditableContent(){
  document.querySelectorAll('[data-editable][data-key]').forEach(node=>{
    const key = node.getAttribute('data-key');
    const saved = localStorage.getItem(STORAGE_PREFIX + key);
    if (saved !== null){
      node.innerHTML = saved;
    }
  });
}

function saveEditableContent(node){
  const key = node.getAttribute('data-key');
  if (!key) return;
  localStorage.setItem(STORAGE_PREFIX + key, node.innerHTML);
}

function setupEditableAutoSave(){
  document.querySelectorAll('[data-editable][data-key]').forEach(node=>{
    node.addEventListener('input', ()=>saveEditableContent(node));
  });
}

function toggleEdit(){
  const editableNodes = document.querySelectorAll('[data-editable][data-key]');
  if (!editableNodes.length) return;

  const isOn = editableNodes[0].isContentEditable;
  editableNodes.forEach(node=>{
    node.contentEditable = isOn ? "false" : "true";
  });

  const btn = document.querySelector('.edit-toggle');
  if (btn){
    if (isOn){
      btn.classList.remove('edit-toggle-active');
      btn.textContent = 'Редактировать текст';
      document.body.classList.remove('editing');
    } else {
      btn.classList.add('edit-toggle-active');
      btn.textContent = 'Режим редактирования активен';
      document.body.classList.add('editing');
    }
  }
}

window.toggleEdit = toggleEdit;

// ===== Кнопка "+" для тегов =====
function setupTagAddButtons(){
  document.querySelectorAll('.tag-add-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const tagList = btn.previousElementSibling; // .tag-list
      if (!tagList) return;

      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = 'Новый тег';

      tagList.appendChild(span);

      // если режим редактирования включен — сразу фокус внутрь
      if (document.body.classList.contains('editing')){
        tagList.contentEditable = "true";
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(span);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }

      // сохраняем весь список тегов как один блок
      const key = tagList.getAttribute('data-key');
      if (key){
        localStorage.setItem(STORAGE_PREFIX + key, tagList.innerHTML);
      }
    });
  });
}

// ===== Подробнее внутри карточек =====
function setupCardDetails(){
  document.querySelectorAll('.card').forEach(card=>{
    const btn = card.querySelector('.more-btn');
    const details = card.querySelector('.card-details');
    if (!btn || !details) return;

    btn.addEventListener('click', ()=>{
      card.classList.toggle('open');
    });
  });
}

// ===== Анимации карточек =====
function setupCardAnimations(){
  const cards = document.querySelectorAll('.card');
  if (!('IntersectionObserver' in window) || !cards.length){
    return;
  }

  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting){
        entry.target.classList.remove('card-hidden');
        entry.target.classList.add('card-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card=>{
    card.classList.add('card-hidden');
    observer.observe(card);
  });
}

// ===== Подсветка активного пункта меню =====
function setupActiveNav(){
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.menu a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  function onScroll(){
    const fromTop = window.scrollY + 120;
    let currentId = null;

    sections.forEach(sec=>{
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (fromTop >= top && fromTop < bottom){
        currentId = sec.id;
      }
    });

    navLinks.forEach(link=>{
      const href = link.getAttribute('href');
      if (href === '#' + currentId){
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  onScroll();
}

// ===== Telegram + гео по стране =====

// ⚠️ Здесь уже стоят твои реальные данные
const TELEGRAM_BOT_TOKEN = '8256927481:AAEEixacxGT2Igjw605lQKDP1ZDXtIvY_8M';
const TELEGRAM_CHAT_ID   = '630359141';

// Отправка сообщения в Telegram
function sendToTelegram(message) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram не настроен: нет токена или chat_id');
    return;
  }

  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    })
  }).catch(err => {
    console.error('Ошибка отправки в Telegram', err);
  });
}

// Определяем страну и шлём уведомление
async function detectCountryAndNotify() {
  try {
    // Чтобы не спамить при каждом обновлении вкладки — только 1 раз за сессию
    if (sessionStorage.getItem('geo-notified') === '1') {
      return;
    }

    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();

    const countryName = data.country_name || 'Unknown country';
    const countryCode = data.country || '';
    const city        = data.city || '';
    const ip          = data.ip || '';

    const text =
      'Новый посетитель сайта 🔔\n' +
      `Страна: ${countryName} (${countryCode})\n` +
      (city ? `Город: ${city}\n` : '') +
      `IP: ${ip}`;

    sendToTelegram(text);

    sessionStorage.setItem('geo-notified', '1');
  } catch (err) {
    console.error('Не удалось получить страну', err);
  }
}

// ===== Старт =====
document.addEventListener('DOMContentLoaded', ()=>{
  loadEditableContent();
  setupEditableAutoSave();
  setupTagAddButtons();
  setupCardDetails();
  setupCardAnimations();
  setupActiveNav();
  detectCountryAndNotify();
});

// Год в подвале
document.getElementById('year').textContent = new Date().getFullYear();

// Демо-форма
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

// ===== РЕДАКТИРОВАНИЕ С СОХРАНЕНИЕМ В localStorage =====

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
    } else {
      btn.classList.add('edit-toggle-active');
      btn.textContent = 'Режим редактирования активен';
    }
  }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', ()=>{
  loadEditableContent();
  setupEditableAutoSave();
});

// Делаем функцию доступной из HTML
window.toggleEdit = toggleEdit;

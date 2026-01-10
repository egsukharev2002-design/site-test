# Plain-code Website Starter (RU/EN)

**RU (Русский)**  
Это стартовый шаблон сайта без конструкторов: чистые HTML/CSS/JS.
- Откройте `index.html` в браузере — сайт уже работает локально.
- Размещайте бесплатно на:
  1) **GitHub Pages** — репозиторий `username.github.io` (или включите Pages в настройках репо) → `main` / `/root`.
  2) **Netlify** — перетащите папку в панель или подключите репозиторий. Build не требуется.
  3) **Vercel** — «Add New Project» → подключите репозиторий → `Output Directory`: `/`.

Быстрый деплой на GitHub Pages:
```bash
git init
git add .
git commit -m "init"
git branch -M main
# Замените USER/REPO на свои
git remote add origin https://github.com/USER/REPO.git
git push -u origin main
# Включите Pages: Settings → Pages → Branch: main, Folder: / (root)
```

**EN (English)**  
A no-builder starter using plain HTML/CSS/JS.
- Open `index.html` in your browser — it runs locally.
- Free hosting options:
  1) **GitHub Pages** — repo `username.github.io` or enable Pages for any repo → branch `main`, folder `/root`.
  2) **Netlify** — drag-and-drop the folder in the dashboard or connect a repo. No build needed.
  3) **Vercel** — Add New Project → connect repo → `Output Directory`: `/`.

Quick deploy to GitHub Pages (same commands as above).
```

Дополнительно / Extras:
- Положите статические файлы (картинки и т.п.) в папку `assets/`.
- Для одностраничных приложений на Netlify включите SPA-фоллбек (`_redirects` с `/* /index.html 200`).
- Чтобы отключить Jekyll на Pages, добавьте пустой файл `.nojekyll`.
document.addEventListener("DOMContentLoaded", () => {

  // === Переключение разделов ===
  const menuItems = document.querySelectorAll("#menu li");
  const sections = document.querySelectorAll(".content");

  function showSection(id) {
    sections.forEach(section => {
      section.classList.remove("active");
      if (section.id === id) section.classList.add("active");
    });
  }

  // Переключение вкладок (но работает ТОЛЬКО когда меню видно)
  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      if (menu.style.display === "none") return; // меню скрыто → вкладки отключены

      const target = item.getAttribute("data-section");

      // Если выбрали "Регистрация / вход"
      if (target === "auth") {
        openAuth();
        return;
      }

      showSection(target);
    });
  });

  // === Отправка формы контактов ===
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      alert("Спасибо! Ваше сообщение отправлено.");
    });
  }

  // === Видео в Истории ===
  const icons = document.querySelectorAll(".icon-btn");
  const videoPopup = document.querySelector(".video-popup");
  const videoPlayer = document.querySelector(".video-popup video");

  if (icons.length && videoPopup && videoPlayer) {
    icons.forEach(icon => {
      icon.addEventListener("click", () => {
        if (menu.style.display === "none") return; // видео нельзя открыть до входа

        icons.forEach(i => i.classList.remove("active"));
        icon.classList.add("active");

        videoPlayer.src = icon.dataset.video;
        videoPopup.classList.add("active");
        videoPlayer.play();
      });
    });

    videoPopup.addEventListener("click", (e) => {
      if (e.target === videoPopup) {
        videoPopup.classList.remove("active");
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
      }
    });
  }

  // === РЕГИСТРАЦИЯ ===
  const auth = document.getElementById("auth");
  const menu = document.getElementById("menu");
  const loginBtn = document.getElementById("loginBtn");
  const guestBtn = document.getElementById("guestBtn");
  const authForm = document.getElementById("authForm");

  function hideAll() {
    sections.forEach(s => s.classList.remove("active"));
  }

  function openAuth() {
    hideAll();
    auth.style.display = "block";
    auth.classList.add("active");

    // скрываем меню полностью
    menu.style.display = "none";
  }

  function openMain() {
    hideAll();
    auth.style.display = "none";
    auth.classList.remove("active");

    // включаем меню
    menu.style.display = "flex";

    // открываем главную
    document.getElementById("home").classList.add("active");
  }

  loginBtn.addEventListener("click", openAuth);
  guestBtn.addEventListener("click", openMain);

  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    openMain();
  });

  // При первой загрузке – показываем регистрацию
  openAuth();
});


// === Переключатель тем ===
(function () {
  const bodyEl = document.body;

  if (!bodyEl.classList.contains('dark-theme') &&
      !bodyEl.classList.contains('light-theme')) {
    bodyEl.classList.add('dark-theme');
  }

  if (!document.getElementById('theme-toggle')) {
    const toggle = document.createElement('div');
    toggle.id = 'theme-toggle';
    toggle.innerHTML = '<span class="icon">🌙</span>';

    const header = document.querySelector('header');
    if (header) {
      header.style.position = header.style.position || 'relative';
      header.appendChild(toggle);
    } else {
      document.body.appendChild(toggle);
    }

    const saved = localStorage.getItem('site-theme');
    if (saved === 'light') {
      bodyEl.classList.remove('dark-theme');
      bodyEl.classList.add('light-theme');
      toggle.querySelector('.icon').textContent = '☀️';
    } else {
      bodyEl.classList.remove('light-theme');
      bodyEl.classList.add('dark-theme');
      toggle.querySelector('.icon').textContent = '🌙';
    }

    toggle.addEventListener('click', () => {
      const isLight = bodyEl.classList.toggle('light-theme');

      if (isLight) {
        bodyEl.classList.remove('dark-theme');
        toggle.querySelector('.icon').textContent = '☀️';
        localStorage.setItem('site-theme', 'light');
      } else {
        bodyEl.classList.add('dark-theme');
        toggle.querySelector('.icon').textContent = '🌙';
        localStorage.setItem('site-theme', 'dark');
      }
    });
  }
})();

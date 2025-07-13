document.addEventListener('DOMContentLoaded', () => {
  // === Тема / настрій ===
  const body = document.body;
  const themeToggle = document.getElementById('toggle-theme');
  const moodToggle  = document.getElementById('toggle-mood');
  const moods = ['mood-mint','mood-coral','mood-pastel','mood-gray'];

  function loadPrefs() {
    if (localStorage.getItem('theme') === 'light') body.classList.add('theme-light');
    const m = localStorage.getItem('mood');
    if (m && moods.includes(m)) body.classList.add(m);
  }

  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('theme-light');
    localStorage.setItem('theme', body.classList.contains('theme-light') ? 'light' : 'dark');
  });

  moodToggle?.addEventListener('click', () => {
    moods.forEach(c => body.classList.remove(c));
    const newMood = moods[Math.floor(Math.random() * moods.length)];
    body.classList.add(newMood);
    localStorage.setItem('mood', newMood);
  });

  loadPrefs();

  // === Ініціалізація Swiper ===
  new Swiper('.gallery-swiper', {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    autoplay: { delay: 3000, disableOnInteraction: false },
    breakpoints: {
      768:  { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
});

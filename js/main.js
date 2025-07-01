// main.js — JavaScript для HugRug

document.addEventListener("DOMContentLoaded", () => {
  console.log("HugRug JS connected");

  // Обробка форм
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      alert("Форма поки що не обробляється 😄");
    });
  });

  // Анімація fade-in з затримкою
  const elements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 100}ms`;
    observer.observe(el);
  });

  // Перемикач теми
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Зчитати тему з localStorage
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("toggle-theme");
  const moodToggle = document.getElementById("toggle-mood");
  const moods = ["mood-mint", "mood-coral", "mood-pastel", "mood-gray"];

  function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    const savedMood = localStorage.getItem("mood");
    if (savedTheme === "light") {
      body.classList.add("theme-light");
    } else {
      body.classList.remove("theme-light");
    }
    if (moods.includes(savedMood)) {
      body.classList.add(savedMood);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("theme-light");
      localStorage.setItem("theme", body.classList.contains("theme-light") ? "light" : "dark");
    });
  }

  if (moodToggle) {
    moodToggle.addEventListener("click", () => {
      moods.forEach(m => body.classList.remove(m));
      const newMood = moods[Math.floor(Math.random() * moods.length)];
      body.classList.add(newMood);
      localStorage.setItem("mood", newMood);
    });
  }

  loadTheme();
});

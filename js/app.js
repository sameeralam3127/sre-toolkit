// Initialize theme on page load
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const themeToggle = document.getElementById("themeToggle");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("light");
    if (themeToggle) themeToggle.textContent = "🌙";
  }
}

// Setup theme toggle on DOM ready
function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    const body = document.body;
    const isLight = body.classList.toggle("light");

    if (isLight) {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "🌙";
    }
  });
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupThemeToggle();
});

// Fallback if DOMContentLoaded already fired
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    setupThemeToggle();
  });
} else {
  initTheme();
  setupThemeToggle();
}

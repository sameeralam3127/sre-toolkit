// Initialize theme on page load
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const themeToggle = document.getElementById("themeToggle");

  if (savedTheme === "light") {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    if (themeToggle) {
      const icon = themeToggle.querySelector("i");
      icon.setAttribute("data-feather", "sun");
    }
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    if (themeToggle) {
      const icon = themeToggle.querySelector("i");
      icon.setAttribute("data-feather", "moon");
    }
  }
  if (typeof feather !== "undefined") {
    feather.replace();
  }
}

// Setup theme toggle on DOM ready
function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");

    if (isDark) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
      const icon = themeToggle.querySelector("i");
      icon.setAttribute("data-feather", "sun");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      const icon = themeToggle.querySelector("i");
      icon.setAttribute("data-feather", "moon");
    }

    if (typeof feather !== "undefined") {
      feather.replace();
    }
  });
}

// Initialize on window load to ensure DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    setupThemeToggle();
  });
} else {
  initTheme();
  setupThemeToggle();
}

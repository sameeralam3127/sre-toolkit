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
      icon.classList.remove("text-yellow-300");
      icon.classList.add("text-yellow-500");
    }
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    if (themeToggle) {
      const icon = themeToggle.querySelector("i");
      icon.setAttribute("data-feather", "moon");
      icon.classList.add("text-yellow-300");
    }
  }

  // Delay feather.replace to ensure DOM is ready
  setTimeout(() => {
    if (typeof feather !== "undefined") {
      feather.replace();
    }
  }, 50);
}

// Setup theme toggle on DOM ready
function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  themeToggle.addEventListener("click", (e) => {
    e.preventDefault();
    const isDark = document.body.classList.contains("dark");
    const icon = themeToggle.querySelector("i");

    if (isDark) {
      // Switch to light mode
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
      icon.setAttribute("data-feather", "sun");
      icon.classList.remove("text-yellow-300");
      icon.classList.add("text-yellow-500");
    } else {
      // Switch to dark mode
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
      icon.setAttribute("data-feather", "moon");
      icon.classList.remove("text-yellow-500");
      icon.classList.add("text-yellow-300");
    }

    // Delay feather.replace to ensure DOM updates
    setTimeout(() => {
      if (typeof feather !== "undefined") {
        feather.replace();
      }
    }, 10);
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

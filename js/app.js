// Initialize theme on page load
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";

  if (savedTheme === "light") {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  }

  // Update theme toggle icon if it exists
  updateThemeIcon();
}

function updateThemeIcon() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  const icon = themeToggle.querySelector("i");
  if (!icon) return;

  const isDark = document.body.classList.contains("dark");

  if (isDark) {
    icon.setAttribute("data-feather", "moon");
    icon.classList.remove("text-yellow-500");
    icon.classList.add("text-yellow-300");
  } else {
    icon.setAttribute("data-feather", "sun");
    icon.classList.remove("text-yellow-300");
    icon.classList.add("text-yellow-500");
  }

  // Replace feather icons
  if (typeof feather !== "undefined") {
    feather.replace();
  }
}

// Setup theme toggle on DOM ready
function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  themeToggle.addEventListener("click", (e) => {
    e.preventDefault();
    const isDark = document.body.classList.contains("dark");

    if (isDark) {
      // Switch to light mode
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      // Switch to dark mode
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }

    // Update icon
    updateThemeIcon();
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

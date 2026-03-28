// Initialize theme on page load
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const themeToggle = document.getElementById("themeToggle");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("light");
    themeToggle.textContent = "🌙";
  }
}

// Toggle theme
document.getElementById("themeToggle").onclick = () => {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const isLight = body.classList.toggle("light");

  if (isLight) {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "🌙";
  }
};

// Initialize on load
document.addEventListener("DOMContentLoaded", initTheme);

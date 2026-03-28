// Set output to element
function setOutput(id, text) {
  document.getElementById(id).textContent = text;
}

// Copy to clipboard
function copyToClipboard(id) {
  const element = document.getElementById(id);
  const text = element.textContent;

  if (!text) {
    showNotification("Nothing to copy", "warning");
    return;
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      showNotification("Copied to clipboard!", "success");
    })
    .catch((err) => {
      showNotification("Failed to copy", "error");
    });
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");

  // Define Tailwind classes for each type
  const styleMap = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  const styleClass = styleMap[type] || styleMap.info;

  notification.className = `fixed top-4 right-4 px-4 py-3 rounded-lg text-white font-semibold z-50 opacity-0 transform translate-x-96 transition-all duration-300 ${styleClass}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => {
    notification.classList.remove("opacity-0");
    notification.classList.remove("translate-x-96");
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.add("opacity-0");
    notification.classList.add("translate-x-96");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + Enter to execute tools
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    const activeElement = document.activeElement;

    if (activeElement.id === "jsonInput") {
      toJson();
    } else if (activeElement.id === "cronInput") {
      parseCron();
    } else if (activeElement.id === "base64Input") {
      encodeBase64();
    } else if (activeElement.id === "cidrInput") {
      calcCIDR();
    }
  }
});

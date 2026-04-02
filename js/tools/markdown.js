// Markdown Preview
function renderMarkdownTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="file" class="text-blue-400"></i>
        Markdown Preview
      </h2>
      <p class="text-sm opacity-75 mb-4">Live markdown rendering and preview</p>
      
      <textarea
        id="markdownInput"
        class="w-full p-3 rounded-lg mb-4 min-h-[150px] font-mono text-sm"
        placeholder="# Heading&#10;**Bold** and *italic*&#10;- List item"
        oninput="renderMarkdown()"
      ></textarea>
      
      <div class="mb-2 text-sm font-semibold">Preview:</div>
      <div id="markdownOutput" class="p-4 rounded-lg overflow-auto max-h-96 mb-3" style="background-color: var(--bg-tertiary); min-height: 100px;"></div>
      
      <div class="flex gap-2">
        <button
          onclick="copyMarkdownHtml()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="code" style="width: 16px; height: 16px;"></i>
          Copy HTML
        </button>
        <button
          onclick="clearMarkdownInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function renderMarkdown() {
  try {
    const markdown = document.getElementById("markdownInput").value;
    if (!markdown) {
      document.getElementById("markdownOutput").innerHTML =
        '<p class="opacity-50">Preview will appear here...</p>';
      return;
    }

    // Simple markdown parser
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.*?)__/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank">$1</a>',
      )
      // Code
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Lists
      .replace(/^\* (.*$)/gim, "<li>$1</li>")
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      // Line breaks
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>");

    // Wrap in paragraph if not already wrapped
    if (!html.startsWith("<")) {
      html = "<p>" + html + "</p>";
    }

    // Wrap lists
    html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

    document.getElementById("markdownOutput").innerHTML = html;
  } catch (e) {
    document.getElementById("markdownOutput").innerHTML =
      '<p class="text-red-500">Error rendering markdown</p>';
  }
}

function copyMarkdownHtml() {
  const html = document.getElementById("markdownOutput").innerHTML;
  if (!html || html.includes("Preview will appear")) {
    showNotification("Nothing to copy", "warning");
    return;
  }

  navigator.clipboard
    .writeText(html)
    .then(() => showNotification("✓ HTML copied to clipboard", "success"))
    .catch(() => showNotification("Failed to copy", "error"));
}

function clearMarkdownInput() {
  document.getElementById("markdownInput").value = "";
  document.getElementById("markdownOutput").innerHTML =
    '<p class="opacity-50">Preview will appear here...</p>';
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("markdownInput")) {
    renderMarkdown();
  }
});

// Made with Bob

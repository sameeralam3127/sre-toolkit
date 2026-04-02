// HTML Entity Encoder
function renderHtmlEntityTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="code" class="text-blue-400"></i>
        HTML Entity Encoder
      </h2>
      <p class="text-sm opacity-75 mb-4">Convert special characters to HTML entities</p>
      
      <textarea
        id="htmlEntityInput"
        class="w-full p-3 rounded-lg mb-4 min-h-[120px] font-mono text-sm"
        placeholder="Enter text with special characters"
      ></textarea>
      
      <div class="flex gap-3 mb-4">
        <button
          onclick="encodeHtmlEntities()"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="lock" style="width: 16px; height: 16px;"></i>
          Encode
        </button>
        <button
          onclick="decodeHtmlEntities()"
          class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="unlock" style="width: 16px; height: 16px;"></i>
          Decode
        </button>
      </div>
      
      <pre id="htmlEntityOutput" class="p-3 rounded-lg overflow-auto max-h-60 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('htmlEntityOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearHtmlEntityInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function encodeHtmlEntities() {
  try {
    const text = document.getElementById("htmlEntityInput").value;
    if (!text) {
      setOutput("htmlEntityOutput", "");
      return;
    }

    const entityMap = {
      "&": "&",
      "<": "<",
      ">": ">",
      '"': '"',
      "'": "&#" + "39;",
    };

    const encoded = text.replace(/[&<>"']/g, (char) => entityMap[char]);

    setOutput("htmlEntityOutput", encoded);
    showNotification("✓ HTML entities encoded", "success");
  } catch (e) {
    setOutput("htmlEntityOutput", "❌ Error encoding: " + e.message);
    showNotification("Encoding error", "error");
  }
}

function decodeHtmlEntities() {
  try {
    const text = document.getElementById("htmlEntityInput").value;
    if (!text) {
      setOutput("htmlEntityOutput", "");
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    const decoded = textarea.value;

    setOutput("htmlEntityOutput", decoded);
    showNotification("✓ HTML entities decoded", "success");
  } catch (e) {
    setOutput("htmlEntityOutput", "❌ Error decoding: " + e.message);
    showNotification("Decoding error", "error");
  }
}

function clearHtmlEntityInput() {
  document.getElementById("htmlEntityInput").value = "";
  setOutput("htmlEntityOutput", "");
}

// Made with Bob

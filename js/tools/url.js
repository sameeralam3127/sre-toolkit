// URL Encoder/Decoder
function renderUrlTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="link" class="text-blue-400"></i>
        URL Encoder/Decoder
      </h2>
      <p class="text-sm opacity-75 mb-4">Encode and decode URL components</p>
      
      <textarea
        id="urlInput"
        class="w-full p-3 rounded-lg mb-4 min-h-[120px] font-mono text-sm"
        placeholder="Enter URL or text to encode/decode"
      ></textarea>
      
      <div class="flex gap-3 mb-4 flex-wrap">
        <button
          onclick="encodeUrl()"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="lock" style="width: 16px; height: 16px;"></i>
          Encode
        </button>
        <button
          onclick="decodeUrl()"
          class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="unlock" style="width: 16px; height: 16px;"></i>
          Decode
        </button>
        <button
          onclick="encodeUrlComponent()"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="package" style="width: 16px; height: 16px;"></i>
          Encode Component
        </button>
      </div>
      
      <pre id="urlOutput" class="p-3 rounded-lg overflow-auto max-h-60 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('urlOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearUrlInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function encodeUrl() {
  try {
    const val = document.getElementById("urlInput").value;
    if (!val.trim()) {
      setOutput("urlOutput", "");
      return;
    }
    const encoded = encodeURI(val);
    setOutput("urlOutput", encoded);
    showNotification("✓ URL encoded", "success");
  } catch (e) {
    setOutput("urlOutput", "❌ Error encoding: " + e.message);
    showNotification("Encoding error", "error");
  }
}

function decodeUrl() {
  try {
    const val = document.getElementById("urlInput").value.trim();
    if (!val) {
      setOutput("urlOutput", "");
      return;
    }
    const decoded = decodeURI(val);
    setOutput("urlOutput", decoded);
    showNotification("✓ URL decoded", "success");
  } catch (e) {
    setOutput("urlOutput", "❌ Error decoding: " + e.message);
    showNotification("Decoding error", "error");
  }
}

function encodeUrlComponent() {
  try {
    const val = document.getElementById("urlInput").value;
    if (!val.trim()) {
      setOutput("urlOutput", "");
      return;
    }
    const encoded = encodeURIComponent(val);
    setOutput("urlOutput", encoded);
    showNotification("✓ URL component encoded", "success");
  } catch (e) {
    setOutput("urlOutput", "❌ Error encoding: " + e.message);
    showNotification("Encoding error", "error");
  }
}

function clearUrlInput() {
  document.getElementById("urlInput").value = "";
  setOutput("urlOutput", "");
}

// Made with Bob

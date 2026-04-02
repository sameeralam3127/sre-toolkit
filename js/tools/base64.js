// Base64 Encoder/Decoder
function renderBase64Tool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="hash" class="text-blue-400"></i>
        Base64 Encoder/Decoder
      </h2>
      <p class="text-sm opacity-75 mb-4">Encode and decode Base64 strings</p>
      
      <textarea
        id="base64Input"
        class="w-full p-3 rounded-lg mb-4 min-h-[120px] font-mono text-sm"
        placeholder="Enter text to encode/decode"
      ></textarea>
      
      <div class="flex gap-3 mb-4 flex-wrap">
        <button
          onclick="encodeBase64()"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="lock" style="width: 16px; height: 16px;"></i>
          Encode
        </button>
        <button
          onclick="decodeBase64()"
          class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="unlock" style="width: 16px; height: 16px;"></i>
          Decode
        </button>
        <button
          onclick="encodeBase64Url()"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="link" style="width: 16px; height: 16px;"></i>
          URL-Safe
        </button>
      </div>
      
      <pre id="base64Output" class="p-3 rounded-lg overflow-auto max-h-60 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('base64Output')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearBase64Input()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function encodeBase64() {
  try {
    const val = document.getElementById("base64Input").value;
    if (!val.trim()) {
      setOutput("base64Output", "");
      return;
    }
    const encoded = btoa(unescape(encodeURIComponent(val)));
    const charCount = encoded.length;
    setOutput(
      "base64Output",
      `${encoded}\n\n📊 Length: ${charCount} characters`,
    );
    showNotification("✓ Encoded to Base64", "success");
  } catch (e) {
    setOutput("base64Output", "❌ Error encoding: " + e.message);
    showNotification("Encoding error", "error");
  }
}

function decodeBase64() {
  try {
    const val = document.getElementById("base64Input").value.trim();
    if (!val) {
      setOutput("base64Output", "");
      return;
    }
    const decoded = decodeURIComponent(escape(atob(val)));
    const charCount = decoded.length;
    setOutput(
      "base64Output",
      `${decoded}\n\n📊 Length: ${charCount} characters`,
    );
    showNotification("✓ Decoded from Base64", "success");
  } catch (e) {
    setOutput("base64Output", "❌ Invalid Base64: " + e.message);
    showNotification("Invalid Base64", "error");
  }
}

function encodeBase64Url() {
  try {
    const val = document.getElementById("base64Input").value;
    if (!val.trim()) {
      setOutput("base64Output", "");
      return;
    }
    const encoded = btoa(unescape(encodeURIComponent(val)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    const charCount = encoded.length;
    setOutput(
      "base64Output",
      `${encoded}\n\n📊 Length: ${charCount} characters\n✓ URL-safe (no +, /, or = characters)`,
    );
    showNotification("✓ Encoded to URL-safe Base64", "success");
  } catch (e) {
    setOutput("base64Output", "❌ Error encoding: " + e.message);
    showNotification("Encoding error", "error");
  }
}

function clearBase64Input() {
  document.getElementById("base64Input").value = "";
  setOutput("base64Output", "");
}

// Made with Bob

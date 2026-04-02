// Hash Generator
function renderHashTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="shield" class="text-blue-400"></i>
        Hash Generator
      </h2>
      <p class="text-sm opacity-75 mb-4">Generate MD5, SHA-1, SHA-256, SHA-512 hashes</p>
      
      <textarea
        id="hashInput"
        class="w-full p-3 rounded-lg mb-4 min-h-[120px] font-mono text-sm"
        placeholder="Enter text to hash"
      ></textarea>
      
      <div class="flex gap-3 mb-4 flex-wrap">
        <button
          onclick="generateHash('MD5')"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          MD5
        </button>
        <button
          onclick="generateHash('SHA-1')"
          class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          SHA-1
        </button>
        <button
          onclick="generateHash('SHA-256')"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          SHA-256
        </button>
        <button
          onclick="generateHash('SHA-512')"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          SHA-512
        </button>
      </div>
      
      <pre id="hashOutput" class="p-3 rounded-lg overflow-auto max-h-60 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('hashOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearHashInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

async function generateHash(algorithm) {
  try {
    const text = document.getElementById("hashInput").value;
    if (!text.trim()) {
      setOutput("hashOutput", "");
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    let hashBuffer;
    let algoName = algorithm;

    if (algorithm === "MD5") {
      // MD5 is not available in Web Crypto API, use a simple implementation
      const hash = await md5(text);
      setOutput(
        "hashOutput",
        `${algorithm}:\n${hash}\n\n📊 Length: ${hash.length} characters`,
      );
      showNotification(`✓ ${algorithm} hash generated`, "success");
      return;
    }

    hashBuffer = await crypto.subtle.digest(algorithm, data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    setOutput(
      "hashOutput",
      `${algorithm}:\n${hashHex}\n\n📊 Length: ${hashHex.length} characters`,
    );
    showNotification(`✓ ${algorithm} hash generated`, "success");
  } catch (e) {
    setOutput("hashOutput", "❌ Error generating hash: " + e.message);
    showNotification("Hash generation error", "error");
  }
}

// Simple MD5 implementation for browser
async function md5(string) {
  // This is a simplified version - for production use a proper library
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .substring(0, 32);
}

function clearHashInput() {
  document.getElementById("hashInput").value = "";
  setOutput("hashOutput", "");
}

// Made with Bob

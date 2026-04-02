// JWT Decoder
function renderJwtTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="key" class="text-blue-400"></i>
        JWT Decoder
      </h2>
      <p class="text-sm opacity-75 mb-4">Decode and inspect JWT tokens</p>
      
      <textarea
        id="jwtInput"
        class="w-full p-3 rounded-lg mb-4 min-h-[100px] font-mono text-sm"
        placeholder="Paste JWT token here (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
      ></textarea>
      
      <div class="flex gap-3 mb-4">
        <button
          onclick="decodeJwt()"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="unlock" style="width: 16px; height: 16px;"></i>
          Decode
        </button>
      </div>
      
      <pre id="jwtOutput" class="p-3 rounded-lg overflow-auto max-h-96 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('jwtOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearJwtInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function decodeJwt() {
  try {
    const token = document.getElementById("jwtInput").value.trim();
    if (!token) {
      setOutput("jwtOutput", "");
      return;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      setOutput(
        "jwtOutput",
        "❌ Invalid JWT format\n\nJWT should have 3 parts separated by dots:\nheader.payload.signature",
      );
      showNotification("Invalid JWT format", "error");
      return;
    }

    const [headerB64, payloadB64, signature] = parts;

    // Decode header
    const header = JSON.parse(
      atob(headerB64.replace(/-/g, "+").replace(/_/g, "/")),
    );

    // Decode payload
    const payload = JSON.parse(
      atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/")),
    );

    let output = "🔐 JWT Token Decoded\n";
    output += "================================\n\n";

    output += "📋 HEADER\n";
    output += "--------\n";
    output += JSON.stringify(header, null, 2);
    output += "\n\n";

    output += "📦 PAYLOAD\n";
    output += "--------\n";
    output += JSON.stringify(payload, null, 2);
    output += "\n\n";

    output += "✍️ SIGNATURE\n";
    output += "--------\n";
    output += signature;
    output += "\n\n";

    // Add helpful info
    output += "ℹ️ TOKEN INFO\n";
    output += "--------\n";
    output += `Algorithm: ${header.alg || "Unknown"}\n`;
    output += `Type: ${header.typ || "Unknown"}\n`;

    if (payload.exp) {
      const expDate = new Date(payload.exp * 1000);
      const now = new Date();
      const isExpired = expDate < now;
      output += `Expires: ${expDate.toLocaleString()} ${isExpired ? "(EXPIRED ❌)" : "(Valid ✓)"}\n`;
    }

    if (payload.iat) {
      const iatDate = new Date(payload.iat * 1000);
      output += `Issued At: ${iatDate.toLocaleString()}\n`;
    }

    if (payload.nbf) {
      const nbfDate = new Date(payload.nbf * 1000);
      output += `Not Before: ${nbfDate.toLocaleString()}\n`;
    }

    if (payload.iss) {
      output += `Issuer: ${payload.iss}\n`;
    }

    if (payload.sub) {
      output += `Subject: ${payload.sub}\n`;
    }

    if (payload.aud) {
      output += `Audience: ${payload.aud}\n`;
    }

    setOutput("jwtOutput", output);
    showNotification("✓ JWT decoded successfully", "success");
  } catch (e) {
    setOutput("jwtOutput", "❌ Error decoding JWT\n\n" + e.message);
    showNotification("Error decoding JWT", "error");
  }
}

function clearJwtInput() {
  document.getElementById("jwtInput").value = "";
  setOutput("jwtOutput", "");
}

// Made with Bob

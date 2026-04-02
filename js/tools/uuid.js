// UUID Generator
function renderUuidTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="hash" class="text-blue-400"></i>
        UUID Generator
      </h2>
      <p class="text-sm opacity-75 mb-4">Generate UUIDs (v4) with bulk option</p>
      
      <div class="mb-4">
        <label class="block text-sm mb-2">Number of UUIDs:</label>
        <div class="flex gap-3">
          <input
            id="uuidCount"
            type="number"
            min="1"
            max="100"
            value="1"
            class="flex-1 p-3 rounded-lg font-mono"
          />
          <button
            onclick="generateUuids()"
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <i data-feather="zap" style="width: 16px; height: 16px;"></i>
            Generate
          </button>
        </div>
      </div>
      
      <div class="flex gap-2 mb-4">
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" id="uuidUppercase" class="rounded" />
          Uppercase
        </label>
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" id="uuidNoDashes" class="rounded" />
          No dashes
        </label>
      </div>
      
      <pre id="uuidOutput" class="p-3 rounded-lg overflow-auto max-h-96 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('uuidOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy All
        </button>
        <button
          onclick="clearUuidOutput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function generateUuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateUuids() {
  try {
    const count = parseInt(document.getElementById("uuidCount").value) || 1;
    const uppercase = document.getElementById("uuidUppercase").checked;
    const noDashes = document.getElementById("uuidNoDashes").checked;

    if (count < 1 || count > 100) {
      setOutput("uuidOutput", "❌ Please enter a number between 1 and 100");
      showNotification("Invalid count", "error");
      return;
    }

    const uuids = [];
    for (let i = 0; i < count; i++) {
      let uuid = generateUuid();
      if (noDashes) {
        uuid = uuid.replace(/-/g, "");
      }
      if (uppercase) {
        uuid = uuid.toUpperCase();
      }
      uuids.push(uuid);
    }

    let output = uuids.join("\n");
    output += `\n\n📊 Generated ${count} UUID${count > 1 ? "s" : ""}`;

    setOutput("uuidOutput", output);
    showNotification(
      `✓ Generated ${count} UUID${count > 1 ? "s" : ""}`,
      "success",
    );
  } catch (e) {
    setOutput("uuidOutput", "❌ Error generating UUIDs: " + e.message);
    showNotification("Generation error", "error");
  }
}

function clearUuidOutput() {
  setOutput("uuidOutput", "");
}

// Made with Bob

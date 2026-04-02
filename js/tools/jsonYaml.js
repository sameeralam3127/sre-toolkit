// JSON ⇄ YAML Converter
function renderJsonYamlTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="code" class="text-blue-400"></i>
        JSON ⇄ YAML
      </h2>
      <p class="text-sm opacity-75 mb-4">Convert between JSON and YAML formats</p>
      
      <textarea
        id="jsonInput"
        class="w-full p-3 rounded-lg mb-4 min-h-[150px] font-mono text-sm"
        placeholder='{"key": "value"} or key: value'
      ></textarea>
      
      <div class="flex gap-3 mb-4 flex-wrap">
        <button
          onclick="toYaml()"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="arrow-right" style="width: 16px; height: 16px;"></i>
          To YAML
        </button>
        <button
          onclick="toJson()"
          class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="arrow-left" style="width: 16px; height: 16px;"></i>
          To JSON
        </button>
        <button
          onclick="validateJson()"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="check-circle" style="width: 16px; height: 16px;"></i>
          Validate
        </button>
        <button
          onclick="minifyJson()"
          class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="minimize-2" style="width: 16px; height: 16px;"></i>
          Minify
        </button>
      </div>
      
      <pre id="jsonOutput" class="p-3 rounded-lg overflow-auto max-h-60 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('jsonOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearJsonInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function toYaml() {
  try {
    const input = document.getElementById("jsonInput").value.trim();
    if (!input) {
      setOutput("jsonOutput", "");
      return;
    }
    const parsed = JSON.parse(input);
    const yaml = jsyaml.dump(parsed, { indent: 2, lineWidth: -1 });
    setOutput("jsonOutput", yaml);
    showNotification("✓ Converted to YAML", "success");
  } catch (e) {
    setOutput("jsonOutput", "❌ Invalid JSON: " + e.message);
    showNotification("Invalid JSON", "error");
  }
}

function toJson() {
  try {
    const input = document.getElementById("jsonInput").value.trim();
    if (!input) {
      setOutput("jsonOutput", "");
      return;
    }
    const parsed = jsyaml.load(input);
    const json = JSON.stringify(parsed, null, 2);
    setOutput("jsonOutput", json);
    showNotification("✓ Converted to JSON", "success");
  } catch (e) {
    setOutput("jsonOutput", "❌ Invalid YAML: " + e.message);
    showNotification("Invalid YAML", "error");
  }
}

function validateJson() {
  try {
    const input = document.getElementById("jsonInput").value.trim();
    if (!input) {
      setOutput("jsonOutput", "Please enter JSON to validate");
      return;
    }
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, 2);
    setOutput("jsonOutput", "✓ Valid JSON!\n\n" + formatted);
    showNotification("✓ Valid JSON", "success");
  } catch (e) {
    setOutput("jsonOutput", "❌ Invalid JSON\n\n" + e.message);
    showNotification("Invalid JSON", "error");
  }
}

function minifyJson() {
  try {
    const input = document.getElementById("jsonInput").value.trim();
    if (!input) {
      setOutput("jsonOutput", "");
      return;
    }
    const parsed = JSON.parse(input);
    const minified = JSON.stringify(parsed);
    setOutput("jsonOutput", minified);
    showNotification("✓ JSON minified", "success");
  } catch (e) {
    setOutput("jsonOutput", "❌ Invalid JSON: " + e.message);
    showNotification("Invalid JSON", "error");
  }
}

function clearJsonInput() {
  document.getElementById("jsonInput").value = "";
  setOutput("jsonOutput", "");
}

// Made with Bob

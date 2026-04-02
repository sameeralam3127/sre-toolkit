// CSV to JSON Converter
function renderCsvJsonTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="file-text" class="text-blue-400"></i>
        CSV to JSON
      </h2>
      <p class="text-sm opacity-75 mb-4">Convert CSV data to JSON format</p>
      
      <textarea
        id="csvInput"
        class="w-full p-3 rounded-lg mb-4 min-h-[150px] font-mono text-sm"
        placeholder="name,age,city&#10;John,30,NYC&#10;Jane,25,LA"
      ></textarea>
      
      <div class="flex gap-3 mb-4">
        <button
          onclick="convertCsvToJson()"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="arrow-right" style="width: 16px; height: 16px;"></i>
          Convert to JSON
        </button>
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" id="csvHasHeaders" checked class="rounded" />
          First row is headers
        </label>
      </div>
      
      <pre id="csvOutput" class="p-3 rounded-lg overflow-auto max-h-96 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('csvOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearCsvInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function convertCsvToJson() {
  try {
    const csv = document.getElementById("csvInput").value.trim();
    if (!csv) {
      setOutput("csvOutput", "");
      return;
    }

    const hasHeaders = document.getElementById("csvHasHeaders").checked;
    const lines = csv
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    if (lines.length === 0) {
      setOutput("csvOutput", "❌ No data to convert");
      return;
    }

    const result = [];
    const headers = hasHeaders
      ? lines[0].split(",").map((h) => h.trim())
      : null;
    const dataLines = hasHeaders ? lines.slice(1) : lines;

    dataLines.forEach((line, index) => {
      const values = line.split(",").map((v) => v.trim());

      if (hasHeaders && headers) {
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = values[i] || "";
        });
        result.push(obj);
      } else {
        result.push(values);
      }
    });

    const json = JSON.stringify(result, null, 2);
    setOutput("csvOutput", json);
    showNotification(`✓ Converted ${result.length} rows`, "success");
  } catch (e) {
    setOutput("csvOutput", "❌ Error converting: " + e.message);
    showNotification("Conversion error", "error");
  }
}

function clearCsvInput() {
  document.getElementById("csvInput").value = "";
  setOutput("csvOutput", "");
}

// Made with Bob

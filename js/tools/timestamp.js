// Timestamp Converter
function renderTimestampTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="calendar" class="text-blue-400"></i>
        Timestamp Converter
      </h2>
      <p class="text-sm opacity-75 mb-4">Convert between Unix timestamps and human-readable dates</p>
      
      <div class="mb-4">
        <label class="block text-sm mb-2">Unix Timestamp (seconds):</label>
        <div class="flex gap-3">
          <input
            id="timestampInput"
            type="text"
            class="flex-1 p-3 rounded-lg font-mono"
            placeholder="1234567890"
          />
          <button
            onclick="convertTimestamp()"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <i data-feather="arrow-right" style="width: 16px; height: 16px;"></i>
            Convert
          </button>
        </div>
      </div>
      
      <div class="mb-4">
        <label class="block text-sm mb-2">Or enter a date:</label>
        <div class="flex gap-3">
          <input
            id="dateInput"
            type="datetime-local"
            class="flex-1 p-3 rounded-lg font-mono"
          />
          <button
            onclick="convertDate()"
            class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <i data-feather="arrow-left" style="width: 16px; height: 16px;"></i>
            Convert
          </button>
        </div>
      </div>
      
      <button
        onclick="setCurrentTimestamp()"
        class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors mb-4 flex items-center justify-center gap-2"
      >
        <i data-feather="clock" style="width: 16px; height: 16px;"></i>
        Current Timestamp
      </button>
      
      <pre id="timestampOutput" class="p-3 rounded-lg overflow-auto max-h-60 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('timestampOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearTimestampInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function convertTimestamp() {
  try {
    const timestamp = document.getElementById("timestampInput").value.trim();
    if (!timestamp) {
      setOutput("timestampOutput", "");
      return;
    }

    const ts = parseInt(timestamp);
    if (isNaN(ts)) {
      setOutput("timestampOutput", "❌ Invalid timestamp");
      showNotification("Invalid timestamp", "error");
      return;
    }

    const date = new Date(ts * 1000);

    let output = "🕐 Timestamp Conversion\n";
    output += "================================\n\n";
    output += `Unix Timestamp: ${ts}\n`;
    output += `Milliseconds: ${ts * 1000}\n\n`;
    output += `Local Time: ${date.toLocaleString()}\n`;
    output += `UTC: ${date.toUTCString()}\n`;
    output += `ISO 8601: ${date.toISOString()}\n\n`;
    output += `Date: ${date.toLocaleDateString()}\n`;
    output += `Time: ${date.toLocaleTimeString()}\n\n`;
    output += `Relative: ${getRelativeTime(date)}`;

    setOutput("timestampOutput", output);
    showNotification("✓ Timestamp converted", "success");
  } catch (e) {
    setOutput("timestampOutput", "❌ Error converting timestamp: " + e.message);
    showNotification("Conversion error", "error");
  }
}

function convertDate() {
  try {
    const dateStr = document.getElementById("dateInput").value;
    if (!dateStr) {
      setOutput("timestampOutput", "");
      return;
    }

    const date = new Date(dateStr);
    const timestamp = Math.floor(date.getTime() / 1000);

    let output = "🕐 Date Conversion\n";
    output += "================================\n\n";
    output += `Unix Timestamp: ${timestamp}\n`;
    output += `Milliseconds: ${date.getTime()}\n\n`;
    output += `Local Time: ${date.toLocaleString()}\n`;
    output += `UTC: ${date.toUTCString()}\n`;
    output += `ISO 8601: ${date.toISOString()}\n\n`;
    output += `Relative: ${getRelativeTime(date)}`;

    setOutput("timestampOutput", output);
    showNotification("✓ Date converted", "success");
  } catch (e) {
    setOutput("timestampOutput", "❌ Error converting date: " + e.message);
    showNotification("Conversion error", "error");
  }
}

function setCurrentTimestamp() {
  const now = new Date();
  const timestamp = Math.floor(now.getTime() / 1000);

  document.getElementById("timestampInput").value = timestamp;
  document.getElementById("dateInput").value = now.toISOString().slice(0, 16);

  convertTimestamp();
}

function getRelativeTime(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return `${diffSec} seconds ago`;
  if (diffMin < 60) return `${diffMin} minutes ago`;
  if (diffHour < 24) return `${diffHour} hours ago`;
  if (diffDay < 30) return `${diffDay} days ago`;
  if (diffDay < 365) return `${Math.floor(diffDay / 30)} months ago`;
  return `${Math.floor(diffDay / 365)} years ago`;
}

function clearTimestampInput() {
  document.getElementById("timestampInput").value = "";
  document.getElementById("dateInput").value = "";
  setOutput("timestampOutput", "");
}

// Made with Bob

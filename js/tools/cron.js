// Cron Expression Helper
function renderCronTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="clock" class="text-blue-400"></i>
        Cron Expression Helper
      </h2>
      <p class="text-sm opacity-75 mb-4">Parse and explain cron expressions</p>
      
      <div class="flex gap-3 mb-4">
        <input
          id="cronInput"
          class="flex-1 p-3 rounded-lg font-mono"
          placeholder="*/5 * * * *"
        />
        <button
          onclick="parseCron()"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="help-circle" style="width: 16px; height: 16px;"></i>
          Explain
        </button>
      </div>
      
      <div class="mb-4 text-sm opacity-75">
        <p class="mb-2">Common patterns:</p>
        <div class="grid grid-cols-2 gap-2">
          <button onclick="setCronExample('*/5 * * * *')" class="text-left px-2 py-1 rounded hover:bg-opacity-10" style="background-color: var(--bg-tertiary);">*/5 * * * * - Every 5 min</button>
          <button onclick="setCronExample('0 * * * *')" class="text-left px-2 py-1 rounded hover:bg-opacity-10" style="background-color: var(--bg-tertiary);">0 * * * * - Every hour</button>
          <button onclick="setCronExample('0 0 * * *')" class="text-left px-2 py-1 rounded hover:bg-opacity-10" style="background-color: var(--bg-tertiary);">0 0 * * * - Daily at midnight</button>
          <button onclick="setCronExample('0 0 * * 0')" class="text-left px-2 py-1 rounded hover:bg-opacity-10" style="background-color: var(--bg-tertiary);">0 0 * * 0 - Weekly on Sunday</button>
        </div>
      </div>
      
      <pre id="cronOutput" class="p-3 rounded-lg overflow-auto max-h-60 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('cronOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearCronInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function setCronExample(pattern) {
  document.getElementById("cronInput").value = pattern;
  parseCron();
}

function parseCron() {
  const val = document.getElementById("cronInput").value.trim();
  if (!val) {
    setOutput("cronOutput", "Please enter a cron expression");
    return;
  }

  try {
    const parts = val.split(/\s+/);
    if (parts.length !== 5) {
      setOutput(
        "cronOutput",
        "❌ Invalid format. Use: minute hour day month dow\n\nExample: */5 * * * * (every 5 minutes)",
      );
      return;
    }

    const [min, hour, day, month, dow] = parts;
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let explanation = "📅 Cron Expression Breakdown:\n";
    explanation += "================================\n\n";
    explanation += formatCronField("Minute", min, 0, 59);
    explanation += formatCronField("Hour", hour, 0, 23);
    explanation += formatCronField("Day of Month", day, 1, 31);
    explanation += formatCronField("Month", month, 1, 12, months);
    explanation += formatCronField("Day of Week", dow, 0, 6, days);

    explanation += "\n📝 Human Readable:\n";
    explanation += "================================\n";
    explanation += generateHumanReadable(
      min,
      hour,
      day,
      month,
      dow,
      days,
      months,
    );

    setOutput("cronOutput", explanation);
    showNotification("✓ Cron parsed successfully", "success");
  } catch (e) {
    setOutput("cronOutput", "❌ Error parsing cron expression");
    showNotification("Error parsing cron", "error");
  }
}

function formatCronField(label, value, min, max, names = null) {
  let formatted = `${label}: `;

  if (value === "*") {
    formatted += "Every";
  } else if (value.includes("/")) {
    const [range, interval] = value.split("/");
    formatted += `Every ${interval}`;
  } else if (value.includes("-")) {
    formatted += `Range ${value}`;
  } else if (value.includes(",")) {
    formatted += `Specific values: ${value}`;
  } else if (names && !isNaN(value)) {
    formatted += names[parseInt(value)] || value;
  } else {
    formatted += value;
  }

  return formatted + "\n";
}

function generateHumanReadable(min, hour, day, month, dow, days, months) {
  let readable = "Runs ";

  // Frequency
  if (min.includes("/")) {
    const interval = min.split("/")[1];
    readable += `every ${interval} minute(s)`;
  } else if (min === "*") {
    readable += "every minute";
  } else {
    readable += `at minute ${min}`;
  }

  // Hour
  if (hour !== "*") {
    if (hour.includes("/")) {
      const interval = hour.split("/")[1];
      readable += `, every ${interval} hour(s)`;
    } else {
      readable += ` of hour ${hour}`;
    }
  }

  // Day
  if (day !== "*") {
    readable += `, on day ${day} of the month`;
  }

  // Month
  if (month !== "*") {
    const monthNum = parseInt(month) - 1;
    readable += `, in ${months[monthNum] || month}`;
  }

  // Day of week
  if (dow !== "*") {
    const dowNum = parseInt(dow);
    readable += `, on ${days[dowNum] || dow}`;
  }

  return readable;
}

function clearCronInput() {
  document.getElementById("cronInput").value = "";
  setOutput("cronOutput", "");
}

// Made with Bob

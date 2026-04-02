// Regex Tester
function renderRegexTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="search" class="text-blue-400"></i>
        Regex Tester
      </h2>
      <p class="text-sm opacity-75 mb-4">Test regular expressions with live matching</p>
      
      <div class="mb-4">
        <label class="block text-sm mb-2">Regular Expression:</label>
        <div class="flex gap-2">
          <input
            id="regexPattern"
            type="text"
            class="flex-1 p-3 rounded-lg font-mono"
            placeholder="\\d{3}-\\d{3}-\\d{4}"
          />
          <div class="flex gap-2">
            <label class="flex items-center gap-1 text-sm px-2">
              <input type="checkbox" id="regexGlobal" checked class="rounded" />
              g
            </label>
            <label class="flex items-center gap-1 text-sm px-2">
              <input type="checkbox" id="regexCaseInsensitive" class="rounded" />
              i
            </label>
            <label class="flex items-center gap-1 text-sm px-2">
              <input type="checkbox" id="regexMultiline" class="rounded" />
              m
            </label>
          </div>
        </div>
      </div>
      
      <div class="mb-4">
        <label class="block text-sm mb-2">Test String:</label>
        <textarea
          id="regexTestString"
          class="w-full p-3 rounded-lg min-h-[120px] font-mono text-sm"
          placeholder="Enter text to test against the regex pattern"
        ></textarea>
      </div>
      
      <button
        onclick="testRegex()"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors mb-4 flex items-center justify-center gap-2"
      >
        <i data-feather="play" style="width: 16px; height: 16px;"></i>
        Test Regex
      </button>
      
      <pre id="regexOutput" class="p-3 rounded-lg overflow-auto max-h-96 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('regexOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearRegexInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function testRegex() {
  try {
    const pattern = document.getElementById("regexPattern").value;
    const testString = document.getElementById("regexTestString").value;

    if (!pattern) {
      setOutput("regexOutput", "Please enter a regex pattern");
      return;
    }

    if (!testString) {
      setOutput("regexOutput", "Please enter a test string");
      return;
    }

    let flags = "";
    if (document.getElementById("regexGlobal").checked) flags += "g";
    if (document.getElementById("regexCaseInsensitive").checked) flags += "i";
    if (document.getElementById("regexMultiline").checked) flags += "m";

    const regex = new RegExp(pattern, flags);
    const matches = [
      ...testString.matchAll(
        new RegExp(pattern, flags + (flags.includes("g") ? "" : "g")),
      ),
    ];

    let output = "🔍 Regex Test Results\n";
    output += "================================\n\n";
    output += `Pattern: /${pattern}/${flags}\n`;
    output += `Test String Length: ${testString.length} characters\n\n`;

    if (matches.length === 0) {
      output += "❌ No matches found\n";
    } else {
      output += `✓ Found ${matches.length} match${matches.length > 1 ? "es" : ""}\n\n`;

      matches.forEach((match, index) => {
        output += `Match ${index + 1}:\n`;
        output += `  Text: "${match[0]}"\n`;
        output += `  Position: ${match.index}\n`;

        if (match.length > 1) {
          output += `  Groups:\n`;
          for (let i = 1; i < match.length; i++) {
            output += `    Group ${i}: "${match[i]}"\n`;
          }
        }
        output += "\n";
      });

      // Show highlighted version
      output += "📝 Highlighted Text:\n";
      output += "================================\n";
      let highlighted = testString;
      let offset = 0;
      matches.forEach((match) => {
        const start = match.index + offset;
        const end = start + match[0].length;
        highlighted =
          highlighted.slice(0, start) +
          "【" +
          match[0] +
          "】" +
          highlighted.slice(end);
        offset += 2; // Account for added brackets
      });
      output += highlighted;
    }

    setOutput("regexOutput", output);
    showNotification(
      matches.length > 0
        ? `✓ Found ${matches.length} match${matches.length > 1 ? "es" : ""}`
        : "No matches found",
      matches.length > 0 ? "success" : "warning",
    );
  } catch (e) {
    setOutput("regexOutput", "❌ Invalid regex pattern\n\n" + e.message);
    showNotification("Invalid regex", "error");
  }
}

function clearRegexInput() {
  document.getElementById("regexPattern").value = "";
  document.getElementById("regexTestString").value = "";
  setOutput("regexOutput", "");
}

// Made with Bob

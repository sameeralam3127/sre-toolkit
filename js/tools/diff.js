// Text Diff Checker
function renderDiffTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="git-branch" class="text-blue-400"></i>
        Text Diff Checker
      </h2>
      <p class="text-sm opacity-75 mb-4">Compare two text blocks and highlight differences</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm mb-2">Original Text:</label>
          <textarea
            id="diffOriginal"
            class="w-full p-3 rounded-lg min-h-[150px] font-mono text-sm"
            placeholder="Enter original text"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm mb-2">Modified Text:</label>
          <textarea
            id="diffModified"
            class="w-full p-3 rounded-lg min-h-[150px] font-mono text-sm"
            placeholder="Enter modified text"
          ></textarea>
        </div>
      </div>
      
      <button
        onclick="compareDiff()"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors mb-4 flex items-center justify-center gap-2"
      >
        <i data-feather="git-branch" style="width: 16px; height: 16px;"></i>
        Compare
      </button>
      
      <pre id="diffOutput" class="p-3 rounded-lg overflow-auto max-h-96 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('diffOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearDiffInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function compareDiff() {
  try {
    const original = document.getElementById("diffOriginal").value;
    const modified = document.getElementById("diffModified").value;

    if (!original && !modified) {
      setOutput("diffOutput", "Please enter text in both fields");
      return;
    }

    const originalLines = original.split("\n");
    const modifiedLines = modified.split("\n");

    let output = "📊 Diff Comparison\n";
    output += "================================\n\n";

    // Simple line-by-line comparison
    const maxLines = Math.max(originalLines.length, modifiedLines.length);
    let additions = 0;
    let deletions = 0;
    let changes = 0;

    output += "Line-by-line comparison:\n\n";

    for (let i = 0; i < maxLines; i++) {
      const origLine = originalLines[i] || "";
      const modLine = modifiedLines[i] || "";

      if (origLine === modLine) {
        output += `  ${i + 1}: ${origLine}\n`;
      } else if (!origLine && modLine) {
        output += `+ ${i + 1}: ${modLine}\n`;
        additions++;
      } else if (origLine && !modLine) {
        output += `- ${i + 1}: ${origLine}\n`;
        deletions++;
      } else {
        output += `- ${i + 1}: ${origLine}\n`;
        output += `+ ${i + 1}: ${modLine}\n`;
        changes++;
      }
    }

    output += "\n📈 Statistics:\n";
    output += "================================\n";
    output += `Original lines: ${originalLines.length}\n`;
    output += `Modified lines: ${modifiedLines.length}\n`;
    output += `Additions: ${additions} lines\n`;
    output += `Deletions: ${deletions} lines\n`;
    output += `Changes: ${changes} lines\n`;

    const similarity = calculateSimilarity(original, modified);
    output += `Similarity: ${similarity.toFixed(1)}%`;

    setOutput("diffOutput", output);
    showNotification("✓ Comparison complete", "success");
  } catch (e) {
    setOutput("diffOutput", "❌ Error comparing: " + e.message);
    showNotification("Comparison error", "error");
  }
}

function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 100.0;

  const editDistance = levenshteinDistance(longer, shorter);
  return ((longer.length - editDistance) / longer.length) * 100;
}

function levenshteinDistance(str1, str2) {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

function clearDiffInput() {
  document.getElementById("diffOriginal").value = "";
  document.getElementById("diffModified").value = "";
  setOutput("diffOutput", "");
}

// Made with Bob

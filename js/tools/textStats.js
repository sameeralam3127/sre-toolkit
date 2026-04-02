// Text Statistics
function renderTextStatsTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="bar-chart-2" class="text-blue-400"></i>
        Text Statistics
      </h2>
      <p class="text-sm opacity-75 mb-4">Count words, characters, lines, and more</p>
      
      <textarea
        id="textStatsInput"
        class="w-full p-3 rounded-lg mb-4 min-h-[150px] font-mono text-sm"
        placeholder="Enter or paste text to analyze"
        oninput="analyzeText()"
      ></textarea>
      
      <pre id="textStatsOutput" class="p-3 rounded-lg overflow-auto max-h-96 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('textStatsOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearTextStatsInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function analyzeText() {
  try {
    const text = document.getElementById("textStatsInput").value;

    if (!text) {
      setOutput("textStatsOutput", "");
      return;
    }

    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split("\n").length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;

    // Calculate reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);

    // Calculate speaking time (average 150 words per minute)
    const speakingTime = Math.ceil(words / 150);

    let output = "📊 Text Statistics\n";
    output += "================================\n\n";
    output += `Characters: ${chars.toLocaleString()}\n`;
    output += `Characters (no spaces): ${charsNoSpaces.toLocaleString()}\n`;
    output += `Words: ${words.toLocaleString()}\n`;
    output += `Lines: ${lines.toLocaleString()}\n`;
    output += `Sentences: ${sentences.toLocaleString()}\n`;
    output += `Paragraphs: ${paragraphs.toLocaleString()}\n\n`;

    output += "⏱️ Time Estimates:\n";
    output += "================================\n";
    output += `Reading time: ~${readingTime} min\n`;
    output += `Speaking time: ~${speakingTime} min\n\n`;

    if (words > 0) {
      output += "📈 Averages:\n";
      output += "================================\n";
      output += `Avg word length: ${(charsNoSpaces / words).toFixed(1)} chars\n`;
      output += `Avg sentence length: ${(words / sentences).toFixed(1)} words\n`;
    }

    setOutput("textStatsOutput", output);
  } catch (e) {
    setOutput("textStatsOutput", "❌ Error analyzing text: " + e.message);
  }
}

function clearTextStatsInput() {
  document.getElementById("textStatsInput").value = "";
  setOutput("textStatsOutput", "");
}

// Made with Bob

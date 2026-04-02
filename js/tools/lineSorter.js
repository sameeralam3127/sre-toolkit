// Line Sorter
function renderLineSorterTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="list" class="text-blue-400"></i>
        Line Sorter
      </h2>
      <p class="text-sm opacity-75 mb-4">Sort lines alphabetically or numerically</p>
      
      <textarea
        id="lineSorterInput"
        class="w-full p-3 rounded-lg mb-4 min-h-[150px] font-mono text-sm"
        placeholder="Enter lines to sort (one per line)"
      ></textarea>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <button
          onclick="sortLines('asc')"
          class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          A → Z
        </button>
        <button
          onclick="sortLines('desc')"
          class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          Z → A
        </button>
        <button
          onclick="sortLines('numeric')"
          class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          0 → 9
        </button>
        <button
          onclick="sortLines('reverse')"
          class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          Reverse
        </button>
        <button
          onclick="sortLines('length')"
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          By Length
        </button>
        <button
          onclick="sortLines('unique')"
          class="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          Remove Dupes
        </button>
        <button
          onclick="sortLines('shuffle')"
          class="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          Shuffle
        </button>
        <button
          onclick="sortLines('trim')"
          class="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          Trim Lines
        </button>
      </div>
      
      <pre id="lineSorterOutput" class="p-3 rounded-lg overflow-auto max-h-96 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('lineSorterOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearLineSorterInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function sortLines(mode) {
  try {
    const text = document.getElementById("lineSorterInput").value;
    if (!text.trim()) {
      setOutput("lineSorterOutput", "");
      return;
    }

    let lines = text.split("\n");
    const originalCount = lines.length;

    switch (mode) {
      case "asc":
        lines.sort((a, b) => a.localeCompare(b));
        break;
      case "desc":
        lines.sort((a, b) => b.localeCompare(a));
        break;
      case "numeric":
        lines.sort((a, b) => {
          const numA = parseFloat(a);
          const numB = parseFloat(b);
          if (isNaN(numA) && isNaN(numB)) return 0;
          if (isNaN(numA)) return 1;
          if (isNaN(numB)) return -1;
          return numA - numB;
        });
        break;
      case "reverse":
        lines.reverse();
        break;
      case "length":
        lines.sort((a, b) => a.length - b.length);
        break;
      case "unique":
        lines = [...new Set(lines)];
        break;
      case "shuffle":
        for (let i = lines.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [lines[i], lines[j]] = [lines[j], lines[i]];
        }
        break;
      case "trim":
        lines = lines.map((line) => line.trim()).filter((line) => line);
        break;
    }

    let output = lines.join("\n");
    if (mode === "unique" || mode === "trim") {
      output += `\n\n📊 ${originalCount} → ${lines.length} lines`;
    }

    setOutput("lineSorterOutput", output);
    showNotification(`✓ Lines sorted (${mode})`, "success");
  } catch (e) {
    setOutput("lineSorterOutput", "❌ Error sorting: " + e.message);
    showNotification("Sorting error", "error");
  }
}

function clearLineSorterInput() {
  document.getElementById("lineSorterInput").value = "";
  setOutput("lineSorterOutput", "");
}

// Made with Bob

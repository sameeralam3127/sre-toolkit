// Text Case Converter
function renderTextCaseTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="type" class="text-blue-400"></i>
        Text Case Converter
      </h2>
      <p class="text-sm opacity-75 mb-4">Convert text between different cases</p>
      
      <textarea
        id="textCaseInput"
        class="w-full p-3 rounded-lg mb-4 min-h-[120px] font-mono text-sm"
        placeholder="Enter text to convert"
      ></textarea>
      
      <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
        <button
          onclick="convertCase('upper')"
          class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          UPPERCASE
        </button>
        <button
          onclick="convertCase('lower')"
          class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          lowercase
        </button>
        <button
          onclick="convertCase('title')"
          class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          Title Case
        </button>
        <button
          onclick="convertCase('sentence')"
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          Sentence case
        </button>
        <button
          onclick="convertCase('camel')"
          class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          camelCase
        </button>
        <button
          onclick="convertCase('pascal')"
          class="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          PascalCase
        </button>
        <button
          onclick="convertCase('snake')"
          class="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          snake_case
        </button>
        <button
          onclick="convertCase('kebab')"
          class="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          kebab-case
        </button>
        <button
          onclick="convertCase('constant')"
          class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
        >
          CONSTANT_CASE
        </button>
      </div>
      
      <pre id="textCaseOutput" class="p-3 rounded-lg overflow-auto max-h-60 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('textCaseOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearTextCaseInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function convertCase(caseType) {
  try {
    const text = document.getElementById("textCaseInput").value;
    if (!text.trim()) {
      setOutput("textCaseOutput", "");
      return;
    }

    let result = "";

    switch (caseType) {
      case "upper":
        result = text.toUpperCase();
        break;
      case "lower":
        result = text.toLowerCase();
        break;
      case "title":
        result = text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
        break;
      case "sentence":
        result = text
          .toLowerCase()
          .replace(/(^\w|\.\s+\w)/g, (c) => c.toUpperCase());
        break;
      case "camel":
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
          .replace(/^[A-Z]/, (c) => c.toLowerCase());
        break;
      case "pascal":
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
          .replace(/^[a-z]/, (c) => c.toUpperCase());
        break;
      case "snake":
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "_")
          .replace(/^_+|_+$/g, "");
        break;
      case "kebab":
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        break;
      case "constant":
        result = text
          .toUpperCase()
          .replace(/[^a-zA-Z0-9]+/g, "_")
          .replace(/^_+|_+$/g, "");
        break;
      default:
        result = text;
    }

    setOutput("textCaseOutput", result);
    showNotification(`✓ Converted to ${caseType} case`, "success");
  } catch (e) {
    setOutput("textCaseOutput", "❌ Error converting: " + e.message);
    showNotification("Conversion error", "error");
  }
}

function clearTextCaseInput() {
  document.getElementById("textCaseInput").value = "";
  setOutput("textCaseOutput", "");
}

// Made with Bob

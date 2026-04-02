// SQL Formatter
function renderSqlFormatterTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="database" class="text-blue-400"></i>
        SQL Formatter
      </h2>
      <p class="text-sm opacity-75 mb-4">Format and beautify SQL queries</p>
      
      <textarea
        id="sqlInput"
        class="w-full p-3 rounded-lg mb-4 min-h-[150px] font-mono text-sm"
        placeholder="SELECT * FROM users WHERE id=1"
      ></textarea>
      
      <div class="flex gap-3 mb-4">
        <button
          onclick="formatSql()"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="align-left" style="width: 16px; height: 16px;"></i>
          Format
        </button>
        <button
          onclick="minifySql()"
          class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="minimize-2" style="width: 16px; height: 16px;"></i>
          Minify
        </button>
      </div>
      
      <pre id="sqlOutput" class="p-3 rounded-lg overflow-auto max-h-96 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('sqlOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearSqlInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function formatSql() {
  try {
    const sql = document.getElementById("sqlInput").value.trim();
    if (!sql) {
      setOutput("sqlOutput", "");
      return;
    }

    const keywords = [
      "SELECT",
      "FROM",
      "WHERE",
      "JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "INNER JOIN",
      "ON",
      "AND",
      "OR",
      "ORDER BY",
      "GROUP BY",
      "HAVING",
      "LIMIT",
      "OFFSET",
      "INSERT INTO",
      "VALUES",
      "UPDATE",
      "SET",
      "DELETE FROM",
      "CREATE TABLE",
      "ALTER TABLE",
      "DROP TABLE",
    ];

    let formatted = sql;

    // Add newlines before major keywords
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      formatted = formatted.replace(regex, "\n" + keyword);
    });

    // Clean up and indent
    formatted = formatted
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line)
      .join("\n");

    setOutput("sqlOutput", formatted);
    showNotification("✓ SQL formatted", "success");
  } catch (e) {
    setOutput("sqlOutput", "❌ Error formatting: " + e.message);
    showNotification("Formatting error", "error");
  }
}

function minifySql() {
  try {
    const sql = document.getElementById("sqlInput").value.trim();
    if (!sql) {
      setOutput("sqlOutput", "");
      return;
    }

    const minified = sql.replace(/\s+/g, " ").trim();
    setOutput("sqlOutput", minified);
    showNotification("✓ SQL minified", "success");
  } catch (e) {
    setOutput("sqlOutput", "❌ Error minifying: " + e.message);
    showNotification("Minify error", "error");
  }
}

function clearSqlInput() {
  document.getElementById("sqlInput").value = "";
  setOutput("sqlOutput", "");
}

// Made with Bob

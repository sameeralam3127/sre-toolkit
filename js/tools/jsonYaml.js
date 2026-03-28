function toYaml() {
  try {
    const input = document.getElementById("jsonInput").value.trim();
    if (!input) {
      setOutput("jsonOutput", "");
      return;
    }
    const parsed = JSON.parse(input);
    const yaml = jsyaml.dump(parsed);
    setOutput("jsonOutput", yaml);
    showNotification("✓ Converted to YAML", "success");
  } catch (e) {
    setOutput("jsonOutput", "❌ Invalid JSON: " + e.message);
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
  }
}

// Clear JSON/YAML input
function clearJsonInput() {
  document.getElementById("jsonInput").value = "";
  setOutput("jsonOutput", "");
}

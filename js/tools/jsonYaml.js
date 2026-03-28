function toYaml() {
  try {
    const input = document.getElementById("jsonInput").value.trim();
    if (!input) {
      setOutput("jsonOutput", "");
      return;
    }
    const parsed = JSON.parse(input);
    setOutput("jsonOutput", jsyaml.dump(parsed));
  } catch (e) {
    setOutput("jsonOutput", "Invalid JSON: " + e.message);
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
    setOutput("jsonOutput", JSON.stringify(parsed, null, 2));
  } catch (e) {
    setOutput("jsonOutput", "Invalid YAML: " + e.message);
  }
}

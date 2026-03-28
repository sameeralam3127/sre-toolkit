function toYaml() {
  try {
    const input = JSON.parse(document.getElementById("jsonInput").value);
    setOutput("jsonOutput", jsyaml.dump(input));
  } catch (e) {
    setOutput("jsonOutput", "Invalid JSON");
  }
}

function toJson() {
  try {
    const input = jsyaml.load(document.getElementById("jsonInput").value);
    setOutput("jsonOutput", JSON.stringify(input, null, 2));
  } catch (e) {
    setOutput("jsonOutput", "Invalid YAML");
  }
}

function encodeBase64() {
  try {
    const val = document.getElementById("base64Input").value;
    if (!val.trim()) {
      setOutput("base64Output", "");
      return;
    }
    setOutput("base64Output", btoa(val));
  } catch (e) {
    setOutput("base64Output", "Error encoding: " + e.message);
  }
}

function decodeBase64() {
  try {
    const val = document.getElementById("base64Input").value;
    if (!val.trim()) {
      setOutput("base64Output", "");
      return;
    }
    setOutput("base64Output", atob(val));
  } catch (e) {
    setOutput("base64Output", "Invalid Base64");
  }
}

// Encode to Base64
function encodeBase64() {
  try {
    const val = document.getElementById("base64Input").value;
    if (!val.trim()) {
      setOutput("base64Output", "");
      return;
    }
    const encoded = btoa(unescape(encodeURIComponent(val)));
    setOutput("base64Output", encoded);
    showNotification("✓ Encoded to Base64", "success");
  } catch (e) {
    setOutput("base64Output", "❌ Error encoding: " + e.message);
  }
}

// Decode from Base64
function decodeBase64() {
  try {
    const val = document.getElementById("base64Input").value.trim();
    if (!val) {
      setOutput("base64Output", "");
      return;
    }
    const decoded = decodeURIComponent(escape(atob(val)));
    setOutput("base64Output", decoded);
    showNotification("✓ Decoded from Base64", "success");
  } catch (e) {
    setOutput("base64Output", "❌ Invalid Base64: " + e.message);
  }
}

// Clear Base64 input
function clearBase64Input() {
  document.getElementById("base64Input").value = "";
  setOutput("base64Output", "");
}

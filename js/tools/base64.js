function encodeBase64() {
  const val = document.getElementById("base64Input").value;
  setOutput("base64Output", btoa(val));
}

function decodeBase64() {
  const val = document.getElementById("base64Input").value;
  setOutput("base64Output", atob(val));
}

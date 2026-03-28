// Calculate CIDR
function calcCIDR() {
  try {
    const input = document.getElementById("cidrInput").value.trim();
    if (!input) {
      setOutput("cidrOutput", "");
      return;
    }
    const cidr = new IpCidr(input);
    let output = "🌐 CIDR Calculation\n";
    output += "================================\n\n";
    output += `Network: ${cidr.toString()}\n`;
    output += `Range: ${cidr.start()} - ${cidr.end()}\n`;
    output += `Broadcast: ${cidr.broadcast()}\n`;
    output += `Usable IPs: ${cidr.size() - 2}\n`;
    output += `Total Addresses: ${cidr.size()}`;
    setOutput("cidrOutput", output);
    showNotification("✓ CIDR calculated", "success");
  } catch (e) {
    setOutput("cidrOutput", "❌ Invalid CIDR notation");
  }
}

// Clear CIDR input
function clearCidrInput() {
  document.getElementById("cidrInput").value = "";
  setOutput("cidrOutput", "");
}

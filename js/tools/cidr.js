function calcCIDR() {
  try {
    const input = document.getElementById("cidrInput").value.trim();
    if (!input) {
      setOutput("cidrOutput", "");
      return;
    }
    const cidr = new IpCidr(input);
    let output = `Start: ${cidr.start()}\n`;
    output += `End: ${cidr.end()}\n`;
    output += `Network: ${cidr.toString()}\n`;
    output += `Broadcast: ${cidr.broadcast()}\n`;
    output += `Total Addresses: ${cidr.size()}`;
    setOutput("cidrOutput", output);
  } catch {
    setOutput("cidrOutput", "Invalid CIDR notation");
  }
}

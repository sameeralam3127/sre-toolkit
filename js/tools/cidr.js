function calcCIDR() {
  try {
    const cidr = new IpCidr(document.getElementById("cidrInput").value);
    setOutput("cidrOutput", "Range: " + cidr.start() + " - " + cidr.end());
  } catch {
    setOutput("cidrOutput", "Invalid CIDR");
  }
}

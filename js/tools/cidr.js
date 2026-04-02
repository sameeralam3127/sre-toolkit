// CIDR Calculator
function renderCidrTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="map-pin" class="text-blue-400"></i>
        CIDR Calculator
      </h2>
      <p class="text-sm opacity-75 mb-4">Calculate IP ranges and subnet information</p>
      
      <div class="flex gap-3 mb-4">
        <input
          id="cidrInput"
          class="flex-1 p-3 rounded-lg font-mono"
          placeholder="192.168.1.0/24"
        />
        <button
          onclick="calcCIDR()"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="activity" style="width: 16px; height: 16px;"></i>
          Calculate
        </button>
      </div>
      
      <div class="mb-4">
        <label class="block text-sm mb-2">Check if IP is in range:</label>
        <div class="flex gap-2">
          <input
            id="cidrCheckIp"
            class="flex-1 p-2 rounded-lg font-mono text-sm"
            placeholder="192.168.1.100"
          />
          <button
            onclick="checkIpInRange()"
            class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
          >
            Check
          </button>
        </div>
      </div>
      
      <pre id="cidrOutput" class="p-3 rounded-lg overflow-auto max-h-60 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('cidrOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearCidrInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

// Helper functions for CIDR calculations
function ipToLong(ip) {
  const parts = ip.split(".");
  return (
    (parseInt(parts[0]) << 24) +
    (parseInt(parts[1]) << 16) +
    (parseInt(parts[2]) << 8) +
    parseInt(parts[3])
  );
}

function longToIp(long) {
  return [
    (long >>> 24) & 0xff,
    (long >>> 16) & 0xff,
    (long >>> 8) & 0xff,
    long & 0xff,
  ].join(".");
}

function calcCIDR() {
  try {
    const input = document.getElementById("cidrInput").value.trim();
    if (!input) {
      setOutput("cidrOutput", "");
      return;
    }

    const [ip, prefixStr] = input.split("/");
    const prefix = parseInt(prefixStr);

    if (!ip || isNaN(prefix) || prefix < 0 || prefix > 32) {
      setOutput(
        "cidrOutput",
        "❌ Invalid CIDR notation\n\nExample: 192.168.1.0/24",
      );
      showNotification("Invalid CIDR", "error");
      return;
    }

    const ipParts = ip.split(".");
    if (
      ipParts.length !== 4 ||
      ipParts.some((p) => isNaN(p) || p < 0 || p > 255)
    ) {
      setOutput("cidrOutput", "❌ Invalid IP address");
      showNotification("Invalid IP", "error");
      return;
    }

    const ipLong = ipToLong(ip);
    const mask = (0xffffffff << (32 - prefix)) >>> 0;
    const networkLong = (ipLong & mask) >>> 0;
    const broadcastLong = (networkLong | ~mask) >>> 0;
    const firstUsable = networkLong + 1;
    const lastUsable = broadcastLong - 1;
    const totalHosts = Math.pow(2, 32 - prefix);

    const netmask = longToIp(mask);
    const wildcard = longToIp(~mask >>> 0);

    let output = "🌐 CIDR Calculation\n";
    output += "================================\n\n";
    output += `Network: ${input}\n`;
    output += `Network Address: ${longToIp(networkLong)}\n`;
    output += `First Usable IP: ${longToIp(firstUsable)}\n`;
    output += `Last Usable IP: ${longToIp(lastUsable)}\n`;
    output += `Broadcast: ${longToIp(broadcastLong)}\n`;
    output += `Netmask: ${netmask}\n`;
    output += `Wildcard Mask: ${wildcard}\n`;
    output += `Total Addresses: ${totalHosts.toLocaleString()}\n`;
    output += `Usable IPs: ${(totalHosts - 2).toLocaleString()}\n`;
    output += `CIDR Notation: /${prefix}`;

    setOutput("cidrOutput", output);

    // Store for IP checking
    window.currentCidr = { networkLong, broadcastLong };

    showNotification("✓ CIDR calculated", "success");
  } catch (e) {
    setOutput("cidrOutput", "❌ Error calculating CIDR\n\n" + e.message);
    showNotification("Calculation error", "error");
  }
}

function checkIpInRange() {
  try {
    const ipToCheck = document.getElementById("cidrCheckIp").value.trim();

    if (!ipToCheck) {
      showNotification("Enter an IP address", "warning");
      return;
    }

    if (!window.currentCidr) {
      showNotification("Calculate CIDR first", "warning");
      return;
    }

    const ipParts = ipToCheck.split(".");
    if (
      ipParts.length !== 4 ||
      ipParts.some((p) => isNaN(p) || p < 0 || p > 255)
    ) {
      showNotification("Invalid IP address", "error");
      return;
    }

    const ipLong = ipToLong(ipToCheck);
    const { networkLong, broadcastLong } = window.currentCidr;
    const isInRange = ipLong >= networkLong && ipLong <= broadcastLong;

    let output = document.getElementById("cidrOutput").textContent;
    output += `\n\n🔍 IP Check\n`;
    output += `================================\n`;
    output += `IP Address: ${ipToCheck}\n`;
    output += `In Range: ${isInRange ? "✓ YES" : "✗ NO"}`;

    setOutput("cidrOutput", output);
    showNotification(
      isInRange ? "✓ IP is in range" : "✗ IP not in range",
      isInRange ? "success" : "warning",
    );
  } catch (e) {
    showNotification("Error checking IP", "error");
  }
}

function clearCidrInput() {
  document.getElementById("cidrInput").value = "";
  document.getElementById("cidrCheckIp").value = "";
  setOutput("cidrOutput", "");
  window.currentCidr = null;
}

// Made with Bob

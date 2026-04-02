// Color Converter
function renderColorConverterTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="droplet" class="text-blue-400"></i>
        Color Converter
      </h2>
      <p class="text-sm opacity-75 mb-4">Convert between HEX, RGB, and HSL color formats</p>
      
      <div class="mb-4">
        <label class="block text-sm mb-2">Enter Color:</label>
        <input
          id="colorInput"
          type="text"
          class="w-full p-3 rounded-lg font-mono"
          placeholder="#FF5733 or rgb(255, 87, 51) or hsl(9, 100%, 60%)"
        />
      </div>
      
      <button
        onclick="convertColor()"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors mb-4 flex items-center justify-center gap-2"
      >
        <i data-feather="refresh-cw" style="width: 16px; height: 16px;"></i>
        Convert
      </button>
      
      <div id="colorPreview" class="w-full h-20 rounded-lg mb-4 border-2" style="border-color: var(--border);"></div>
      
      <pre id="colorOutput" class="p-3 rounded-lg overflow-auto max-h-60 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('colorOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearColorInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function convertColor() {
  try {
    const input = document.getElementById("colorInput").value.trim();
    if (!input) {
      setOutput("colorOutput", "");
      return;
    }

    let r, g, b;

    // Parse HEX
    if (input.startsWith("#")) {
      const hex = input.slice(1);
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
      } else {
        throw new Error("Invalid HEX format");
      }
    }
    // Parse RGB
    else if (input.startsWith("rgb")) {
      const match = input.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (!match) throw new Error("Invalid RGB format");
      r = parseInt(match[1]);
      g = parseInt(match[2]);
      b = parseInt(match[3]);
    }
    // Parse HSL
    else if (input.startsWith("hsl")) {
      const match = input.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
      if (!match) throw new Error("Invalid HSL format");
      const h = parseInt(match[1]);
      const s = parseInt(match[2]) / 100;
      const l = parseInt(match[3]) / 100;
      [r, g, b] = hslToRgb(h, s, l);
    } else {
      throw new Error("Unsupported format. Use HEX, RGB, or HSL");
    }

    // Convert to all formats
    const hex = rgbToHex(r, g, b);
    const [h, s, l] = rgbToHsl(r, g, b);

    let output = "🎨 Color Conversion\n";
    output += "================================\n\n";
    output += `HEX: ${hex}\n`;
    output += `RGB: rgb(${r}, ${g}, ${b})\n`;
    output += `HSL: hsl(${h}, ${s}%, ${l}%)\n\n`;
    output += `Red: ${r}\n`;
    output += `Green: ${g}\n`;
    output += `Blue: ${b}`;

    setOutput("colorOutput", output);
    document.getElementById("colorPreview").style.backgroundColor = hex;
    showNotification("✓ Color converted", "success");
  } catch (e) {
    setOutput("colorOutput", "❌ " + e.message);
    document.getElementById("colorPreview").style.backgroundColor =
      "transparent";
    showNotification("Conversion error", "error");
  }
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
      .toUpperCase()
  );
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h, s, l) {
  h /= 360;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function clearColorInput() {
  document.getElementById("colorInput").value = "";
  setOutput("colorOutput", "");
  document.getElementById("colorPreview").style.backgroundColor = "transparent";
}

// Made with Bob

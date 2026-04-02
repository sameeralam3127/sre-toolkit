// XML Formatter
function renderXmlFormatterTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="file-text" class="text-blue-400"></i>
        XML Formatter
      </h2>
      <p class="text-sm opacity-75 mb-4">Format and validate XML documents</p>
      
      <textarea
        id="xmlInput"
        class="w-full p-3 rounded-lg mb-4 min-h-[150px] font-mono text-sm"
        placeholder="<root><item>value</item></root>"
      ></textarea>
      
      <div class="flex gap-3 mb-4">
        <button
          onclick="formatXml()"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="align-left" style="width: 16px; height: 16px;"></i>
          Format
        </button>
        <button
          onclick="minifyXml()"
          class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <i data-feather="minimize-2" style="width: 16px; height: 16px;"></i>
          Minify
        </button>
      </div>
      
      <pre id="xmlOutput" class="p-3 rounded-lg overflow-auto max-h-96 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('xmlOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearXmlInput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function formatXml() {
  try {
    const xml = document.getElementById("xmlInput").value.trim();
    if (!xml) {
      setOutput("xmlOutput", "");
      return;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");

    const errorNode = xmlDoc.querySelector("parsererror");
    if (errorNode) {
      setOutput("xmlOutput", "❌ Invalid XML\n\n" + errorNode.textContent);
      showNotification("Invalid XML", "error");
      return;
    }

    const formatted = formatXmlNode(xmlDoc.documentElement, 0);
    setOutput("xmlOutput", formatted);
    showNotification("✓ XML formatted", "success");
  } catch (e) {
    setOutput("xmlOutput", "❌ Error formatting: " + e.message);
    showNotification("Formatting error", "error");
  }
}

function formatXmlNode(node, level) {
  const indent = "  ".repeat(level);
  let result = "";

  if (node.nodeType === 1) {
    // Element node
    result += indent + "<" + node.nodeName;

    // Add attributes
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      result += " " + attr.name + '="' + attr.value + '"';
    }

    if (node.childNodes.length === 0) {
      result += " />\n";
    } else if (
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType === 3
    ) {
      // Single text node
      result +=
        ">" +
        node.childNodes[0].nodeValue.trim() +
        "</" +
        node.nodeName +
        ">\n";
    } else {
      result += ">\n";
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        if (child.nodeType === 1) {
          result += formatXmlNode(child, level + 1);
        } else if (child.nodeType === 3 && child.nodeValue.trim()) {
          result += indent + "  " + child.nodeValue.trim() + "\n";
        }
      }
      result += indent + "</" + node.nodeName + ">\n";
    }
  }

  return result;
}

function minifyXml() {
  try {
    const xml = document.getElementById("xmlInput").value.trim();
    if (!xml) {
      setOutput("xmlOutput", "");
      return;
    }

    const minified = xml.replace(/>\s+</g, "><").trim();
    setOutput("xmlOutput", minified);
    showNotification("✓ XML minified", "success");
  } catch (e) {
    setOutput("xmlOutput", "❌ Error minifying: " + e.message);
    showNotification("Minify error", "error");
  }
}

function clearXmlInput() {
  document.getElementById("xmlInput").value = "";
  setOutput("xmlOutput", "");
}

// Made with Bob

// HTTP Status Codes Reference
function renderHttpStatusTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="info" class="text-blue-400"></i>
        HTTP Status Codes
      </h2>
      <p class="text-sm opacity-75 mb-4">Searchable HTTP status code reference</p>
      
      <input
        id="httpStatusSearch"
        type="text"
        class="w-full p-3 rounded-lg mb-4 font-mono"
        placeholder="Search by code or description (e.g., 404 or 'not found')"
        oninput="searchHttpStatus()"
      />
      
      <pre id="httpStatusOutput" class="p-3 rounded-lg overflow-auto max-h-96 font-mono text-sm"></pre>
    </div>
  `;
}

const httpStatusCodes = {
  // 1xx Informational
  100: { name: "Continue", desc: "Client should continue with request" },
  101: { name: "Switching Protocols", desc: "Server is switching protocols" },
  102: {
    name: "Processing",
    desc: "Server has received and is processing the request",
  },

  // 2xx Success
  200: { name: "OK", desc: "Standard response for successful HTTP requests" },
  201: {
    name: "Created",
    desc: "Request has been fulfilled, new resource created",
  },
  202: {
    name: "Accepted",
    desc: "Request accepted for processing, but not completed",
  },
  204: {
    name: "No Content",
    desc: "Server successfully processed request, no content returned",
  },
  206: {
    name: "Partial Content",
    desc: "Server is delivering only part of the resource",
  },

  // 3xx Redirection
  301: {
    name: "Moved Permanently",
    desc: "Resource has been moved permanently",
  },
  302: { name: "Found", desc: "Resource temporarily moved" },
  304: {
    name: "Not Modified",
    desc: "Resource has not been modified since last request",
  },
  307: {
    name: "Temporary Redirect",
    desc: "Request should be repeated with another URI",
  },
  308: {
    name: "Permanent Redirect",
    desc: "Request and all future requests should use another URI",
  },

  // 4xx Client Errors
  400: {
    name: "Bad Request",
    desc: "Server cannot process request due to client error",
  },
  401: {
    name: "Unauthorized",
    desc: "Authentication is required and has failed",
  },
  403: { name: "Forbidden", desc: "Server refuses to authorize the request" },
  404: { name: "Not Found", desc: "Requested resource could not be found" },
  405: {
    name: "Method Not Allowed",
    desc: "Request method not supported for resource",
  },
  408: {
    name: "Request Timeout",
    desc: "Server timed out waiting for the request",
  },
  409: {
    name: "Conflict",
    desc: "Request conflicts with current state of server",
  },
  410: { name: "Gone", desc: "Resource is no longer available" },
  413: {
    name: "Payload Too Large",
    desc: "Request entity is larger than server limits",
  },
  415: {
    name: "Unsupported Media Type",
    desc: "Media format of request not supported",
  },
  429: { name: "Too Many Requests", desc: "User has sent too many requests" },

  // 5xx Server Errors
  500: {
    name: "Internal Server Error",
    desc: "Generic error message for server failure",
  },
  501: {
    name: "Not Implemented",
    desc: "Server does not support the functionality",
  },
  502: {
    name: "Bad Gateway",
    desc: "Server received invalid response from upstream",
  },
  503: {
    name: "Service Unavailable",
    desc: "Server is temporarily unavailable",
  },
  504: {
    name: "Gateway Timeout",
    desc: "Server did not receive timely response from upstream",
  },
  505: {
    name: "HTTP Version Not Supported",
    desc: "Server does not support HTTP protocol version",
  },
};

function searchHttpStatus() {
  const query = document
    .getElementById("httpStatusSearch")
    .value.toLowerCase()
    .trim();

  let output = "🌐 HTTP Status Codes\n";
  output += "================================\n\n";

  if (!query) {
    // Show all codes grouped by category
    output += "1xx - Informational\n";
    output += "2xx - Success\n";
    output += "3xx - Redirection\n";
    output += "4xx - Client Errors\n";
    output += "5xx - Server Errors\n\n";
    output += "💡 Type a code or keyword to search\n\n";
    output += "Common codes:\n";
    output += "200 OK\n404 Not Found\n500 Internal Server Error";
  } else {
    const results = [];

    for (const [code, info] of Object.entries(httpStatusCodes)) {
      if (
        code.includes(query) ||
        info.name.toLowerCase().includes(query) ||
        info.desc.toLowerCase().includes(query)
      ) {
        results.push({ code, ...info });
      }
    }

    if (results.length === 0) {
      output += "❌ No matching status codes found\n\n";
      output += "Try searching for:\n";
      output += "- Status code (e.g., 404)\n";
      output += "- Status name (e.g., 'not found')\n";
      output += "- Description keyword (e.g., 'error')";
    } else {
      output += `Found ${results.length} result${results.length > 1 ? "s" : ""}:\n\n`;
      results.forEach(({ code, name, desc }) => {
        output += `${code} - ${name}\n`;
        output += `   ${desc}\n\n`;
      });
    }
  }

  setOutput("httpStatusOutput", output);
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("httpStatusSearch")) {
    searchHttpStatus();
  }
});

// Made with Bob

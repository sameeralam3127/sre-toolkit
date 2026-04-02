// Tool Registry - Central management for all tools
const toolRegistry = {
  tools: [],

  register(tool) {
    this.tools.push(tool);
  },

  getAll() {
    return this.tools;
  },

  getByCategory(category) {
    if (category === "all") return this.tools;
    return this.tools.filter((tool) => tool.category === category);
  },

  search(query) {
    const lowerQuery = query.toLowerCase();
    return this.tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.description.toLowerCase().includes(lowerQuery) ||
        tool.keywords.some((k) => k.toLowerCase().includes(lowerQuery)),
    );
  },
};

// Register all tools
function registerAllTools() {
  // Encoders & Decoders
  toolRegistry.register({
    id: "json-yaml",
    name: "JSON ⇄ YAML",
    description: "Convert between JSON and YAML formats",
    category: "encoders",
    icon: "code",
    keywords: ["json", "yaml", "convert", "format"],
    render: renderJsonYamlTool,
  });

  toolRegistry.register({
    id: "base64",
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings",
    category: "encoders",
    icon: "hash",
    keywords: ["base64", "encode", "decode"],
    render: renderBase64Tool,
  });

  toolRegistry.register({
    id: "jwt",
    name: "JWT Decoder",
    description: "Decode and inspect JWT tokens",
    category: "encoders",
    icon: "key",
    keywords: ["jwt", "token", "decode", "json web token"],
    render: renderJwtTool,
  });

  toolRegistry.register({
    id: "url",
    name: "URL Encoder/Decoder",
    description: "Encode and decode URL components",
    category: "encoders",
    icon: "link",
    keywords: ["url", "encode", "decode", "uri"],
    render: renderUrlTool,
  });

  toolRegistry.register({
    id: "html-entity",
    name: "HTML Entity Encoder",
    description: "Convert special characters to HTML entities",
    category: "encoders",
    icon: "code",
    keywords: ["html", "entity", "escape", "encode"],
    render: renderHtmlEntityTool,
  });

  // Network Tools
  toolRegistry.register({
    id: "cidr",
    name: "CIDR Calculator",
    description: "Calculate IP ranges and subnet information",
    category: "network",
    icon: "map-pin",
    keywords: ["cidr", "ip", "subnet", "network", "calculator"],
    render: renderCidrTool,
  });

  // DevOps Utilities
  toolRegistry.register({
    id: "cron",
    name: "Cron Expression Helper",
    description: "Parse and explain cron expressions",
    category: "devops",
    icon: "clock",
    keywords: ["cron", "schedule", "time", "expression"],
    render: renderCronTool,
  });

  toolRegistry.register({
    id: "timestamp",
    name: "Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates",
    category: "devops",
    icon: "calendar",
    keywords: ["timestamp", "unix", "date", "time", "convert"],
    render: renderTimestampTool,
  });

  toolRegistry.register({
    id: "password",
    name: "Password Generator",
    description: "Generate secure random passwords",
    category: "devops",
    icon: "lock",
    keywords: ["password", "generate", "random", "secure"],
    render: renderPasswordTool,
  });

  toolRegistry.register({
    id: "uuid",
    name: "UUID Generator",
    description: "Generate UUIDs (v4) with bulk option",
    category: "devops",
    icon: "hash",
    keywords: ["uuid", "guid", "generate", "unique"],
    render: renderUuidTool,
  });

  toolRegistry.register({
    id: "http-status",
    name: "HTTP Status Codes",
    description: "Searchable HTTP status code reference",
    category: "devops",
    icon: "info",
    keywords: ["http", "status", "code", "reference"],
    render: renderHttpStatusTool,
  });

  toolRegistry.register({
    id: "color-converter",
    name: "Color Converter",
    description: "Convert between HEX, RGB, and HSL color formats",
    category: "devops",
    icon: "droplet",
    keywords: ["color", "hex", "rgb", "hsl", "convert"],
    render: renderColorConverterTool,
  });

  // Text Tools
  toolRegistry.register({
    id: "text-case",
    name: "Text Case Converter",
    description: "Convert text between different cases",
    category: "text",
    icon: "type",
    keywords: ["text", "case", "upper", "lower", "camel", "snake", "kebab"],
    render: renderTextCaseTool,
  });

  toolRegistry.register({
    id: "regex",
    name: "Regex Tester",
    description: "Test regular expressions with live matching",
    category: "text",
    icon: "search",
    keywords: ["regex", "regular expression", "pattern", "match"],
    render: renderRegexTool,
  });

  toolRegistry.register({
    id: "diff",
    name: "Text Diff Checker",
    description: "Compare two text blocks and highlight differences",
    category: "text",
    icon: "git-branch",
    keywords: ["diff", "compare", "difference", "text"],
    render: renderDiffTool,
  });

  toolRegistry.register({
    id: "text-stats",
    name: "Text Statistics",
    description: "Count words, characters, lines, and more",
    category: "text",
    icon: "bar-chart-2",
    keywords: ["text", "statistics", "count", "words", "characters"],
    render: renderTextStatsTool,
  });

  toolRegistry.register({
    id: "line-sorter",
    name: "Line Sorter",
    description: "Sort lines alphabetically or numerically",
    category: "text",
    icon: "list",
    keywords: ["sort", "lines", "alphabetical", "numerical"],
    render: renderLineSorterTool,
  });

  toolRegistry.register({
    id: "csv-json",
    name: "CSV to JSON",
    description: "Convert CSV data to JSON format",
    category: "text",
    icon: "file-text",
    keywords: ["csv", "json", "convert", "data"],
    render: renderCsvJsonTool,
  });

  toolRegistry.register({
    id: "sql-formatter",
    name: "SQL Formatter",
    description: "Format and beautify SQL queries",
    category: "text",
    icon: "database",
    keywords: ["sql", "format", "beautify", "query"],
    render: renderSqlFormatterTool,
  });

  toolRegistry.register({
    id: "xml-formatter",
    name: "XML Formatter",
    description: "Format and validate XML documents",
    category: "text",
    icon: "file-text",
    keywords: ["xml", "format", "validate"],
    render: renderXmlFormatterTool,
  });

  toolRegistry.register({
    id: "markdown",
    name: "Markdown Preview",
    description: "Live markdown rendering and preview",
    category: "text",
    icon: "file",
    keywords: ["markdown", "preview", "render", "md"],
    render: renderMarkdownTool,
  });

  // Security Tools
  toolRegistry.register({
    id: "hash",
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes",
    category: "security",
    icon: "shield",
    keywords: ["hash", "md5", "sha", "checksum", "digest"],
    render: renderHashTool,
  });
}

// Render tools to the page
function renderTools(tools = null) {
  const grid = document.getElementById("toolsGrid");
  const noResults = document.getElementById("noResults");
  const toolsToRender = tools || toolRegistry.getAll();

  grid.innerHTML = "";

  if (toolsToRender.length === 0) {
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");

  toolsToRender.forEach((tool, index) => {
    const content = tool.render();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const toolElement = tempDiv.firstElementChild;

    toolElement.setAttribute("data-category", tool.category);
    toolElement.setAttribute("data-aos", "fade-up");
    toolElement.setAttribute("data-aos-delay", (index % 4) * 50);

    grid.appendChild(toolElement);
  });

  // Re-initialize feather icons and update theme icon
  if (typeof feather !== "undefined") {
    feather.replace();
  }

  // Update theme toggle icon
  if (typeof updateThemeIcon === "function") {
    updateThemeIcon();
  }
}

// Filter tools by category
function filterTools(category) {
  // Update active tab
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`[data-category="${category}"]`)
    .classList.add("active");

  // Filter and render
  const tools = toolRegistry.getByCategory(category);
  renderTools(tools);
}

// Search tools
function searchTools(query) {
  if (!query.trim()) {
    renderTools();
    return;
  }

  const results = toolRegistry.search(query);
  renderTools(results);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  registerAllTools();
  renderTools();

  // Setup search
  const searchInput = document.getElementById("searchInput");
  const searchInputMobile = document.getElementById("searchInputMobile");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchTools(e.target.value);
      if (searchInputMobile) searchInputMobile.value = e.target.value;
    });
  }

  if (searchInputMobile) {
    searchInputMobile.addEventListener("input", (e) => {
      searchTools(e.target.value);
      if (searchInput) searchInput.value = e.target.value;
    });
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      if (searchInput) searchInput.focus();
      else if (searchInputMobile) searchInputMobile.focus();
    }

    // Escape to clear search
    if (e.key === "Escape") {
      if (searchInput) {
        searchInput.value = "";
        searchInput.blur();
      }
      if (searchInputMobile) {
        searchInputMobile.value = "";
        searchInputMobile.blur();
      }
      renderTools();
    }
  });
});

// Made with Bob

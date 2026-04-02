# SRE Toolkit

A comprehensive, browser-based toolkit for Site Reliability Engineers and DevOps professionals. All tools run entirely client-side with no backend dependencies, perfect for GitHub Pages hosting.

🔗 **[Live Demo](https://sameeralam3127.github.io/sre-toolkit/)**

## ✨ Features

- 🎨 **Modern UI** - Clean, responsive design with dark/light theme support
- 🔍 **Smart Search** - Quickly find tools with real-time search
- 📱 **Mobile Friendly** - Works seamlessly on all devices
- ⚡ **Fast & Lightweight** - No backend, runs entirely in your browser
- 🔐 **Privacy First** - All processing happens locally, no data sent to servers
- ⌨️ **Keyboard Shortcuts** - Efficient navigation with keyboard support

## 🛠️ Tools

### 🔐 Encoders & Decoders (5 tools)

- **JSON ⇄ YAML** - Convert between JSON and YAML with validation and minification
- **Base64 Encoder/Decoder** - Standard and URL-safe Base64 encoding
- **JWT Decoder** - Decode and inspect JWT tokens with expiration checking
- **URL Encoder/Decoder** - Encode/decode URLs and URL components
- **HTML Entity Encoder** - Convert special characters to HTML entities

### 🌐 Network Tools (1 tool)

- **CIDR Calculator** - Calculate IP ranges, subnet masks, and check if IPs are in range

### ⚙️ DevOps Utilities (6 tools)

- **Cron Expression Helper** - Parse and explain cron expressions with examples
- **Timestamp Converter** - Convert between Unix timestamps and human-readable dates
- **Password Generator** - Generate secure random passwords with customizable options
- **UUID Generator** - Generate UUIDs (v4) with bulk generation support
- **HTTP Status Codes** - Searchable reference for HTTP status codes
- **Color Converter** - Convert between HEX, RGB, and HSL color formats

### 📝 Text Tools (9 tools)

- **Text Case Converter** - Convert between uppercase, lowercase, camelCase, snake_case, kebab-case, etc.
- **Regex Tester** - Test regular expressions with live matching and highlighting
- **Text Diff Checker** - Compare two text blocks with similarity analysis
- **Text Statistics** - Count words, characters, lines, reading time, and more
- **Line Sorter** - Sort lines alphabetically, numerically, by length, or shuffle
- **CSV to JSON** - Convert CSV data to JSON format
- **SQL Formatter** - Format and beautify SQL queries
- **XML Formatter** - Format and validate XML documents
- **Markdown Preview** - Live markdown rendering with HTML export

### 🔒 Security Tools (1 tool)

- **Hash Generator** - Generate MD5, SHA-1, SHA-256, SHA-512 hashes

## 🚀 Getting Started

### Option 1: Use Online

Simply visit the [live demo](https://yourusername.github.io/sre-toolkit) and start using the tools immediately.

### Option 2: Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/sre-toolkit.git
   cd sre-toolkit
   ```

2. Open `index.html` in your browser:

   ```bash
   # On macOS
   open index.html

   # On Linux
   xdg-open index.html

   # On Windows
   start index.html
   ```

### Option 3: Deploy to GitHub Pages

1. Fork this repository
2. Go to Settings → Pages
3. Select "main" branch as source
4. Your toolkit will be available at `https://yourusername.github.io/sre-toolkit`

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + Enter` - Execute current tool
- `Ctrl/Cmd + K` - Focus search bar
- `Esc` - Clear search

## 🎨 Themes

Toggle between dark and light themes using the theme button in the header. Your preference is saved locally.

## 🏗️ Architecture

```
sre-toolkit/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Custom styles
├── js/
│   ├── app.js          # Main application logic
│   ├── utils.js        # Utility functions
│   ├── toolRegistry.js # Tool management system
│   └── tools/          # Individual tool implementations
│       ├── base64.js
│       ├── cidr.js
│       ├── colorConverter.js
│       ├── cron.js
│       ├── csvJson.js
│       ├── diff.js
│       ├── hash.js
│       ├── htmlEntity.js
│       ├── httpStatus.js
│       ├── jsonYaml.js
│       ├── jwt.js
│       ├── lineSorter.js
│       ├── markdown.js
│       ├── password.js
│       ├── regex.js
│       ├── sqlFormatter.js
│       ├── textCase.js
│       ├── textStats.js
│       ├── timestamp.js
│       ├── url.js
│       ├── uuid.js
│       └── xmlFormatter.js
└── README.md
```

## 🔧 Tech Stack

- **Vanilla JavaScript** - No frameworks, pure JS
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Feather Icons** - Beautiful open-source icons
- **AOS** - Animate on scroll library
- **js-yaml** - YAML parser
- **ip-cidr** - CIDR calculations

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

### Adding a New Tool

1. Create a new file in `js/tools/` (e.g., `myTool.js`)
2. Implement the `renderMyToolTool()` function that returns HTML
3. Implement the tool's functionality
4. Register the tool in `js/toolRegistry.js`
5. Add the script tag in `index.html`

Example:

```javascript
// js/tools/myTool.js
function renderMyToolTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2">My Tool</h2>
      <!-- Tool UI here -->
    </div>
  `;
}

function myToolFunction() {
  // Tool logic here
}
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Feather Icons](https://feathericons.com/)
- Animations by [AOS](https://michalsnik.github.io/aos/)
- YAML parsing by [js-yaml](https://github.com/nodeca/js-yaml)
- CIDR calculations by [ip-cidr](https://www.npmjs.com/package/ip-cidr)

## 📧 Contact

Have questions or suggestions? Open an issue or reach out!

---

Made with ❤️ for SREs and DevOps Engineers

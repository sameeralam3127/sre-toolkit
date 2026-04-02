// Password Generator
function renderPasswordTool() {
  return `
    <div class="card rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
        <i data-feather="lock" class="text-blue-400"></i>
        Password Generator
      </h2>
      <p class="text-sm opacity-75 mb-4">Generate secure random passwords</p>
      
      <div class="space-y-4 mb-4">
        <div>
          <label class="block text-sm mb-2">Length: <span id="pwdLengthValue">16</span></label>
          <input
            id="pwdLength"
            type="range"
            min="8"
            max="64"
            value="16"
            class="w-full"
            oninput="document.getElementById('pwdLengthValue').textContent = this.value"
          />
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" id="pwdUppercase" checked class="rounded" />
            Uppercase (A-Z)
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" id="pwdLowercase" checked class="rounded" />
            Lowercase (a-z)
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" id="pwdNumbers" checked class="rounded" />
            Numbers (0-9)
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" id="pwdSymbols" checked class="rounded" />
            Symbols (!@#$...)
          </label>
        </div>
        
        <div>
          <label class="block text-sm mb-2">Number of passwords:</label>
          <input
            id="pwdCount"
            type="number"
            min="1"
            max="20"
            value="1"
            class="w-full p-2 rounded-lg font-mono"
          />
        </div>
      </div>
      
      <button
        onclick="generatePasswords()"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors mb-4 flex items-center justify-center gap-2"
      >
        <i data-feather="zap" style="width: 16px; height: 16px;"></i>
        Generate Passwords
      </button>
      
      <pre id="passwordOutput" class="p-3 rounded-lg overflow-auto max-h-96 mb-3 font-mono text-sm"></pre>
      
      <div class="flex gap-2">
        <button
          onclick="copyToClipboard('passwordOutput')"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="copy" style="width: 16px; height: 16px;"></i>
          Copy
        </button>
        <button
          onclick="clearPasswordOutput()"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          Clear
        </button>
      </div>
    </div>
  `;
}

function generatePassword(length, options) {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";
  if (options.uppercase) chars += uppercase;
  if (options.lowercase) chars += lowercase;
  if (options.numbers) chars += numbers;
  if (options.symbols) chars += symbols;

  if (chars.length === 0) {
    throw new Error("Please select at least one character type");
  }

  let password = "";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }

  return password;
}

function calculatePasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (password.length >= 16) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

  if (strength <= 2) return { level: "Weak", color: "🔴" };
  if (strength <= 4) return { level: "Medium", color: "🟡" };
  if (strength <= 6) return { level: "Strong", color: "🟢" };
  return { level: "Very Strong", color: "🟢" };
}

function generatePasswords() {
  try {
    const length = parseInt(document.getElementById("pwdLength").value);
    const count = parseInt(document.getElementById("pwdCount").value) || 1;

    const options = {
      uppercase: document.getElementById("pwdUppercase").checked,
      lowercase: document.getElementById("pwdLowercase").checked,
      numbers: document.getElementById("pwdNumbers").checked,
      symbols: document.getElementById("pwdSymbols").checked,
    };

    if (count < 1 || count > 20) {
      setOutput("passwordOutput", "❌ Please enter a count between 1 and 20");
      showNotification("Invalid count", "error");
      return;
    }

    const passwords = [];
    for (let i = 0; i < count; i++) {
      passwords.push(generatePassword(length, options));
    }

    let output = passwords.join("\n");
    output += `\n\n📊 Generated ${count} password${count > 1 ? "s" : ""}\n`;
    output += `Length: ${length} characters\n`;

    const strength = calculatePasswordStrength(passwords[0]);
    output += `Strength: ${strength.color} ${strength.level}`;

    setOutput("passwordOutput", output);
    showNotification(
      `✓ Generated ${count} password${count > 1 ? "s" : ""}`,
      "success",
    );
  } catch (e) {
    setOutput("passwordOutput", "❌ Error: " + e.message);
    showNotification(e.message, "error");
  }
}

function clearPasswordOutput() {
  setOutput("passwordOutput", "");
}

// Made with Bob

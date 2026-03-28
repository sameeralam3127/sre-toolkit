// Parse cron expression
function parseCron() {
  const val = document.getElementById("cronInput").value.trim();
  if (!val) {
    setOutput("cronOutput", "Please enter a cron expression");
    return;
  }

  try {
    const parts = val.split(/\s+/);
    if (parts.length !== 5) {
      setOutput(
        "cronOutput",
        "❌ Invalid format. Use: minute hour day month dow\n\nExample: */5 * * * * (every 5 minutes)",
      );
      return;
    }

    const [min, hour, day, month, dow] = parts;
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let explanation = "📅 Cron Expression Breakdown:\n";
    explanation += "================================\n\n";
    explanation += formatCronField("Minute", min, 0, 59);
    explanation += formatCronField("Hour", hour, 0, 23);
    explanation += formatCronField("Day of Month", day, 1, 31);
    explanation += formatCronField("Month", month, 1, 12, months);
    explanation += formatCronField("Day of Week", dow, 0, 6, days);

    setOutput("cronOutput", explanation);
    showNotification("✓ Cron parsed successfully", "success");
  } catch (e) {
    setOutput("cronOutput", "❌ Error parsing cron expression");
  }
}

// Helper to format cron field
function formatCronField(label, value, min, max, names = null) {
  let formatted = `${label}: `;

  if (value === "*") {
    formatted += "Every";
  } else if (value.includes("/")) {
    const [range, interval] = value.split("/");
    formatted += `Every ${interval}`;
  } else if (value.includes("-")) {
    formatted += `${value}`;
  } else if (names && !isNaN(value)) {
    formatted += names[parseInt(value)] || value;
  } else {
    formatted += value;
  }

  return formatted + "\n";
}

// Clear cron input
function clearCronInput() {
  document.getElementById("cronInput").value = "";
  setOutput("cronOutput", "");
}

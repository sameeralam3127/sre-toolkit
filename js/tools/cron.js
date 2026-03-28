function parseCron() {
  const val = document.getElementById("cronInput").value.trim();
  if (!val) {
    setOutput("cronOutput", "Please enter a cron expression");
    return;
  }

  try {
    const parts = val.split(/\s+/);
    if (parts.length !== 5) {
      setOutput("cronOutput", "Invalid format. Use: minute hour day month dow");
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

    let explanation = "";
    explanation += `Minute: ${min === "*" ? "Every minute" : min}\n`;
    explanation += `Hour: ${hour === "*" ? "Every hour" : hour}\n`;
    explanation += `Day: ${day === "*" ? "Every day" : day}\n`;
    explanation += `Month: ${month === "*" ? "Every month" : months[parseInt(month) - 1] || month}\n`;
    explanation += `Day of week: ${dow === "*" ? "Every day" : days[parseInt(dow)] || dow}`;

    setOutput("cronOutput", explanation);
  } catch (e) {
    setOutput("cronOutput", "Error parsing cron expression");
  }
}

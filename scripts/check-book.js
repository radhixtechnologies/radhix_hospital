const fs = require("fs");

// Check what is currently inside src/app/book/page.tsx
const content = fs.readFileSync("src/app/book/page.tsx", "utf8");

// Look at the bottom of the file
const lines = content.split("\n");
console.log("Total lines:", lines.length);
console.log("Last 20 lines:", lines.slice(-20).join("\n"));

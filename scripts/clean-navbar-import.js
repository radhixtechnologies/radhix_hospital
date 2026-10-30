const fs = require("fs");
let content = fs.readFileSync("src/components/public/Navbar.tsx", "utf8");
content = content.replace("Sparkles, \n", "");
content = content.replace("Sparkles,\n", "");
content = content.replace("Sparkles,", "");
fs.writeFileSync("src/components/public/Navbar.tsx", content, "utf8");
console.log("Cleaned import in Navbar.tsx");

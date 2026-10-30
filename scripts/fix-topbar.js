const fs = require("fs");
let content = fs.readFileSync("src/components/admin/AdminTopbar.tsx", "utf8");
content = content.replace('value="Radhix Super-Speciality (Indiranagar)"', 'value="Radhix Clinic (Faridabad)"');
fs.writeFileSync("src/components/admin/AdminTopbar.tsx", content, "utf8");
console.log("Cleaned AdminTopbar.tsx");

const fs = require("fs");

// 1. UPDATE src/components/public/Navbar.tsx
let navbarContent = fs.readFileSync("src/components/public/Navbar.tsx", "utf8");

// Remove desktop Try Demo button block
navbarContent = navbarContent.replace(
  /\s*{\/\* Try Demo Button \*\/}\s*<Link\s+href="\/admin\/login"[\s\S]*?<\/Link>/,
  ""
);

// Remove mobile Try Demo button block
navbarContent = navbarContent.replace(
  /\s*<Link\s+href="\/admin\/login"\s+onClick=\{\(\) => setMobileMenuOpen\(false\)\}[\s\S]*?<\/Link>/,
  ""
);

fs.writeFileSync("src/components/public/Navbar.tsx", navbarContent, "utf8");
console.log("Removed Try Demo Admin from src/components/public/Navbar.tsx");

// 2. UPDATE src/app/about/page.tsx
let aboutContent = fs.readFileSync("src/app/about/page.tsx", "utf8");
aboutContent = aboutContent.replace(
  'href="/admin/login" className="px-6 py-3 rounded-xl bg-white text-blue-800 font-bold text-xs shadow-lg hover:bg-blue-50 transition-all">\n              Try SaaS Demo Panel',
  'href="/contact" className="px-6 py-3 rounded-xl bg-white text-blue-800 font-bold text-xs shadow-lg hover:bg-blue-50 transition-all">\n              Contact Medical Desk'
);
fs.writeFileSync("src/app/about/page.tsx", aboutContent, "utf8");
console.log("Updated src/app/about/page.tsx");

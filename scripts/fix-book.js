const fs = require("fs");

// First re-generate clean book.js
require("./gen-book.js");

let content = fs.readFileSync("src/app/book/page.tsx", "utf8");

content = content.replace(
  "export default function BookAppointmentPage() {",
  "function BookAppointmentContent() {"
);

content += `\n
export default function BookAppointmentPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-500">Loading booking flow...</div>}>
      <BookAppointmentContent />
    </React.Suspense>
  );
}
`;

fs.writeFileSync("src/app/book/page.tsx", content, "utf8");
console.log("Fixed src/app/book/page.tsx with Suspense cleanly!");

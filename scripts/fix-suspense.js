const fs = require("fs");

// 1. FIX src/app/book/page.tsx
let bookContent = fs.readFileSync("src/app/book/page.tsx", "utf8");
// Rename export default function BookAppointmentPage() to function BookAppointmentContent()
// and export default a wrapper with Suspense
bookContent = bookContent.replace(
  'export default function BookAppointmentPage() {',
  'import { Suspense } from "react";\n\nfunction BookAppointmentContent() {'
);
bookContent += `\n\nexport default function BookAppointmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-500">Loading booking flow...</div>}>
      <BookAppointmentContent />
    </Suspense>
  );
}\n`;
fs.writeFileSync("src/app/book/page.tsx", bookContent, "utf8");

// 2. FIX src/app/doctors/page.tsx
let doctorsContent = fs.readFileSync("src/app/doctors/page.tsx", "utf8");
doctorsContent = doctorsContent.replace(
  'export default function DoctorsPage() {',
  'import { Suspense } from "react";\n\nfunction DoctorsContent() {'
);
doctorsContent += `\n\nexport default function DoctorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-500">Loading doctors directory...</div>}>
      <DoctorsContent />
    </Suspense>
  );
}\n`;
fs.writeFileSync("src/app/doctors/page.tsx", doctorsContent, "utf8");

// 3. FIX src/app/booking-confirmation/page.tsx
let confirmContent = fs.readFileSync("src/app/booking-confirmation/page.tsx", "utf8");
confirmContent = confirmContent.replace(
  'export default function BookingConfirmationPage() {',
  'import { Suspense } from "react";\n\nfunction BookingConfirmationContent() {'
);
confirmContent += `\n\nexport default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-500">Loading confirmation pass...</div>}>
      <BookingConfirmationContent />
    </Suspense>
  );
}\n`;
fs.writeFileSync("src/app/booking-confirmation/page.tsx", confirmContent, "utf8");

// 4. FIX src/app/my-appointments/page.tsx
let myAptsContent = fs.readFileSync("src/app/my-appointments/page.tsx", "utf8");
myAptsContent = myAptsContent.replace(
  'export default function MyAppointmentsPage() {',
  'import { Suspense } from "react";\n\nfunction MyAppointmentsContent() {'
);
myAptsContent += `\n\nexport default function MyAppointmentsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-500">Loading your appointments...</div>}>
      <MyAppointmentsContent />
    </Suspense>
  );
}\n`;
fs.writeFileSync("src/app/my-appointments/page.tsx", myAptsContent, "utf8");

console.log("Wrapped all useSearchParams pages with React Suspense!");

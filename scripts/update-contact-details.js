const fs = require("fs");

const newAddress = "3rd Floor, Vipul plaza, 321, Sector 81, Faridabad, Haryana 121002";
const newPhone = "+91 70427 93777";
const newEmail = "sales@radhix.com";

// 1. UPDATE src/lib/store.ts
let storeContent = fs.readFileSync("src/lib/store.ts", "utf8");
storeContent = storeContent.replace(
  /address: "Plot 42, Tech Park Boulevard, Indiranagar",\s*city: "Bengaluru",\s*state: "Karnataka",\s*pincode: "560038",\s*phone: "\+91 98765 43210",\s*email: "care@radhixclinic\.com"/,
  `address: "3rd Floor, Vipul plaza, 321, Sector 81",\n    city: "Faridabad",\n    state: "Haryana",\n    pincode: "121002",\n    phone: "${newPhone}",\n    email: "${newEmail}"`
);
fs.writeFileSync("src/lib/store.ts", storeContent, "utf8");
console.log("Updated src/lib/store.ts");

// 2. UPDATE src/components/public/Footer.tsx
let footerContent = fs.readFileSync("src/components/public/Footer.tsx", "utf8");
footerContent = footerContent.replace("Indiranagar, Bengaluru, KA 560038", newAddress);
footerContent = footerContent.replace("+91 98765 43210", newPhone);
footerContent = footerContent.replace("care@radhixclinic.com", newEmail);
fs.writeFileSync("src/components/public/Footer.tsx", footerContent, "utf8");
console.log("Updated src/components/public/Footer.tsx");

// 3. UPDATE src/components/public/ContactSection.tsx
let contactSectionContent = fs.readFileSync("src/components/public/ContactSection.tsx", "utf8");
contactSectionContent = contactSectionContent.replace("Bengaluru Main Clinic", "Faridabad Clinic (HQ)");
contactSectionContent = contactSectionContent.replace("Plot 42, Tech Park Blvd, Indiranagar", newAddress);
contactSectionContent = contactSectionContent.replace("+91 98765 43210", newPhone);
fs.writeFileSync("src/components/public/ContactSection.tsx", contactSectionContent, "utf8");
console.log("Updated src/components/public/ContactSection.tsx");

// 4. UPDATE src/app/contact/page.tsx
let contactPageContent = fs.readFileSync("src/app/contact/page.tsx", "utf8");
contactPageContent = contactPageContent.replace(
  "Plot 42, Tech Park Boulevard, Indiranagar, Bengaluru, KA 560038",
  newAddress
);
contactPageContent = contactPageContent.replace("+91 98765 43210", newPhone);
contactPageContent = contactPageContent.replace("care@radhixclinic.com", newEmail);
fs.writeFileSync("src/app/contact/page.tsx", contactPageContent, "utf8");
console.log("Updated src/app/contact/page.tsx");

// 5. UPDATE src/app/booking-confirmation/page.tsx
let confirmContent = fs.readFileSync("src/app/booking-confirmation/page.tsx", "utf8");
confirmContent = confirmContent.replace(
  "Radhix Super-Speciality Clinic, Indiranagar, Bengaluru",
  `Radhix Clinic, ${newAddress}`
);
confirmContent = confirmContent.replace(
  "Plot 42, Tech Park Blvd, Indiranagar, Bengaluru.",
  `${newAddress}.`
);
fs.writeFileSync("src/app/booking-confirmation/page.tsx", confirmContent, "utf8");
console.log("Updated src/app/booking-confirmation/page.tsx");

// 6. UPDATE src/app/doctors/[id]/page.tsx
let docDetailContent = fs.readFileSync("src/app/doctors/[id]/page.tsx", "utf8");
docDetailContent = docDetailContent.replace("+91 98765 43210", newPhone);
fs.writeFileSync("src/app/doctors/[id]/page.tsx", docDetailContent, "utf8");
console.log("Updated src/app/doctors/[id]/page.tsx");

// 7. UPDATE src/components/admin/AdminTopbar.tsx
let topbarContent = fs.readFileSync("src/components/admin/AdminTopbar.tsx", "utf8");
topbarContent = topbarContent.replace(
  "Radhix Super-Speciality (Indiranagar)",
  "Radhix Clinic (Faridabad)"
);
topbarContent = topbarContent.replace(
  "Radhix Main Clinic (Bengaluru)",
  "Radhix Clinic (Vipul Plaza, Faridabad)"
);
fs.writeFileSync("src/components/admin/AdminTopbar.tsx", topbarContent, "utf8");
console.log("Updated src/components/admin/AdminTopbar.tsx");

// 8. UPDATE src/app/admin/settings/page.tsx
let settingsContent = fs.readFileSync("src/app/admin/settings/page.tsx", "utf8");
settingsContent = settingsContent.replace("+91 98765 43210", newPhone);
settingsContent = settingsContent.replace("care@radhixclinic.com", newEmail);
fs.writeFileSync("src/app/admin/settings/page.tsx", settingsContent, "utf8");
console.log("Updated src/app/admin/settings/page.tsx");

// 9. UPDATE src/app/admin/notifications/page.tsx
let notifContent = fs.readFileSync("src/app/admin/notifications/page.tsx", "utf8");
notifContent = notifContent.replace("Radhix Clinic Indiranagar", "Radhix Clinic Faridabad");
fs.writeFileSync("src/app/admin/notifications/page.tsx", notifContent, "utf8");
console.log("Updated src/app/admin/notifications/page.tsx");

// 10. UPDATE supabase/seed.sql
let seedContent = fs.readFileSync("supabase/seed.sql", "utf8");
seedContent = seedContent.replace(
  "Plot 42, Tech Park Boulevard, Indiranagar', 'Bengaluru', 'Karnataka', '560038', '+91 98765 43210', 'care@radhixclinic.com'",
  "3rd Floor, Vipul plaza, 321, Sector 81', 'Faridabad', 'Haryana', '121002', '" + newPhone + "', '" + newEmail + "'"
);
fs.writeFileSync("supabase/seed.sql", seedContent, "utf8");
console.log("Updated supabase/seed.sql");

// 11. UPDATE README.md & .env.example
if (fs.existsSync("README.md")) {
  let readme = fs.readFileSync("README.md", "utf8");
  readme = readme.replace(/\+91 98765 43210/g, newPhone);
  readme = readme.replace(/care@radhixclinic\.com/g, newEmail);
  readme = readme.replace(/Indiranagar, Bengaluru/g, "Sector 81, Faridabad");
  fs.writeFileSync("README.md", readme, "utf8");
  console.log("Updated README.md");
}

console.log("All address, phone, and email details updated successfully across the codebase!");

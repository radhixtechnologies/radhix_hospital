const fs = require("fs");

const envExample = `# =====================================================================
# RADHIX CLINIC - ENVIRONMENT CONFIGURATION
# Powered by Radhix Technologies
# =====================================================================

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (PostgreSQL, Auth, RLS)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Razorpay Payments (UPI, Cards, Netbanking)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_yourKeyId
RAZORPAY_KEY_SECRET=yourRazorpaySecret
RAZORPAY_WEBHOOK_SECRET=yourRazorpayWebhookSecret

# Resend Email Gateway
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=appointments@radhixclinic.com

# WhatsApp Cloud API (Meta)
WHATSAPP_API_TOKEN=your_meta_system_user_token
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
`;

fs.writeFileSync(".env.example", envExample, "utf8");

const readmeContent = `# Radhix Clinic — SaaS Clinic Appointment Booking Platform
> **Enterprise Healthcare Appointment Booking & Clinic Operations OS**  
> *Built & Powered by Radhix Technologies*

---

## 🌟 Overview
**Radhix Clinic** is a full-stack SaaS healthcare appointment booking platform designed for multi-specialty clinics, diagnostic centres, and hospital outpatient departments (OPDs). It features:
1. **Public Patient Portal**: Book verified doctor appointments in 60 seconds, check real-time available slots, pay online via Razorpay or choose Pay at Clinic, and receive instant WhatsApp/Google Calendar confirmations with QR check-in passes.
2. **Clinic Staff Operations OS (Admin Panel)**: Full operational dashboard with daily metrics, active OPD queue, appointments data table, calendar slot matrix, doctor schedule management, patient medical logs, payment audit trails, and multi-tenant clinic switcher for Radhix Technologies.

---

## 🛠 Tech Stack
- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Recharts
- **Database & Auth**: PostgreSQL / Supabase with Row Level Security (RLS) & atomic slot reservation constraints
- **Payments**: Razorpay (UPI, Credit/Debit cards, Netbanking) with sandbox test mode toggle
- **Notifications**: Pluggable WhatsApp Cloud API + Resend (Email) + Transactional SMS
- **Utilities**: date-fns, qrcode, canvas-confetti, clsx, tailwind-merge

---

## 📁 Project Structure
\`\`\`
radhix-clinic/
├── public/                    # Static assets & icons
├── supabase/
│   ├── schema.sql             # Production PostgreSQL schema, indexes, RLS, & double-booking prevention constraint
│   └── seed.sql               # 2 clinics, 5 doctors with schedules, 6 services, 20 patients, 40 sample appointments
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with brand typography & theme styles
│   │   ├── page.tsx           # High-conversion public home page (hero, trust badges, services, doctors, reviews, FAQ)
│   │   ├── globals.css        # Tailwind tokens (#1E40AF primary, #14B8A6 accent, glassmorphism, dark mode)
│   │   ├── doctors/
│   │   │   ├── page.tsx       # Doctors directory with search & filters (specialty, fee slider, availability)
│   │   │   └── [id]/page.tsx  # Doctor profile with bio, schedule, reviews, and instant slot launcher
│   │   ├── book/
│   │   │   └── page.tsx       # 4-step booking flow stepper (Doctor -> Slot -> Patient Info -> Payment)
│   │   ├── booking-confirmation/
│   │   │   └── page.tsx       # Confirmation pass with booking ID, QR code, Google Calendar link, PDF receipt
│   │   ├── my-appointments/
│   │   │   └── page.tsx       # Patient lookup by phone or booking ID, reschedule and cancellation actions
│   │   ├── about/             # About Radhix Clinic & clinical quality standards
│   │   ├── contact/           # Clinic helpline, emergency hotline, and inquiry form
│   │   ├── widget-embed/      # Embeddable iframe booking snippet generator for external websites
│   │   ├── admin/
│   │   │   ├── layout.tsx     # Collapsible admin sidebar & topbar with live clinic selector & role switcher
│   │   │   ├── login/         # Staff login with 1-click Quick Demo logins (Admin, Receptionist, Doctor, Super Admin)
│   │   │   ├── dashboard/     # Today's overview, KPI metrics, appointments timeline, 7-day Recharts graphs
│   │   │   ├── appointments/  # Filterable table, walk-in patient modal, calendar schedule view, CSV export
│   │   │   ├── doctors/       # Doctor profiles, fees, weekly timings, active/inactive toggle
│   │   │   ├── patients/      # Patient directory, contact numbers, blood groups, and visit history
│   │   │   ├── payments/      # Online vs desk payments, revenue collected vs due, invoice downloads
│   │   │   ├── services/      # Department consultation fees and duration editor
│   │   │   ├── reports/       # Busiest hours analytics and department volume breakdown
│   │   │   ├── notifications/ # Automated WhatsApp, Email & SMS confirmation templates
│   │   │   ├── settings/      # Clinic branding, colors, Razorpay test mode toggle, booking rules
│   │   │   └── super-admin/   # Multi-tenant clinic management for Radhix Technologies
│   │   └── api/
│   │       ├── doctors/       # GET/POST doctors
│   │       ├── slots/         # Real-time slot availability engine
│   │       ├── appointments/  # Double-booking checked appointment creation & status updates
│   │       └── razorpay/      # Order creation and payment signature verification
│   ├── components/
│   │   ├── public/            # Navbar, Footer, Hero, TrustBadges, Services, Doctors, FAQ, etc.
│   │   └── admin/             # AdminSidebar, AdminTopbar, etc.
│   └── lib/
│       ├── types.ts           # Complete TypeScript interfaces for all clinic domain entities
│       ├── store.ts           # Central reactive state engine with pre-seeded rich mock data & double booking engine
│       ├── supabase.ts        # Supabase client with graceful demo fallback
│       └── utils.ts           # Formatting helpers, status badge classes, currency formatters
├── .env.example
├── package.json
└── README.md
\`\`\`

---

## ⚡ Quick Start Guide

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Run the Development Server
\`\`\`bash
npm run dev
\`\`\`
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Instant Client Demo Mode
Radhix Clinic comes with built-in zero-config demo mode!
- Click **"Try Demo Admin"** in the top navigation or visit \`/admin/login\`.
- Use the **1-Click Demo Login** buttons to log in instantly as **Clinic Admin**, **Super Admin**, **Receptionist**, or **Doctor**.
- You can test live booking on the patient portal, see real-time slot locking, and immediately observe the booking in the Admin Queue.
- You can reset the demo state anytime with the **"Reset Demo"** button on the admin top bar.

---

## 🗄 Database Setup (Supabase / PostgreSQL)
1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in the Supabase dashboard.
3. Paste the contents of \`supabase/schema.sql\` and run it to create tables, relations, and the non-duplicate slot constraint:
   \`\`\`sql
   CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_doctor_slot_active
       ON appointments (doctor_id, appointment_date, time_slot)
       WHERE status != 'cancelled';
   \`\`\`
4. Run \`supabase/seed.sql\` to load sample clinics, doctors, services, patients, and reviews.
5. Copy your **Project URL** and **Anon Key** to your \`.env.local\` file.

---

## 💳 Razorpay Payments
- Supports UPI (GPay, PhonePe, Paytm), Credit & Debit cards, Netbanking.
- Toggle between **Test Sandbox Mode** and **Live Production Mode** directly from the Admin Settings page.

---

## 🏢 Onboarding a New Clinic Tenant (Multi-Tenant SaaS)
1. Open \`/admin/super-admin\`.
2. Click **"Onboard New Clinic"**.
3. Set the clinic name, address, custom brand color, consultation timings, and default fee rules.
4. Each clinic operates under its own unique slug with isolated staff roles and appointments.

---

## 📄 License
Commercial Healthcare SaaS Platform developed by **Radhix Technologies**. All rights reserved.
`;

fs.writeFileSync("README.md", readmeContent, "utf8");
console.log("Created .env.example and README.md!");

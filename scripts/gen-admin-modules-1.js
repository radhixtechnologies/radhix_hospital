const fs = require("fs");

// 1. DOCTORS MANAGEMENT: src/app/admin/doctors/page.tsx
const doctorsAdminCode = `"use client";

import React, { useState } from "react";
import { clinicStore, DEFAULT_DOCTORS } from "@/lib/store";
import { Doctor } from "@/lib/types";
import { Plus, Edit3, Trash2, Calendar, Star, ShieldCheck, Check, Clock } from "lucide-react";

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(() => clinicStore.getAllDoctors());
  const [modalOpen, setModalOpen] = useState(false);
  const [newDocName, setNewDocName] = useState("");
  const [newDocSpecialty, setNewDocSpecialty] = useState("Cardiology");
  const [newDocFee, setNewDocFee] = useState(700);
  const [newDocExp, setNewDocExp] = useState(10);
  const [newDocQual, setNewDocQual] = useState("MBBS, MD");

  const toggleDoctorActive = (doc: Doctor) => {
    const updated = { ...doc, is_active: !doc.is_active };
    clinicStore.updateDoctor(updated);
    setDoctors(clinicStore.getAllDoctors());
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const newDoc: Doctor = {
      id: "doc-" + Date.now(),
      clinic_id: "c1111111-1111-1111-1111-111111111111",
      name: newDocName,
      email: newDocName.toLowerCase().replace(/\\s+/g, ".") + "@radhixclinic.com",
      phone: "+91 98" + Math.floor(10000000 + Math.random() * 90000000),
      specialty: newDocSpecialty,
      qualification: newDocQual,
      experience_years: Number(newDocExp),
      consultation_fee: Number(newDocFee),
      bio: "Senior medical specialist dedicated to precision diagnosis and compassionate patient counseling.",
      avatar_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80",
      slot_duration_minutes: 30,
      rating: 4.9,
      review_count: 12,
      is_active: true,
      schedules: [1, 2, 3, 4, 5, 6].map((day) => ({
        day_of_week: day,
        start_time: "09:00 AM",
        end_time: "06:00 PM",
        is_working: true,
      })),
    };

    clinicStore.addDoctor(newDoc);
    setDoctors(clinicStore.getAllDoctors());
    setModalOpen(false);
    setNewDocName("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Doctors & OPD Schedules
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Doctors added or edited here appear on the public booking portal in real-time.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-md shadow-blue-700/25 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Doctor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className={\`p-6 rounded-3xl bg-white dark:bg-slate-900 border transition-all space-y-4 shadow-sm \${
              doc.is_active ? "border-slate-200/80 dark:border-slate-800" : "opacity-60 border-dashed border-slate-300"
            }\`}
          >
            <div className="flex items-start gap-4">
              <img
                src={doc.avatar_url}
                alt={doc.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-600/20 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wide block truncate">
                  {doc.specialty}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white truncate">
                  {doc.name}
                </h3>
                <p className="text-xs text-slate-400 truncate">{doc.qualification}</p>
                <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  <span>₹{doc.consultation_fee}</span>
                  <span>•</span>
                  <span>{doc.experience_years} Yrs Exp</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
              <p className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Working: Mon - Sat (9:00 AM - 6:00 PM)</span>
              </p>
              <p className="text-[11px] text-slate-500">Slot Duration: {doc.slot_duration_minutes} mins</p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className={\`font-bold \${doc.is_active ? "text-emerald-600" : "text-slate-400"}\`}>
                {doc.is_active ? "● Active on Website" : "○ Inactive"}
              </span>

              <button
                onClick={() => toggleDoctorActive(doc)}
                className={\`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-colors \${
                  doc.is_active ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-emerald-600 text-white"
                }\`}
              >
                {doc.is_active ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Add Senior Doctor</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleAddDoctor} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Doctor Name *</label>
                <input
                  type="text"
                  required
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="e.g. Dr. Sunil Mehta"
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Specialty</label>
                <select
                  value={newDocSpecialty}
                  onChange={(e) => setNewDocSpecialty(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="General Medicine">General Medicine</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Consultation Fee (₹)</label>
                  <input
                    type="number"
                    value={newDocFee}
                    onChange={(e) => setNewDocFee(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={newDocExp}
                    onChange={(e) => setNewDocExp(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-700 text-white font-bold"
                >
                  Save & Publish Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync("src/app/admin/doctors/page.tsx", doctorsAdminCode, "utf8");

// 2. PATIENTS DIRECTORY: src/app/admin/patients/page.tsx
const patientsAdminCode = `"use client";

import React, { useState } from "react";
import { DEFAULT_PATIENTS } from "@/lib/store";
import { Search, Phone, Mail, User, Calendar, FileText } from "lucide-react";

export default function AdminPatientsPage() {
  const [patients] = useState(DEFAULT_PATIENTS);
  const [search, setSearch] = useState("");

  const filtered = patients.filter((p) =>
    p.full_name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    (p.email && p.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Patients Directory
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Registered OPD patient records, past consult history, and clinical notes.
        </p>
      </div>

      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by patient name, phone number, or email..."
          className="w-full bg-transparent text-xs font-semibold outline-none"
        />
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <th className="pb-3">Patient Name</th>
              <th className="pb-3">Contact</th>
              <th className="pb-3">Age / Gender</th>
              <th className="pb-3">Blood Group</th>
              <th className="pb-3">Registration Date</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {filtered.map((pat) => (
              <tr key={pat.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                <td className="py-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 flex items-center justify-center font-bold text-[11px]">
                    {pat.full_name[0]}
                  </div>
                  <span>{pat.full_name}</span>
                </td>
                <td className="py-3">
                  <span className="block font-bold text-slate-800 dark:text-slate-200">{pat.phone}</span>
                  <span className="text-slate-400 text-[11px]">{pat.email || "No email"}</span>
                </td>
                <td className="py-3 text-slate-600 dark:text-slate-300">
                  {pat.age ? \`\${pat.age} yrs\` : "N/A"} • {pat.gender || "N/A"}
                </td>
                <td className="py-3 font-bold text-rose-600">{pat.blood_group || "O+"}</td>
                <td className="py-3 text-slate-500">{pat.created_at}</td>
                <td className="py-3 text-right">
                  <button className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px]">
                    History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`;

fs.writeFileSync("src/app/admin/patients/page.tsx", patientsAdminCode, "utf8");

// 3. PAYMENTS: src/app/admin/payments/page.tsx
const paymentsAdminCode = `"use client";

import React, { useState } from "react";
import { clinicStore } from "@/lib/store";
import { formatCurrency, getStatusBadgeClass } from "@/lib/utils";
import { CreditCard, Download, CheckCircle2, Clock, Filter } from "lucide-react";

export default function AdminPaymentsPage() {
  const appointments = clinicStore.getAppointments();
  const [filter, setFilter] = useState("all");

  const transactions = appointments.filter((a) => {
    if (filter === "online") return a.payment_method === "online";
    if (filter === "pay_at_clinic") return a.payment_method === "pay_at_clinic";
    if (filter === "paid") return a.payment_status === "paid";
    if (filter === "due") return a.payment_status === "due";
    return true;
  });

  const totalCollected = appointments
    .filter((a) => a.payment_status === "paid")
    .reduce((sum, a) => sum + a.total_amount, 0);

  const totalDue = appointments
    .filter((a) => a.payment_status === "due" && a.status !== "cancelled")
    .reduce((sum, a) => sum + a.total_amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Payments & Collections
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Razorpay settlements, cash-at-desk logs, and digital GST receipts.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Print Financial Summary</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Total Collected</span>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">₹{totalCollected}</p>
          <p className="text-[11px] text-slate-400">Online & verified desk cash</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Uncollected / Desk Due</span>
          <p className="text-3xl font-black text-amber-600 dark:text-amber-400">₹{totalDue}</p>
          <p className="text-[11px] text-slate-400">Patients arriving today</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Razorpay Gateway Status</span>
          <p className="text-lg font-bold text-blue-600 flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Active (Test Mode)</span>
          </p>
          <p className="text-[11px] text-slate-400">UPI, Netbanking & Cards enabled</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200">Transaction History</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
          >
            <option value="all">All Payments</option>
            <option value="online">Online (Razorpay)</option>
            <option value="pay_at_clinic">Pay at Clinic</option>
            <option value="paid">Status: Paid</option>
            <option value="due">Status: Due</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Booking ID</th>
                <th className="pb-3">Patient</th>
                <th className="pb-3">Doctor</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Method</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-bold text-blue-700 dark:text-teal-400">{t.booking_id}</td>
                  <td className="py-3 font-bold text-slate-900 dark:text-white">{t.patient_name}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">{t.doctor_name}</td>
                  <td className="py-3 font-black text-slate-900 dark:text-white">₹{t.total_amount}</td>
                  <td className="py-3 uppercase text-[11px] font-bold text-slate-500">
                    {t.payment_method === "online" ? "Online (UPI/Card)" : "Cash / Desk"}
                  </td>
                  <td className="py-3">
                    <span className={\`px-2.5 py-1 rounded-full text-[10px] font-bold border \${getStatusBadgeClass(t.payment_status)}\`}>
                      {t.payment_status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => alert("Printing invoice receipt for " + t.booking_id)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-[10px]"
                    >
                      Invoice PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync("src/app/admin/payments/page.tsx", paymentsAdminCode, "utf8");

// 4. SERVICES: src/app/admin/services/page.tsx
const servicesAdminCode = `"use client";

import React, { useState } from "react";
import { DEFAULT_SERVICES } from "@/lib/store";
import { Plus, Edit2, Check, Clock } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState(DEFAULT_SERVICES);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Clinic Services & Consultation Packages
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure clinical department fees and duration limits.
          </p>
        </div>

        <button
          onClick={() => alert("Add service package dialog")}
          className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-md shadow-blue-700/25 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div key={srv.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-teal-600 bg-teal-50 dark:bg-teal-950 px-2.5 py-0.5 rounded-full">
                {srv.department}
              </span>
              <span className="text-lg font-black text-slate-900 dark:text-white">₹{srv.fee}</span>
            </div>

            <h3 className="font-bold text-base text-slate-900 dark:text-white">{srv.name}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{srv.description}</p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5" />
                {srv.duration_minutes} Mins
              </span>
              <button className="text-blue-600 font-bold hover:underline">Edit Price</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

fs.writeFileSync("src/app/admin/services/page.tsx", servicesAdminCode, "utf8");
console.log("Created doctors, patients, payments, services admin pages!");

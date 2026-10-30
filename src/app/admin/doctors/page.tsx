"use client";

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
      email: newDocName.toLowerCase().replace(/\s+/g, ".") + "@radhixclinic.com",
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
            className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border transition-all space-y-4 shadow-sm ${
              doc.is_active ? "border-slate-200/80 dark:border-slate-800" : "opacity-60 border-dashed border-slate-300"
            }`}
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
              <span className={`font-bold ${doc.is_active ? "text-emerald-600" : "text-slate-400"}`}>
                {doc.is_active ? "● Active on Website" : "○ Inactive"}
              </span>

              <button
                onClick={() => toggleDoctorActive(doc)}
                className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-colors ${
                  doc.is_active ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-emerald-600 text-white"
                }`}
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

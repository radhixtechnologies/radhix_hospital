"use client";

import React, { useState, useMemo, useEffect } from "react";
import { clinicStore } from "@/lib/store";
import { 
  HospitalBed, 
  WardType, 
  BedStatus, 
  AmbulanceVehicle, 
  AmbulanceStatus, 
  PharmacyMedicine, 
  PharmacySale, 
  SecurityWardenPost 
} from "@/lib/types";
import { 
  Boxes, 
  Bed, 
  Truck, 
  Pill, 
  ShieldAlert, 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Plus, 
  X, 
  Phone, 
  IndianRupee, 
  AlertTriangle, 
  UserCheck, 
  Activity, 
  FileText, 
  Check, 
  Calendar,
  ShieldCheck,
  Zap,
  ArrowRight
} from "lucide-react";

export default function HospitalInventoryPage() {
  const [activeTab, setActiveTab] = useState<"beds" | "pharmacy" | "ambulances" | "security">("beds");

  // State loaded from clinicStore
  const [beds, setBeds] = useState<HospitalBed[]>(() => clinicStore.getBeds());
  const [ambulances, setAmbulances] = useState<AmbulanceVehicle[]>(() => clinicStore.getAmbulances());
  const [medicines, setMedicines] = useState<PharmacyMedicine[]>(() => clinicStore.getPharmacyMedicines());
  const [pharmacySales, setPharmacySales] = useState<PharmacySale[]>(() => clinicStore.getPharmacySales());
  const securityWardens = useMemo(() => clinicStore.getSecurityWardens(), []);

  useEffect(() => {
    const handleSync = () => {
      setBeds(clinicStore.getBeds());
      setAmbulances(clinicStore.getAmbulances());
      setPharmacySales(clinicStore.getPharmacySales());
      setMedicines(clinicStore.getPharmacyMedicines());
    };
    window.addEventListener("storage", handleSync);
    window.addEventListener("hospital_store_updated", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("hospital_store_updated", handleSync);
    };
  }, []);

  // Filter states
  const [selectedWard, setSelectedWard] = useState<string>("All");
  const [selectedBedStatus, setSelectedBedStatus] = useState<string>("All");
  const [bedSearch, setBedSearch] = useState<string>("");
  const [pharmacySearch, setPharmacySearch] = useState<string>("");

  // Modals
  const [admitModalBed, setAdmitModalBed] = useState<HospitalBed | null>(null);
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);

  // New admission form
  const [admissionForm, setAdmissionForm] = useState({
    patientName: "",
    patientAge: 35,
    patientGender: "Male",
    patientPhone: "",
    diagnosis: "",
    doctorAssigned: "Dr. Rajesh Sharma",
  });

  // New pharmacy sale form
  const [saleForm, setSaleForm] = useState({
    patientName: "",
    doctorName: "Dr. Rajesh Sharma",
    itemCount: 2,
    totalAmount: 650,
    paymentMethod: "UPI" as "Cash" | "UPI" | "Card",
  });

  // Bed filter logic
  const filteredBeds = useMemo(() => {
    return beds.filter((b) => {
      const matchWard = selectedWard === "All" || b.ward === selectedWard;
      const matchStatus = selectedBedStatus === "All" || b.status === selectedBedStatus;
      const matchSearch =
        b.bedNumber.toLowerCase().includes(bedSearch.toLowerCase()) ||
        (b.patientName && b.patientName.toLowerCase().includes(bedSearch.toLowerCase())) ||
        (b.diagnosis && b.diagnosis.toLowerCase().includes(bedSearch.toLowerCase())) ||
        (b.doctorAssigned && b.doctorAssigned.toLowerCase().includes(bedSearch.toLowerCase()));
      return matchWard && matchStatus && matchSearch;
    });
  }, [beds, selectedWard, selectedBedStatus, bedSearch]);

  // Aggregate bed metrics
  const totalBedsCount = beds.length;
  const occupiedBedsCount = beds.filter((b) => b.status === "Occupied").length;
  const availableBedsCount = beds.filter((b) => b.status === "Available").length;
  const cleaningBedsCount = beds.filter((b) => b.status === "Cleaning" || b.status === "Maintenance").length;

  // Aggregate pharmacy metrics
  const totalPharmacySalesToday = pharmacySales.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const lowStockCount = medicines.filter((m) => m.status === "Low Stock").length;

  // Ambulance metrics
  const availableAmbulancesCount = ambulances.filter((a) => a.status === "Available").length;
  const onCallAmbulancesCount = ambulances.filter((a) => a.status === "On Call").length;

  // Handle admit patient
  const handleAdmitPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admitModalBed || !admissionForm.patientName.trim()) {
      alert("Please enter patient name");
      return;
    }

    clinicStore.admitPatientToBed(admitModalBed.id, {
      patientName: admissionForm.patientName,
      patientAge: Number(admissionForm.patientAge) || 30,
      patientGender: admissionForm.patientGender,
      patientPhone: admissionForm.patientPhone,
      diagnosis: admissionForm.diagnosis || "Under Clinical Evaluation",
      doctorAssigned: admissionForm.doctorAssigned,
    });

    setBeds(clinicStore.getBeds());
    setAdmitModalBed(null);
    setAdmissionForm({
      patientName: "",
      patientAge: 35,
      patientGender: "Male",
      patientPhone: "",
      diagnosis: "",
      doctorAssigned: "Dr. Rajesh Sharma",
    });
  };

  // Handle vacate bed
  const handleVacateBed = (bedId: string) => {
    if (confirm("Discharge patient and mark this bed as Available / Khali?")) {
      clinicStore.vacateBed(bedId);
      setBeds(clinicStore.getBeds());
    }
  };

  // Handle ambulance status toggle
  const handleToggleAmbulance = (id: string, newStatus: AmbulanceStatus) => {
    clinicStore.updateAmbulanceStatus(id, newStatus);
    setAmbulances(clinicStore.getAmbulances());
  };

  // Handle new pharmacy sale
  const handleCreateSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!saleForm.patientName.trim()) {
      alert("Please enter patient / buyer name");
      return;
    }

    clinicStore.addPharmacySale({
      patientName: saleForm.patientName,
      doctorName: saleForm.doctorName,
      itemCount: Number(saleForm.itemCount) || 1,
      totalAmount: Number(saleForm.totalAmount) || 200,
      paymentMethod: saleForm.paymentMethod,
    });

    setPharmacySales(clinicStore.getPharmacySales());
    setIsNewSaleOpen(false);
    setSaleForm({
      patientName: "",
      doctorName: "Dr. Rajesh Sharma",
      itemCount: 2,
      totalAmount: 650,
      paymentMethod: "UPI",
    });
  };

  const wardsList: (WardType | "All")[] = [
    "All",
    "ICU",
    "Emergency",
    "General Ward",
    "Semi-Private",
    "Maternity",
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-teal-900 via-slate-900 to-blue-950 p-6 rounded-3xl text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/30 text-teal-200 text-xs font-bold border border-teal-400/30">
              Hospital Operations OS
            </span>
            <span className="text-xs text-slate-300">Central Assets & Facility Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Hospital Inventory, Beds & Fleet OS
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl">
            Live real-time monitoring of Hospital Beds (Occupied vs Khali), Medical Store Pharmacy sales & drug stocks, Ambulance fleet ready-status, and Security Guard duty locations.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab("beds")}
            className="px-4 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/25 transition-all flex items-center gap-1.5"
          >
            <Bed className="w-4 h-4" />
            <span>Manage Beds</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("pharmacy");
              setIsNewSaleOpen(true);
            }}
            className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Record Pharmacy Sale</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Beds Occupancy */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Hospital Beds Status</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
              <Bed className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {occupiedBedsCount} / {totalBedsCount}
            </span>
            <span className="text-xs font-bold text-rose-600">Occupied</span>
          </div>
          <div className="flex items-center justify-between mt-1 text-[11px]">
            <span className="text-emerald-600 font-bold">{availableBedsCount} Khali (Available)</span>
            <span className="text-amber-500 font-bold">{cleaningBedsCount} Cleaning</span>
          </div>
        </div>

        {/* Medical Store Sales */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Medical Shop Sales Today</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-2">
            ₹{totalPharmacySalesToday.toLocaleString("en-IN")}
          </div>
          <div className="flex items-center justify-between mt-1 text-[11px]">
            <span className="text-slate-500">{pharmacySales.length} Prescriptions Billed</span>
            {lowStockCount > 0 && (
              <span className="text-rose-600 font-bold">{lowStockCount} Low Stock</span>
            )}
          </div>
        </div>

        {/* Ambulance Fleet */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Ambulance Fleet Status</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {availableAmbulancesCount} / {ambulances.length}
            </span>
            <span className="text-xs font-bold text-emerald-600">Available</span>
          </div>
          <div className="flex items-center justify-between mt-1 text-[11px]">
            <span className="text-rose-600 font-bold">{onCallAmbulancesCount} On Emergency Call</span>
            <span className="text-slate-400">1 Maintenance</span>
          </div>
        </div>

        {/* Security & Wardens */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Security & Wardens</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {securityWardens.length} Active Posts
          </div>
          <span className="text-[11px] text-purple-600 font-bold block mt-1">
            Emergency Gate, IPD, OPD, Parking
          </span>
        </div>

      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("beds")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "beds"
              ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Bed className="w-4 h-4" />
          <span>Hospital Beds Matrix ({beds.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("pharmacy")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "pharmacy"
              ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>Medical Store & Sales (₹{(totalPharmacySalesToday / 1000).toFixed(1)}k)</span>
        </button>

        <button
          onClick={() => setActiveTab("ambulances")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "ambulances"
              ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Ambulance Fleet ({ambulances.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "security"
              ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Security & Wardens Register</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: HOSPITAL BEDS MANAGEMENT */}
      {/* ===================================================================== */}
      {activeTab === "beds" && (
        <div className="space-y-4">
          
          {/* Filters Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by bed #, patient name, doctor, diagnosis..."
                value={bedSearch}
                onChange={(e) => setBedSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-xs w-full text-slate-800 dark:text-slate-100"
              />
              {bedSearch && (
                <button onClick={() => setBedSearch("")} className="text-slate-400">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Ward Pills */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {wardsList.map((ward) => (
                  <button
                    key={ward}
                    onClick={() => setSelectedWard(ward)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                      selectedWard === ward
                        ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    {ward}
                  </button>
                ))}
              </div>

              {/* Status Filter */}
              <select
                value={selectedBedStatus}
                onChange={(e) => setSelectedBedStatus(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs font-bold text-slate-700 dark:text-slate-200 outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Khali (Available Only)</option>
                <option value="Occupied">Occupied Only</option>
                <option value="Cleaning">Cleaning / Sanitizing</option>
              </select>
            </div>
          </div>

          {/* Bed Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredBeds.map((bed) => {
              const isOccupied = bed.status === "Occupied";
              const isAvailable = bed.status === "Available";

              return (
                <div
                  key={bed.id}
                  className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-3 ${
                    isOccupied
                      ? "bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-900/60 shadow-sm hover:shadow-md"
                      : isAvailable
                      ? "bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-900/60 shadow-sm hover:shadow-md"
                      : "bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40"
                  }`}
                >
                  <div className="space-y-3">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm ${
                          isOccupied
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                            : isAvailable
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                        }`}>
                          <Bed className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-black text-base text-slate-900 dark:text-white">
                              {bed.bedNumber}
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {bed.ward}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 block">{bed.floor}</span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                        isOccupied
                          ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                          : isAvailable
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      }`}>
                        {isOccupied ? "Occupied" : isAvailable ? "Khali (Available)" : bed.status}
                      </span>
                    </div>

                    {/* Patient Details if Occupied */}
                    {isOccupied ? (
                      <div className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Admitted Patient:</span>
                          <span className="font-extrabold text-slate-900 dark:text-white">
                            {bed.patientName} ({bed.patientAge}y, {bed.patientGender})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Diagnosis:</span>
                          <span className="font-semibold text-rose-900 dark:text-rose-200 text-right max-w-[200px] truncate" title={bed.diagnosis}>
                            {bed.diagnosis}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Attending Doctor:</span>
                          <span className="font-bold text-blue-700 dark:text-blue-300">{bed.doctorAssigned}</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-rose-200/60 dark:border-rose-900/40 text-[11px]">
                          <span className="text-slate-400">Admitted: {bed.admissionDate}</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">₹{bed.dailyCharge}/day</span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                            ✓ Bed Sanitized & Ready for Patient
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white">₹{bed.dailyCharge}/day</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Equipped with medical gas outlet, multipara monitor mount & call bell.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    {isOccupied ? (
                      <button
                        onClick={() => handleVacateBed(bed.id)}
                        className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 dark:bg-slate-800 dark:hover:bg-rose-950/50 dark:text-slate-300 text-xs font-bold transition-colors text-center"
                      >
                        Discharge Patient (Make Khali)
                      </button>
                    ) : (
                      <button
                        onClick={() => setAdmitModalBed(bed)}
                        className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition-all text-center flex items-center justify-center gap-1.5"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Admit Patient to This Bed</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: MEDICAL STORE & PHARMACY SALES */}
      {/* ===================================================================== */}
      {activeTab === "pharmacy" && (
        <div className="space-y-6">
          
          {/* Pharmacy Sales Stats Bar */}
          <div className="p-5 rounded-3xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-teal-600" />
                Hospital Pharmacy & Chemist Counter Sales Tracker
              </span>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                "Meri Kitni Sale Hui" — Live Daily Pharmacy Revenue
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Track prescriptions billed for Inpatients (IPD), Outpatients (OPD), and walk-in counter sales.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Today's Pharmacy Sales</span>
                <span className="text-xl font-black text-teal-700 dark:text-teal-300">
                  ₹{totalPharmacySalesToday.toLocaleString("en-IN")}
                </span>
              </div>
              <button
                onClick={() => setIsNewSaleOpen(true)}
                className="px-4 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/30 flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ Create Sale Bill</span>
              </button>
            </div>
          </div>

          {/* Recent Sales Bills */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-black text-sm text-slate-900 dark:text-white">
              Recent Pharmacy Billing Invoices Today
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Bill Number</th>
                    <th className="py-2.5 px-3">Patient Name</th>
                    <th className="py-2.5 px-3">Prescribing Doctor</th>
                    <th className="py-2.5 px-3">Items Count</th>
                    <th className="py-2.5 px-3">Payment Mode</th>
                    <th className="py-2.5 px-3">Bill Time</th>
                    <th className="py-2.5 px-3 text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {pharmacySales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="py-2.5 px-3 font-mono font-bold text-blue-700 dark:text-blue-300">
                        {sale.billNumber}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                        {sale.patientName}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                        {sale.doctorName || "General Counter"}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                        {sale.itemCount} Medicines
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {sale.paymentMethod}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                        {sale.createdAt}
                      </td>
                      <td className="py-2.5 px-3 text-right font-black text-sm text-emerald-600 dark:text-emerald-400">
                        ₹{sale.totalAmount.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Medicines Inventory & Low Stock Alerts */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  Hospital Pharmacy Drug & Consumables Stock
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time stock counts and low-reorder warnings for emergency medicines
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                {medicines.length} Catalogued Items
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Medicine / Consumable Name</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Batch Number</th>
                    <th className="py-2.5 px-3">Current Stock</th>
                    <th className="py-2.5 px-3">Unit Price</th>
                    <th className="py-2.5 px-3">Expiry Date</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {medicines.map((med) => (
                    <tr key={med.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                        {med.name}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                        {med.category}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">
                        {med.batchNumber}
                      </td>
                      <td className="py-2.5 px-3 font-black text-slate-900 dark:text-white">
                        {med.stockCount} units
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-700 dark:text-slate-300">
                        ₹{med.unitPrice}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">
                        {med.expiryDate}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          med.status === "In Stock"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 animate-pulse"
                        }`}>
                          {med.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: AMBULANCE FLEET */}
      {/* ===================================================================== */}
      {activeTab === "ambulances" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ambulances.map((amb) => (
            <div
              key={amb.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                    amb.status === "Available"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : amb.status === "On Call"
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}>
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {amb.vehicleNumber}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      {amb.model}
                    </span>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                      {amb.type}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  amb.status === "Available"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : amb.status === "On Call"
                    ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                    : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                }`}>
                  {amb.status}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Driver:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{amb.driverName} ({amb.driverPhone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current GPS Location:</span>
                  <span className="font-semibold text-blue-700 dark:text-blue-300 text-right">{amb.currentLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fuel Tank Level:</span>
                  <span className="font-bold text-emerald-600">{amb.fuelLevel}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 block">Life Support Equipment Onboard:</span>
                <div className="flex flex-wrap gap-1">
                  {amb.equipment.map((eq) => (
                    <span key={eq} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium">
                      ✓ {eq}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => handleToggleAmbulance(amb.id, "Available")}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    amb.status === "Available"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-emerald-50"
                  }`}
                >
                  Set Available
                </button>
                <button
                  onClick={() => handleToggleAmbulance(amb.id, "On Call")}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    amb.status === "On Call"
                      ? "bg-rose-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-rose-50"
                  }`}
                >
                  Dispatch (On Call)
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: SECURITY GUARDS & WARDENS REGISTER */}
      {/* ===================================================================== */}
      {activeTab === "security" && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Hospital Security Posts & Wardens Duty Schedule
              </h2>
              <p className="text-xs text-slate-500">
                Active perimeter protection, patient ward sanitation monitoring, and emergency response teams
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 text-xs font-bold">
              All 4 Primary Posts Manned
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Staff Name</th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-4">Assigned Post / Location</th>
                  <th className="py-3 px-4">Duty Shift</th>
                  <th className="py-3 px-4">Direct Contact</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {securityWardens.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {post.staffName}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                        {post.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {post.postLocation}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {post.shift} Shift
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-mono">
                      {post.phone}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        ● {post.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 1: ADMIT PATIENT TO BED */}
      {/* ===================================================================== */}
      {admitModalBed && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-white">
                  Admit Patient to Bed {admitModalBed.bedNumber}
                </h3>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                  {admitModalBed.ward} • {admitModalBed.floor} (₹{admitModalBed.dailyCharge}/day)
                </span>
              </div>
              <button
                onClick={() => setAdmitModalBed(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdmitPatient} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={admissionForm.patientName}
                  onChange={(e) => setAdmissionForm({ ...admissionForm, patientName: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Age (Years) *</label>
                  <input
                    type="number"
                    required
                    value={admissionForm.patientAge}
                    onChange={(e) => setAdmissionForm({ ...admissionForm, patientAge: Number(e.target.value) })}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Gender *</label>
                  <select
                    value={admissionForm.patientGender}
                    onChange={(e) => setAdmissionForm({ ...admissionForm, patientGender: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Attendant / Patient Mobile Phone *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98XXX XXXXX"
                  value={admissionForm.patientPhone}
                  onChange={(e) => setAdmissionForm({ ...admissionForm, patientPhone: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Admission Diagnosis / Clinical Reason *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acute chest pain / Post-operative observation"
                  value={admissionForm.diagnosis}
                  onChange={(e) => setAdmissionForm({ ...admissionForm, diagnosis: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Attending Consultant Doctor *</label>
                <select
                  value={admissionForm.doctorAssigned}
                  onChange={(e) => setAdmissionForm({ ...admissionForm, doctorAssigned: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none font-bold"
                >
                  <option value="Dr. Rajesh Sharma">Dr. Rajesh Sharma (Cardiology)</option>
                  <option value="Dr. Amit Verma">Dr. Amit Verma (Orthopedics)</option>
                  <option value="Dr. Vikram Sen">Dr. Vikram Sen (Neurology)</option>
                  <option value="Dr. Priya Patel">Dr. Priya Patel (Dermatology)</option>
                  <option value="Dr. Ananya Iyer">Dr. Ananya Iyer (Pediatrics)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setAdmitModalBed(null)}
                  className="px-4 py-2 rounded-xl border text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20"
                >
                  Confirm Bed Admission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: RECORD PHARMACY SALE BILL */}
      {/* ===================================================================== */}
      {isNewSaleOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
                  <Pill className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    Record New Pharmacy Bill
                  </h3>
                  <span className="text-xs text-slate-400">Updates live hospital counter revenue</span>
                </div>
              </div>
              <button
                onClick={() => setIsNewSaleOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSale} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Patient / Buyer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra (Bed ICU-01) / Walk-in"
                  value={saleForm.patientName}
                  onChange={(e) => setSaleForm({ ...saleForm, patientName: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Prescribing Doctor</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={saleForm.doctorName}
                  onChange={(e) => setSaleForm({ ...saleForm, doctorName: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Medicines Count</label>
                  <input
                    type="number"
                    value={saleForm.itemCount}
                    onChange={(e) => setSaleForm({ ...saleForm, itemCount: Number(e.target.value) })}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Total Bill Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={saleForm.totalAmount}
                    onChange={(e) => setSaleForm({ ...saleForm, totalAmount: Number(e.target.value) })}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none font-bold text-teal-600 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Payment Method</label>
                <select
                  value={saleForm.paymentMethod}
                  onChange={(e) => setSaleForm({ ...saleForm, paymentMethod: e.target.value as any })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none font-bold"
                >
                  <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                  <option value="Cash">Cash at Counter</option>
                  <option value="Card">Debit / Credit Card POS</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewSaleOpen(false)}
                  className="px-4 py-2 rounded-xl border text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-md shadow-teal-600/20"
                >
                  Generate Invoice & Add Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}


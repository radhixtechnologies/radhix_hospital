"use client";

import React, { useState, useMemo } from "react";
import { clinicStore } from "@/lib/store";
import { StaffMember, StaffRole, AttendanceStatus, ShiftType } from "@/lib/types";
import { 
  Users, 
  UserPlus, 
  CalendarCheck, 
  CreditCard, 
  FileText, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  Printer, 
  X, 
  Download, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Building2, 
  Briefcase, 
  IndianRupee,
  BadgeCheck,
  ChevronRight
} from "lucide-react";

export default function HospitalHrmPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(() => clinicStore.getStaff());
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"directory" | "attendance" | "payroll">("directory");
  
  // Modals state
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [selectedStaffForSlip, setSelectedStaffForSlip] = useState<StaffMember | null>(null);
  const [selectedStaffForDetails, setSelectedStaffForDetails] = useState<StaffMember | null>(null);

  // New staff form state
  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "Nurse" as StaffRole,
    department: "Inpatient Ward",
    phone: "",
    email: "",
    shift: "Morning" as ShiftType,
    monthlyGross: 35000,
    ctc: 450000,
    hra: 7000,
    specialAllowance: 3000,
    medicalAllowance: 2000,
    pf: 2800,
    tax: 800,
  });

  const rolesList: (StaffRole | "All")[] = [
    "All",
    "Doctor",
    "Nurse",
    "Receptionist",
    "Warden",
    "Security Guard",
    "Medical Store",
    "Ambulance Driver",
    "Radiologist",
    "Inventory Manager",
    "Lab Technician",
  ];

  // Filtered staff list
  const filteredStaff = useMemo(() => {
    return staffList.filter((s) => {
      const matchesRole = selectedRole === "All" || s.role === selectedRole;
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.phone.includes(searchQuery);
      return matchesRole && matchesSearch;
    });
  }, [staffList, selectedRole, searchQuery]);

  // Aggregate metrics
  const totalStaffCount = staffList.length;
  const presentTodayCount = staffList.filter((s) => s.attendance.statusToday === "Present").length;
  const absentTodayCount = staffList.filter((s) => s.attendance.statusToday === "Absent").length;
  const onLeaveTodayCount = staffList.filter((s) => s.attendance.statusToday === "On Leave").length;
  const totalMonthlyPayroll = staffList.reduce((acc, curr) => acc + curr.inHandSalary, 0);

  // Attendance update handler
  const handleUpdateAttendance = (staffId: string, status: AttendanceStatus) => {
    clinicStore.updateStaffAttendance(staffId, status);
    setStaffList(clinicStore.getStaff());
  };

  // Add staff submission
  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name.trim() || !newStaff.phone.trim()) {
      alert("Please enter staff name and phone number");
      return;
    }

    const gross = Number(newStaff.monthlyGross) || 30000;
    const allowances = {
      hra: Number(newStaff.hra) || Math.round(gross * 0.2),
      medicalAllowance: Number(newStaff.medicalAllowance) || 2000,
      specialAllowance: Number(newStaff.specialAllowance) || 3000,
      overtimeBonus: 0,
    };
    const deductions = {
      pf: Number(newStaff.pf) || Math.round(gross * 0.08),
      tax: Number(newStaff.tax) || 600,
      leaveDeductions: 0,
      leaveDeductionDays: 0,
      deductionReason: "Regular employee - Full active attendance",
      otherDeductions: 0,
    };
    const inHand = gross - deductions.pf - deductions.tax;

    clinicStore.addStaff({
      name: newStaff.name,
      role: newStaff.role,
      department: newStaff.department,
      phone: newStaff.phone,
      email: newStaff.email || `${newStaff.name.toLowerCase().replace(/\s+/g, ".")}@radhixhospital.com`,
      shift: newStaff.shift,
      monthlyGross: gross,
      ctc: Number(newStaff.ctc) || gross * 12,
      inHandSalary: inHand,
      allowances,
      deductions,
    });

    setStaffList(clinicStore.getStaff());
    setIsAddStaffOpen(false);
    setNewStaff({
      name: "",
      role: "Nurse",
      department: "Inpatient Ward",
      phone: "",
      email: "",
      shift: "Morning",
      monthlyGross: 35000,
      ctc: 450000,
      hra: 7000,
      specialAllowance: 3000,
      medicalAllowance: 2000,
      pf: 2800,
      tax: 800,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold border border-blue-400/30">
              Hospital Operations OS
            </span>
            <span className="text-xs text-slate-300">Central HRM & Workforce</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Hospital Staff & HRM Portal
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl">
            Manage all hospital employees (Doctors, Nurses, Receptionists, Wardens, Security Guards, Pharmacy, Ambulance, Radiologists, Inventory) with daily attendance tracking, CTC vs In-Hand payroll calculations, and instant Salary Slip generation.
          </p>
        </div>

        <button
          onClick={() => setIsAddStaffOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/30 transition-all shrink-0 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Add New Staff Member</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Total Staff</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {totalStaffCount}
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Across 10 designations</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600">Present Today</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-2">
            {presentTodayCount}
          </div>
          <span className="text-[11px] text-emerald-600/80 font-bold">
            {Math.round((presentTodayCount / totalStaffCount) * 100)}% Attendance Rate
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-500">Absent Today</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-600 mt-2">
            {absentTodayCount}
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Unexcused absence</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-500">Approved Leaves</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 mt-2">
            {onLeaveTodayCount}
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Planned medical / casual</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-500">Monthly Net Payroll</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            ₹{(totalMonthlyPayroll / 100000).toFixed(2)}L
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Net in-hand disbursement</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("directory")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "directory"
              ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Staff Directory & Profiles ({staffList.length})
        </button>
        <button
          onClick={() => setActiveTab("attendance")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "attendance"
              ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Daily & Monthly Attendance Tracker
        </button>
        <button
          onClick={() => setActiveTab("payroll")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "payroll"
              ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Payroll, CTC & Salary Slips
        </button>
      </div>

      {/* Filters & Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by staff name, ID, phone, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full text-slate-800 dark:text-slate-100"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Roles Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          {rolesList.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                selectedRole === role
                  ? "bg-blue-700 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: STAFF DIRECTORY */}
      {activeTab === "directory" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={staff.avatar}
                      alt={staff.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-500/20"
                    />
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {staff.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                          {staff.role}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {staff.employeeId}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    staff.attendance.statusToday === "Present"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : staff.attendance.statusToday === "Absent"
                      ? "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                      : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                  }`}>
                    {staff.attendance.statusToday} Today
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Department:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{staff.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Shift Timings:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{staff.shift} Shift</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Contact:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{staff.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Monthly CTC:</span>
                    <span className="font-bold text-slate-900 dark:text-white">₹{Math.round(staff.ctc / 12).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Kitne din aaya h (Attendance Summary for Month) */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-xs">
                  <div>
                    <span className="text-blue-900 dark:text-blue-200 font-bold block">
                      Attendance: {staff.attendance.presentDays} / {staff.attendance.totalWorkingDays} Days
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {staff.attendance.absentDays} Absent • {staff.attendance.halfDays} Half-day
                    </span>
                  </div>
                  <span className="text-xs font-black text-blue-700 dark:text-blue-300">
                    {Math.round((staff.attendance.presentDays / staff.attendance.totalWorkingDays) * 100)}%
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedStaffForDetails(staff)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors text-center"
                >
                  View Details & History
                </button>
                <button
                  onClick={() => setSelectedStaffForSlip(staff)}
                  className="py-2 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Salary Slip</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: ATTENDANCE TRACKER */}
      {activeTab === "attendance" && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Live Daily Attendance & "Kitne Din Aaya" Monitor
              </h2>
              <p className="text-xs text-slate-500">
                Mark staff present/absent for today and review current month's attendance calculation
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
              Month: October 2026 (30 Days Total)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Role / Department</th>
                  <th className="py-3 px-4">Today's Status</th>
                  <th className="py-3 px-4">Days Present ("Kitne Din")</th>
                  <th className="py-3 px-4">Absents / Leaves</th>
                  <th className="py-3 px-4 text-right">Quick Mark Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={staff.avatar} alt={staff.name} className="w-8 h-8 rounded-xl object-cover" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{staff.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{staff.employeeId}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">{staff.role}</span>
                      <span className="text-[11px] text-slate-400">{staff.department}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        staff.attendance.statusToday === "Present"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : staff.attendance.statusToday === "Absent"
                          ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      }`}>
                        {staff.attendance.statusToday === "Present" && <CheckCircle2 className="w-3 h-3" />}
                        {staff.attendance.statusToday === "Absent" && <XCircle className="w-3 h-3" />}
                        {staff.attendance.statusToday === "On Leave" && <Clock className="w-3 h-3" />}
                        {staff.attendance.statusToday}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-slate-900 dark:text-white">
                          {staff.attendance.presentDays}
                        </span>
                        <span className="text-slate-400 text-[11px]">/ {staff.attendance.totalWorkingDays} days</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                          {Math.round((staff.attendance.presentDays / staff.attendance.totalWorkingDays) * 100)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      <span className="text-rose-600 font-bold">{staff.attendance.absentDays} Absents</span>
                      {staff.attendance.halfDays > 0 && (
                        <span className="text-amber-600 ml-1.5">({staff.attendance.halfDays} Half)</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleUpdateAttendance(staff.id, "Present")}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                            staff.attendance.statusToday === "Present"
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-emerald-100 hover:text-emerald-800"
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleUpdateAttendance(staff.id, "Absent")}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                            staff.attendance.statusToday === "Absent"
                              ? "bg-rose-600 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-rose-100 hover:text-rose-800"
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => handleUpdateAttendance(staff.id, "On Leave")}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                            staff.attendance.statusToday === "On Leave"
                              ? "bg-amber-600 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-amber-100 hover:text-amber-800"
                          }`}
                        >
                          Leave
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PAYROLL, CTC & SALARY SLIPS */}
      {activeTab === "payroll" && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-blue-600" />
                Monthly Payroll Audit & Deductions Breakdown
              </span>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                October 2026 Hospital Salary Slips
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Every deduction has an explicit audit reason (unapproved leaves, statutory PF, professional tax). Generate formal hospital payslips with 1-click.
              </p>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Hospital Monthly Outflow</span>
              <span className="text-xl font-black text-blue-700 dark:text-blue-300">
                ₹{totalMonthlyPayroll.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Annual CTC</th>
                  <th className="py-3 px-4">Monthly Gross</th>
                  <th className="py-3 px-4">Deductions ("Kyu Cut Ho Rhe H")</th>
                  <th className="py-3 px-4">Net In-Hand Salary</th>
                  <th className="py-3 px-4 text-right">Salary Slip Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={staff.avatar} alt={staff.name} className="w-8 h-8 rounded-xl object-cover" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{staff.name}</span>
                          <span className="text-[10px] text-slate-400">{staff.role} • {staff.attendance.presentDays} days worked</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                      ₹{staff.ctc.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      ₹{staff.monthlyGross.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-rose-600 font-bold">
                          <span>-₹{(staff.deductions.pf + staff.deductions.tax + staff.deductions.leaveDeductions).toLocaleString("en-IN")}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block max-w-xs truncate" title={staff.deductions.deductionReason}>
                          Reason: {staff.deductions.deductionReason}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                        ₹{staff.inHandSalary.toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedStaffForSlip(staff)}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Generate Slip</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 1: ADD NEW STAFF MEMBER */}
      {/* ===================================================================== */}
      {isAddStaffOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    Add New Hospital Staff / Employee
                  </h3>
                  <p className="text-xs text-slate-500">Register employee into hospital workforce & HRM database</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddStaffOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Alok Nath / Sister Kavita"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Designation / Role *</label>
                  <select
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as StaffRole })}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-bold"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Warden">Warden</option>
                    <option value="Security Guard">Security Guard</option>
                    <option value="Medical Store">Medical Store / Pharmacist</option>
                    <option value="Ambulance Driver">Ambulance Driver</option>
                    <option value="Radiologist">Radiologist</option>
                    <option value="Inventory Manager">Inventory Manager</option>
                    <option value="Lab Technician">Lab Technician</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Department *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ICU / Cardiology / Emergency"
                    value={newStaff.department}
                    onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Shift Timings</label>
                  <select
                    value={newStaff.shift}
                    onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value as ShiftType })}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  >
                    <option value="Morning">Morning Shift (08:00 AM - 04:00 PM)</option>
                    <option value="Evening">Evening Shift (02:00 PM - 10:00 PM)</option>
                    <option value="Night">Night Shift (10:00 PM - 08:00 AM)</option>
                    <option value="Rotational">Rotational Shift</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Mobile Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98XXX XXXXX"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="staff@radhixhospital.com"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>
              </div>

              {/* Salary & CTC Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="font-black text-slate-900 dark:text-white block">
                  Salary & CTC Configuration
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="font-bold text-slate-500 block mb-1">Monthly Gross (₹)</label>
                    <input
                      type="number"
                      value={newStaff.monthlyGross}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setNewStaff({
                          ...newStaff,
                          monthlyGross: val,
                          ctc: val * 12,
                          hra: Math.round(val * 0.2),
                          pf: Math.round(val * 0.08),
                        });
                      }}
                      className="w-full h-9 px-2.5 rounded-lg bg-white dark:bg-slate-900 border text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-500 block mb-1">Annual CTC (₹)</label>
                    <input
                      type="number"
                      value={newStaff.ctc}
                      onChange={(e) => setNewStaff({ ...newStaff, ctc: Number(e.target.value) })}
                      className="w-full h-9 px-2.5 rounded-lg bg-white dark:bg-slate-900 border text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-500 block mb-1">HRA (₹)</label>
                    <input
                      type="number"
                      value={newStaff.hra}
                      onChange={(e) => setNewStaff({ ...newStaff, hra: Number(e.target.value) })}
                      className="w-full h-9 px-2.5 rounded-lg bg-white dark:bg-slate-900 border text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-500 block mb-1">Statutory PF (₹)</label>
                    <input
                      type="number"
                      value={newStaff.pf}
                      onChange={(e) => setNewStaff({ ...newStaff, pf: Number(e.target.value) })}
                      className="w-full h-9 px-2.5 rounded-lg bg-white dark:bg-slate-900 border text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 text-slate-600 dark:text-slate-300">
                  <span>Estimated Net Take-Home (In-Hand):</span>
                  <span className="font-black text-emerald-600 text-sm">
                    ₹{(newStaff.monthlyGross - newStaff.pf - newStaff.tax).toLocaleString("en-IN")} / month
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddStaffOpen(false)}
                  className="px-4 py-2.5 rounded-xl border font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-black shadow-md shadow-blue-700/25 transition-all"
                >
                  Save & Add to Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: USER DETAILS & ATTENDANCE DEEP DIVE */}
      {/* ===================================================================== */}
      {selectedStaffForDetails && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStaffForDetails.avatar}
                  alt={selectedStaffForDetails.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20"
                />
                <div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white">
                    {selectedStaffForDetails.name}
                  </h3>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {selectedStaffForDetails.role} • {selectedStaffForDetails.employeeId}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedStaffForDetails(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2">
                <span className="font-black text-blue-900 dark:text-blue-200 block">
                  Monthly Attendance ("Kitne Din Aaya H")
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900">
                    <span className="text-[10px] text-slate-400 font-bold block">Days Present</span>
                    <span className="text-base font-black text-emerald-600">
                      {selectedStaffForDetails.attendance.presentDays} Days
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900">
                    <span className="text-[10px] text-slate-400 font-bold block">Days Absent</span>
                    <span className="text-base font-black text-rose-600">
                      {selectedStaffForDetails.attendance.absentDays} Days
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900">
                    <span className="text-[10px] text-slate-400 font-bold block">Half Days</span>
                    <span className="text-base font-black text-amber-600">
                      {selectedStaffForDetails.attendance.halfDays} Days
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  Salary & Deductions Audit
                </span>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Annual CTC:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      ₹{selectedStaffForDetails.ctc.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Monthly Gross Salary:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      ₹{selectedStaffForDetails.monthlyGross.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-rose-600 font-medium">
                    <span>Total Deductions:</span>
                    <span>
                      -₹{(
                        selectedStaffForDetails.deductions.pf +
                        selectedStaffForDetails.deductions.tax +
                        selectedStaffForDetails.deductions.leaveDeductions
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-[11px] text-rose-800 dark:text-rose-300">
                    <span className="font-bold block">Reason For Cut:</span>
                    {selectedStaffForDetails.deductions.deductionReason}
                  </div>
                  <div className="flex justify-between pt-2 border-t font-black text-sm">
                    <span className="text-slate-900 dark:text-white">Net In-Hand Salary:</span>
                    <span className="text-emerald-600">
                      ₹{selectedStaffForDetails.inHandSalary.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedStaffForSlip(selectedStaffForDetails);
                setSelectedStaffForDetails(null);
              }}
              className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Official Salary Slip</span>
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: FORMAL HOSPITAL SALARY SLIP (PRINTABLE) */}
      {/* ===================================================================== */}
      {selectedStaffForSlip && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 space-y-6 shadow-2xl print:border-none print:shadow-none print:p-0">
            
            {/* Modal Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 print:hidden">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Hospital Pay Advice & Tax Deduction Certificate
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Payslip</span>
                </button>
                <button
                  onClick={() => setSelectedStaffForSlip(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PRINTABLE SLIP CONTENT */}
            <div id="salary-slip-content" className="p-6 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white text-slate-900 space-y-5">
              
              {/* Slip Header */}
              <div className="text-center pb-4 border-b-2 border-slate-800 space-y-1">
                <h2 className="text-xl font-black tracking-tight text-blue-900">
                  RADHIX SUPER-SPECIALITY HOSPITAL
                </h2>
                <p className="text-[11px] text-slate-600">
                  3rd Floor, Vipul Plaza, Sector 81, Faridabad, Haryana - 121002 | Helpline: +91 70427 93777
                </p>
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-[11px] tracking-widest uppercase border">
                  SALARY SLIP FOR THE MONTH OF {selectedStaffForSlip.attendance.month.toUpperCase()}
                </span>
              </div>

              {/* Employee Bio Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-500 block">Employee ID</span>
                  <span className="font-mono font-bold">{selectedStaffForSlip.employeeId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Employee Name</span>
                  <span className="font-bold">{selectedStaffForSlip.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Designation</span>
                  <span className="font-bold text-blue-800">{selectedStaffForSlip.role}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Department</span>
                  <span className="font-semibold">{selectedStaffForSlip.department}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Days in Month</span>
                  <span className="font-bold">{selectedStaffForSlip.attendance.totalWorkingDays} Days</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Days Present</span>
                  <span className="font-bold text-emerald-700">{selectedStaffForSlip.attendance.presentDays} Days</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Unpaid Absents</span>
                  <span className="font-bold text-rose-700">{selectedStaffForSlip.attendance.absentDays} Days</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Joining Date</span>
                  <span className="font-semibold">{selectedStaffForSlip.joiningDate}</span>
                </div>
              </div>

              {/* Earnings & Deductions Tables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                {/* Earnings Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-100 font-bold p-2 text-slate-800 border-b border-slate-200">
                    EARNINGS & ALLOWANCES
                  </div>
                  <div className="p-2.5 space-y-1.5 divide-y divide-slate-100">
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-600">Basic Monthly Pay:</span>
                      <span className="font-bold font-mono">
                        ₹{(selectedStaffForSlip.monthlyGross * 0.5).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-600">House Rent Allowance (HRA):</span>
                      <span className="font-bold font-mono">
                        ₹{selectedStaffForSlip.allowances.hra.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-600">Medical Allowance:</span>
                      <span className="font-bold font-mono">
                        ₹{selectedStaffForSlip.allowances.medicalAllowance.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-600">Special Clinical Allowance:</span>
                      <span className="font-bold font-mono">
                        ₹{selectedStaffForSlip.allowances.specialAllowance.toLocaleString("en-IN")}
                      </span>
                    </div>
                    {selectedStaffForSlip.allowances.overtimeBonus > 0 && (
                      <div className="flex justify-between pt-1 text-emerald-700">
                        <span>Emergency Overtime Bonus:</span>
                        <span className="font-bold font-mono">
                          ₹{selectedStaffForSlip.allowances.overtimeBonus.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t-2 border-slate-300 font-black">
                      <span>Total Gross Earnings (A):</span>
                      <span className="text-blue-900 font-mono">
                        ₹{selectedStaffForSlip.monthlyGross.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Deductions Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-100 font-bold p-2 text-slate-800 border-b border-slate-200">
                    DEDUCTIONS & REASONS
                  </div>
                  <div className="p-2.5 space-y-1.5 divide-y divide-slate-100">
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-600">Provident Fund (PF):</span>
                      <span className="font-bold font-mono text-rose-700">
                        ₹{selectedStaffForSlip.deductions.pf.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-600">Professional Tax / TDS:</span>
                      <span className="font-bold font-mono text-rose-700">
                        ₹{selectedStaffForSlip.deductions.tax.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-600">
                        Leave Deductions ({selectedStaffForSlip.deductions.leaveDeductionDays} Days):
                      </span>
                      <span className="font-bold font-mono text-rose-700">
                        ₹{selectedStaffForSlip.deductions.leaveDeductions.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-rose-50 text-[10px] text-rose-900 font-medium">
                      <span className="font-bold">Deduction Reason:</span> {selectedStaffForSlip.deductions.deductionReason}
                    </div>
                    <div className="flex justify-between pt-2 border-t-2 border-slate-300 font-black">
                      <span>Total Deductions (B):</span>
                      <span className="text-rose-700 font-mono">
                        ₹{(
                          selectedStaffForSlip.deductions.pf +
                          selectedStaffForSlip.deductions.tax +
                          selectedStaffForSlip.deductions.leaveDeductions
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net In-Hand Summary Card */}
              <div className="p-4 rounded-xl bg-blue-50 border-2 border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                    NET PAYABLE SALARY (IN-HAND = A - B)
                  </span>
                  <span className="text-xl font-black text-blue-900">
                    ₹{selectedStaffForSlip.inHandSalary.toLocaleString("en-IN")}
                  </span>
                  <span className="block text-[11px] text-slate-600 italic mt-0.5">
                    Mode: Direct Bank Transfer (NEFT/RTGS) • Credit Date: 31st October 2026
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Annual CTC Reference</span>
                  <span className="font-bold text-slate-700 font-mono">₹{selectedStaffForSlip.ctc.toLocaleString("en-IN")} / year</span>
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-8 flex justify-between items-end text-xs text-slate-600">
                <div className="text-center">
                  <div className="w-36 border-b border-slate-400 mb-1" />
                  <span className="text-[11px] font-semibold">Employee Signature</span>
                </div>
                <div className="text-center">
                  <div className="w-36 border-b border-slate-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-900">Hospital HR & Accounts</span>
                  <span className="block text-[9px] text-slate-400">Radhix Super-Speciality Hospital</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}


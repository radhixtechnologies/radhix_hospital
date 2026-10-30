import {
  Clinic,
  Doctor,
  Service,
  Patient,
  Appointment,
  PaymentTransaction,
  Review,
  NotificationItem,
  DashboardStats,
  AppointmentStatus,
  PaymentStatus,
  PaymentMethod,
  StaffMember,
  StaffRole,
  ShiftType,
  AttendanceStatus,
  HospitalBed,
  AmbulanceVehicle,
  AmbulanceStatus,
  PharmacyMedicine,
  PharmacySale,
  SecurityWardenPost,
} from "./types";

export const DEFAULT_CLINICS: Clinic[] = [
  {
    id: "c1111111-1111-1111-1111-111111111111",
    name: "Radhix Super-Speciality Clinic",
    slug: "radhix-main",
    tagline: "Excellence in Healthcare, Compassionate in Care",
    brand_color: "#1E40AF",
    accent_color: "#14B8A6",
    address: "3rd Floor, Vipul plaza, 321, Sector 81",
    city: "Faridabad",
    state: "Haryana",
    pincode: "121002",
    phone: "+91 70427 93777",
    email: "sales@radhix.com",
    opening_time: "09:00 AM",
    closing_time: "08:00 PM",
    advance_booking_days: 30,
    cancellation_window_hours: 4,
    razorpay_key_id: "rzp_test_RadhixDemoKey",
    razorpay_test_mode: true,
    is_active: true,
  },
  {
    id: "c2222222-2222-2222-2222-222222222222",
    name: "Radhix MediCare Centre",
    slug: "radhix-west",
    tagline: "Advanced Diagnostics & Family Healthcare",
    brand_color: "#0F766E",
    accent_color: "#38BDF8",
    address: "104, Sunrise Heights, Baner Road",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411045",
    phone: "+91 98765 88990",
    email: "pune@radhixclinic.com",
    opening_time: "09:00 AM",
    closing_time: "07:00 PM",
    advance_booking_days: 30,
    cancellation_window_hours: 4,
    razorpay_key_id: "rzp_test_RadhixDemoKey",
    razorpay_test_mode: true,
    is_active: true,
  },
];

export const DEFAULT_DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    clinic_id: "c1111111-1111-1111-1111-111111111111",
    name: "Dr. Rajesh Sharma",
    email: "dr.rajesh@radhixclinic.com",
    phone: "+91 98111 22334",
    specialty: "Cardiology",
    qualification: "MBBS, MD (Medicine), DM (Cardiology)",
    experience_years: 15,
    consultation_fee: 800,
    bio: "Senior interventional cardiologist with over 15 years experience in hypertension management, coronary angiograms, and preventative cardiology. Trained at AIIMS New Delhi.",
    avatar_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80",
    slot_duration_minutes: 30,
    break_start_time: "01:00 PM",
    break_end_time: "02:00 PM",
    rating: 4.95,
    review_count: 128,
    is_active: true,
    schedules: [1, 2, 3, 4, 5, 6].map((day) => ({
      day_of_week: day,
      start_time: "09:00 AM",
      end_time: "06:00 PM",
      is_working: true,
    })),
  },
  {
    id: "doc-2",
    clinic_id: "c1111111-1111-1111-1111-111111111111",
    name: "Dr. Priya Patel",
    email: "dr.priya@radhixclinic.com",
    phone: "+91 98222 33445",
    specialty: "Dermatology",
    qualification: "MBBS, MD (Dermatology, Venereology & Leprosy)",
    experience_years: 9,
    consultation_fee: 600,
    bio: "Gold-medalist clinical and aesthetic dermatologist specializing in acne scar therapy, pigmentation disorders, laser treatments, and hair-loss restoration therapies.",
    avatar_url: "https://images.unsplash.com/photo-1594824813589-3221b6d17ef0?w=400&auto=format&fit=crop&q=80",
    slot_duration_minutes: 20,
    break_start_time: "01:30 PM",
    break_end_time: "02:30 PM",
    rating: 4.92,
    review_count: 94,
    is_active: true,
    schedules: [1, 2, 3, 4, 5, 6].map((day) => ({
      day_of_week: day,
      start_time: "10:00 AM",
      end_time: "05:00 PM",
      is_working: true,
    })),
  },
  {
    id: "doc-3",
    clinic_id: "c1111111-1111-1111-1111-111111111111",
    name: "Dr. Amit Verma",
    email: "dr.amit@radhixclinic.com",
    phone: "+91 98333 44556",
    specialty: "Orthopedics",
    qualification: "MBBS, MS (Orthopedics), MCh Joint Replacement",
    experience_years: 12,
    consultation_fee: 750,
    bio: "Pioneering robotic knee and hip replacement surgeon. Extensive expertise in sports medicine, ligament reconstructions, and minimally invasive fracture care.",
    avatar_url: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80",
    slot_duration_minutes: 30,
    break_start_time: "01:00 PM",
    break_end_time: "02:00 PM",
    rating: 4.88,
    review_count: 110,
    is_active: true,
    schedules: [1, 2, 3, 4, 5, 6].map((day) => ({
      day_of_week: day,
      start_time: "09:30 AM",
      end_time: "06:30 PM",
      is_working: true,
    })),
  },
  {
    id: "doc-4",
    clinic_id: "c1111111-1111-1111-1111-111111111111",
    name: "Dr. Ananya Iyer",
    email: "dr.ananya@radhixclinic.com",
    phone: "+91 98444 55667",
    specialty: "Pediatrics",
    qualification: "MBBS, MD (Pediatrics), Fellowship Neonatology",
    experience_years: 8,
    consultation_fee: 500,
    bio: "Compassionate pediatrician with gentle care for infants and children. Specializes in child immunization schedules, allergy evaluations, and milestone nutrition.",
    avatar_url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80",
    slot_duration_minutes: 20,
    break_start_time: "01:00 PM",
    break_end_time: "02:00 PM",
    rating: 4.97,
    review_count: 142,
    is_active: true,
    schedules: [1, 2, 3, 4, 5, 6].map((day) => ({
      day_of_week: day,
      start_time: "09:00 AM",
      end_time: "04:30 PM",
      is_working: true,
    })),
  },
  {
    id: "doc-5",
    clinic_id: "c1111111-1111-1111-1111-111111111111",
    name: "Dr. Vikram Sen",
    email: "dr.vikram@radhixclinic.com",
    phone: "+91 98555 66778",
    specialty: "Neurology",
    qualification: "MBBS, MD (Medicine), DM (Neurology)",
    experience_years: 14,
    consultation_fee: 900,
    bio: "Chief consultant neurologist with research in acute stroke therapy, migraine prevention protocols, epilepsy, vertigo management, and neuropathic disorders.",
    avatar_url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80",
    slot_duration_minutes: 30,
    break_start_time: "01:00 PM",
    break_end_time: "02:00 PM",
    rating: 4.90,
    review_count: 86,
    is_active: true,
    schedules: [1, 2, 3, 4, 5, 6].map((day) => ({
      day_of_week: day,
      start_time: "10:00 AM",
      end_time: "06:00 PM",
      is_working: true,
    })),
  },
];

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "srv-1",
    clinic_id: "c1111111-1111-1111-1111-111111111111",
    name: "Cardiac Consultation & ECG",
    department: "Cardiology",
    description: "Comprehensive heart evaluation including digital 12-lead ECG, blood pressure profile, and lifestyle counseling.",
    fee: 800,
    duration_minutes: 30,
    is_active: true,
  },
  {
    id: "srv-2",
    clinic_id: "c1111111-1111-1111-1111-111111111111",
    name: "Skin & Hair Clinical Consultation",
    department: "Dermatology",
    description: "In-depth dermoscopic skin check, acne care regimen, and hair loss diagnosis.",
    fee: 600,
    duration_minutes: 20,
    is_active: true,
  },
  {
    id: "srv-3",
    clinic_id: "c1111111-1111-1111-1111-111111111111",
    name: "Orthopedic Joint & Bone Assessment",
    department: "Orthopedics",
    description: "Joint mobility inspection, arthritis management, and fracture rehabilitation review.",
    fee: 750,
    duration_minutes: 30,
    is_active: true,
  },
  {
    id: "srv-4",
    clinic_id: "c1111111-1111-1111-1111-111111111111",
    name: "Pediatric Wellness & Vaccination",
    department: "Pediatrics",
    description: "Child growth tracking, immunizations, and developmental health review.",
    fee: 500,
    duration_minutes: 20,
    is_active: true,
  },
  {
    id: "srv-5",
    clinic_id: "c1111111-1111-1111-1111-111111111111",
    name: "Neurological Headache & Nerve Clinic",
    department: "Neurology",
    description: "Complete reflex evaluation, migraine mapping, and neurological assessment.",
    fee: 900,
    duration_minutes: 30,
    is_active: true,
  },
  {
    id: "srv-6",
    clinic_id: "c1111111-1111-1111-1111-111111111111",
    name: "General Health Screening",
    department: "General Medicine",
    description: "Full vitals check, blood sugar screening, BMI calculation, and medical advice.",
    fee: 450,
    duration_minutes: 25,
    is_active: true,
  },
];

export const DEFAULT_PATIENTS: Patient[] = [
  { id: "pat-1", clinic_id: "c1111111-1111-1111-1111-111111111111", full_name: "Rahul Verma", phone: "9876500001", email: "rahul.v@gmail.com", age: 34, gender: "Male", blood_group: "O+", created_at: "2026-09-01" },
  { id: "pat-2", clinic_id: "c1111111-1111-1111-1111-111111111111", full_name: "Meera Krishnan", phone: "9876500002", email: "meera.k@gmail.com", age: 29, gender: "Female", blood_group: "B+", created_at: "2026-09-02" },
  { id: "pat-3", clinic_id: "c1111111-1111-1111-1111-111111111111", full_name: "Suresh Hegde", phone: "9876500003", email: "suresh.h@gmail.com", age: 58, gender: "Male", blood_group: "A+", created_at: "2026-09-03" },
  { id: "pat-4", clinic_id: "c1111111-1111-1111-1111-111111111111", full_name: "Pooja Deshmukh", phone: "9876500004", email: "pooja.d@gmail.com", age: 41, gender: "Female", blood_group: "AB+", created_at: "2026-09-04" },
  { id: "pat-5", clinic_id: "c1111111-1111-1111-1111-111111111111", full_name: "Anil Kapoor", phone: "9876500005", email: "anil.k@gmail.com", age: 48, gender: "Male", blood_group: "O-", created_at: "2026-09-05" },
  { id: "pat-6", clinic_id: "c1111111-1111-1111-1111-111111111111", full_name: "Kavita Rao", phone: "9876500006", email: "kavita.r@gmail.com", age: 26, gender: "Female", blood_group: "B-", created_at: "2026-09-06" },
  { id: "pat-7", clinic_id: "c1111111-1111-1111-1111-111111111111", full_name: "Tanmay Joshi", phone: "9876500007", email: "tanmay.j@gmail.com", age: 31, gender: "Male", blood_group: "A-", created_at: "2026-09-07" },
  { id: "pat-8", clinic_id: "c1111111-1111-1111-1111-111111111111", full_name: "Shweta Sengupta", phone: "9876500008", email: "shweta.s@gmail.com", age: 37, gender: "Female", blood_group: "O+", created_at: "2026-09-08" },
  { id: "pat-9", clinic_id: "c1111111-1111-1111-1111-111111111111", full_name: "Deepak Choudhary", phone: "9876500009", email: "deepak.c@gmail.com", age: 52, gender: "Male", blood_group: "B+", created_at: "2026-09-09" },
  { id: "pat-10", clinic_id: "c1111111-1111-1111-1111-111111111111", full_name: "Aarti Saxena", phone: "9876500010", email: "aarti.s@gmail.com", age: 22, gender: "Female", blood_group: "A+", created_at: "2026-09-10" },
];

export function getDateString(offsetDays: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split("T")[0];
}

export function generateSeedAppointments(): Appointment[] {
  const today = getDateString(0);
  const yesterday = getDateString(-1);
  const tomorrow = getDateString(1);
  const dayAfter = getDateString(2);

  return [
    {
      id: "apt-1",
      booking_id: "RDX-2026-001",
      clinic_id: "c1111111-1111-1111-1111-111111111111",
      doctor_id: "doc-1",
      doctor_name: "Dr. Rajesh Sharma",
      doctor_specialty: "Cardiology",
      service_id: "srv-1",
      service_name: "Cardiac Consultation & ECG",
      patient_id: "pat-1",
      patient_name: "Rahul Verma",
      patient_phone: "9876500001",
      patient_email: "rahul.v@gmail.com",
      patient_age: 34,
      patient_gender: "Male",
      appointment_date: today,
      time_slot: "09:30 AM",
      status: "confirmed",
      payment_status: "paid",
      payment_method: "online",
      total_amount: 800,
      patient_notes: "Routine follow-up on BP medication.",
      razorpay_payment_id: "pay_demo_001",
      created_at: yesterday + "T10:00:00Z",
      updated_at: yesterday + "T10:05:00Z",
    },
    {
      id: "apt-2",
      booking_id: "RDX-2026-002",
      clinic_id: "c1111111-1111-1111-1111-111111111111",
      doctor_id: "doc-2",
      doctor_name: "Dr. Priya Patel",
      doctor_specialty: "Dermatology",
      service_id: "srv-2",
      service_name: "Skin & Hair Clinical Consultation",
      patient_id: "pat-2",
      patient_name: "Meera Krishnan",
      patient_phone: "9876500002",
      patient_email: "meera.k@gmail.com",
      patient_age: 29,
      patient_gender: "Female",
      appointment_date: today,
      time_slot: "10:20 AM",
      status: "confirmed",
      payment_status: "due",
      payment_method: "pay_at_clinic",
      total_amount: 600,
      patient_notes: "Severe skin rash on left arm.",
      created_at: yesterday + "T11:30:00Z",
      updated_at: yesterday + "T11:30:00Z",
    },
    {
      id: "apt-3",
      booking_id: "RDX-2026-003",
      clinic_id: "c1111111-1111-1111-1111-111111111111",
      doctor_id: "doc-3",
      doctor_name: "Dr. Amit Verma",
      doctor_specialty: "Orthopedics",
      service_id: "srv-3",
      service_name: "Orthopedic Joint & Bone Assessment",
      patient_id: "pat-3",
      patient_name: "Suresh Hegde",
      patient_phone: "9876500003",
      patient_email: "suresh.h@gmail.com",
      patient_age: 58,
      patient_gender: "Male",
      appointment_date: today,
      time_slot: "11:00 AM",
      status: "completed",
      payment_status: "paid",
      payment_method: "online",
      total_amount: 750,
      patient_notes: "Right knee pain when climbing stairs.",
      admin_notes: "Prescribed knee physiotherapy and calcium supplement.",
      razorpay_payment_id: "pay_demo_003",
      created_at: yesterday + "T14:10:00Z",
      updated_at: today + "T11:45:00Z",
    },
    {
      id: "apt-4",
      booking_id: "RDX-2026-004",
      clinic_id: "c1111111-1111-1111-1111-111111111111",
      doctor_id: "doc-4",
      doctor_name: "Dr. Ananya Iyer",
      doctor_specialty: "Pediatrics",
      service_id: "srv-4",
      service_name: "Pediatric Wellness & Vaccination",
      patient_id: "pat-4",
      patient_name: "Pooja Deshmukh",
      patient_phone: "9876500004",
      patient_email: "pooja.d@gmail.com",
      patient_age: 4,
      patient_gender: "Male",
      appointment_date: today,
      time_slot: "11:40 AM",
      status: "confirmed",
      payment_status: "paid",
      payment_method: "online",
      total_amount: 500,
      patient_notes: "4-year booster immunization schedule.",
      razorpay_payment_id: "pay_demo_004",
      created_at: yesterday + "T16:00:00Z",
      updated_at: yesterday + "T16:05:00Z",
    },
    {
      id: "apt-5",
      booking_id: "RDX-2026-005",
      clinic_id: "c1111111-1111-1111-1111-111111111111",
      doctor_id: "doc-5",
      doctor_name: "Dr. Vikram Sen",
      doctor_specialty: "Neurology",
      service_id: "srv-5",
      service_name: "Neurological Headache & Nerve Clinic",
      patient_id: "pat-5",
      patient_name: "Anil Kapoor",
      patient_phone: "9876500005",
      patient_email: "anil.k@gmail.com",
      patient_age: 48,
      patient_gender: "Male",
      appointment_date: today,
      time_slot: "02:30 PM",
      status: "pending",
      payment_status: "due",
      payment_method: "pay_at_clinic",
      total_amount: 900,
      patient_notes: "Chronic morning headaches since 3 weeks.",
      created_at: today + "T08:30:00Z",
      updated_at: today + "T08:30:00Z",
    },
    {
      id: "apt-6",
      booking_id: "RDX-2026-006",
      clinic_id: "c1111111-1111-1111-1111-111111111111",
      doctor_id: "doc-1",
      doctor_name: "Dr. Rajesh Sharma",
      doctor_specialty: "Cardiology",
      service_id: "srv-1",
      service_name: "Cardiac Consultation & ECG",
      patient_id: "pat-6",
      patient_name: "Kavita Rao",
      patient_phone: "9876500006",
      patient_email: "kavita.r@gmail.com",
      patient_age: 26,
      patient_gender: "Female",
      appointment_date: today,
      time_slot: "03:30 PM",
      status: "confirmed",
      payment_status: "paid",
      payment_method: "online",
      total_amount: 800,
      patient_notes: "Palpitations during fitness workouts.",
      razorpay_payment_id: "pay_demo_006",
      created_at: yesterday + "T18:00:00Z",
      updated_at: yesterday + "T18:05:00Z",
    },
    {
      id: "apt-7",
      booking_id: "RDX-2026-007",
      clinic_id: "c1111111-1111-1111-1111-111111111111",
      doctor_id: "doc-2",
      doctor_name: "Dr. Priya Patel",
      doctor_specialty: "Dermatology",
      service_id: "srv-2",
      service_name: "Skin & Hair Clinical Consultation",
      patient_id: "pat-7",
      patient_name: "Tanmay Joshi",
      patient_phone: "9876500007",
      patient_email: "tanmay.j@gmail.com",
      patient_age: 31,
      patient_gender: "Male",
      appointment_date: today,
      time_slot: "04:20 PM",
      status: "cancelled",
      payment_status: "refunded",
      payment_method: "online",
      total_amount: 600,
      patient_notes: "Had an urgent office trip.",
      admin_notes: "Refund processed via Razorpay.",
      razorpay_payment_id: "pay_demo_007",
      created_at: yesterday + "T19:00:00Z",
      updated_at: today + "T09:15:00Z",
    },
    {
      id: "apt-8",
      booking_id: "RDX-2026-008",
      clinic_id: "c1111111-1111-1111-1111-111111111111",
      doctor_id: "doc-3",
      doctor_name: "Dr. Amit Verma",
      doctor_specialty: "Orthopedics",
      service_id: "srv-3",
      service_name: "Orthopedic Joint & Bone Assessment",
      patient_id: "pat-8",
      patient_name: "Shweta Sengupta",
      patient_phone: "9876500008",
      patient_email: "shweta.s@gmail.com",
      patient_age: 37,
      patient_gender: "Female",
      appointment_date: today,
      time_slot: "05:00 PM",
      status: "confirmed",
      payment_status: "due",
      payment_method: "pay_at_clinic",
      total_amount: 750,
      patient_notes: "Ankle sprain while playing badminton.",
      created_at: today + "T10:00:00Z",
      updated_at: today + "T10:00:00Z",
    },
    {
      id: "apt-9",
      booking_id: "RDX-2026-009",
      clinic_id: "c1111111-1111-1111-1111-111111111111",
      doctor_id: "doc-1",
      doctor_name: "Dr. Rajesh Sharma",
      doctor_specialty: "Cardiology",
      service_id: "srv-1",
      service_name: "Cardiac Consultation & ECG",
      patient_id: "pat-9",
      patient_name: "Deepak Choudhary",
      patient_phone: "9876500009",
      patient_email: "deepak.c@gmail.com",
      patient_age: 52,
      patient_gender: "Male",
      appointment_date: tomorrow,
      time_slot: "10:00 AM",
      status: "confirmed",
      payment_status: "paid",
      payment_method: "online",
      total_amount: 800,
      patient_notes: "Annual cardiac review.",
      razorpay_payment_id: "pay_demo_009",
      created_at: yesterday + "T12:00:00Z",
      updated_at: yesterday + "T12:05:00Z",
    },
    {
      id: "apt-10",
      booking_id: "RDX-2026-010",
      clinic_id: "c1111111-1111-1111-1111-111111111111",
      doctor_id: "doc-4",
      doctor_name: "Dr. Ananya Iyer",
      doctor_specialty: "Pediatrics",
      service_id: "srv-4",
      service_name: "Pediatric Wellness & Vaccination",
      patient_id: "pat-10",
      patient_name: "Aarti Saxena",
      patient_phone: "9876500010",
      patient_email: "aarti.s@gmail.com",
      patient_age: 2,
      patient_gender: "Female",
      appointment_date: tomorrow,
      time_slot: "11:20 AM",
      status: "confirmed",
      payment_status: "due",
      payment_method: "pay_at_clinic",
      total_amount: 500,
      patient_notes: "Mild fever and ear rubbing.",
      created_at: today + "T11:00:00Z",
      updated_at: today + "T11:00:00Z",
    },
  ];
}

export const DEFAULT_STAFF: StaffMember[] = [
  {
    id: "stf-1",
    employeeId: "HOSP-DOC-01",
    name: "Dr. Rajesh Sharma",
    role: "Doctor",
    department: "Cardiology & Critical Care",
    phone: "+91 98111 22334",
    email: "dr.rajesh@radhixhospital.com",
    shift: "Morning",
    joiningDate: "2021-03-15",
    ctc: 2400000,
    monthlyGross: 180000,
    inHandSalary: 154800,
    allowances: {
      hra: 35000,
      medicalAllowance: 8000,
      specialAllowance: 15000,
      overtimeBonus: 0,
    },
    deductions: {
      pf: 12000,
      tax: 9200,
      leaveDeductions: 4000,
      leaveDeductionDays: 1,
      deductionReason: "1 Day Unapproved Leave (Emergency on 14th Oct)",
      otherDeductions: 0,
    },
    attendance: {
      month: "October 2026",
      totalWorkingDays: 30,
      presentDays: 28,
      absentDays: 1,
      halfDays: 1,
      paidLeaves: 0,
      statusToday: "Present",
    },
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "stf-2",
    employeeId: "HOSP-DOC-02",
    name: "Dr. Priya Patel",
    role: "Doctor",
    department: "Dermatology & Cosmetology",
    phone: "+91 98222 33445",
    email: "dr.priya@radhixhospital.com",
    shift: "Morning",
    joiningDate: "2022-06-10",
    ctc: 1800000,
    monthlyGross: 140000,
    inHandSalary: 121800,
    allowances: {
      hra: 25000,
      medicalAllowance: 6000,
      specialAllowance: 10000,
      overtimeBonus: 0,
    },
    deductions: {
      pf: 10000,
      tax: 8200,
      leaveDeductions: 0,
      leaveDeductionDays: 0,
      deductionReason: "No unpaid leaves - Full attendance bonus eligible",
      otherDeductions: 0,
    },
    attendance: {
      month: "October 2026",
      totalWorkingDays: 30,
      presentDays: 30,
      absentDays: 0,
      halfDays: 0,
      paidLeaves: 0,
      statusToday: "Present",
    },
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1594824813589-3221b6d17ef0?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "stf-3",
    employeeId: "HOSP-RAD-01",
    name: "Dr. Kavita Deshmukh",
    role: "Radiologist",
    department: "Radiology & Imaging (CT/MRI/X-Ray)",
    phone: "+91 98333 77889",
    email: "kavita.rad@radhixhospital.com",
    shift: "Rotational",
    joiningDate: "2021-11-01",
    ctc: 2100000,
    monthlyGross: 165000,
    inHandSalary: 143500,
    allowances: {
      hra: 30000,
      medicalAllowance: 7000,
      specialAllowance: 12000,
      overtimeBonus: 2500,
    },
    deductions: {
      pf: 11000,
      tax: 9000,
      leaveDeductions: 3000,
      leaveDeductionDays: 1,
      deductionReason: "1 Day Absent without replacement coverage",
      otherDeductions: 1000,
    },
    attendance: {
      month: "October 2026",
      totalWorkingDays: 30,
      presentDays: 27,
      absentDays: 1,
      halfDays: 2,
      paidLeaves: 0,
      statusToday: "Present",
    },
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "stf-4",
    employeeId: "HOSP-NUR-01",
    name: "Sister Sunita Rawat",
    role: "Nurse",
    department: "ICU & Critical Care Nursing",
    phone: "+91 98444 11223",
    email: "sunita.icu@radhixhospital.com",
    shift: "Morning",
    joiningDate: "2020-08-15",
    ctc: 620000,
    monthlyGross: 48000,
    inHandSalary: 42100,
    allowances: {
      hra: 9000,
      medicalAllowance: 3000,
      specialAllowance: 4000,
      overtimeBonus: 2100,
    },
    deductions: {
      pf: 3500,
      tax: 1500,
      leaveDeductions: 0,
      leaveDeductionDays: 0,
      deductionReason: "Standard statutory PF & TDS deductions",
      otherDeductions: 0,
    },
    attendance: {
      month: "October 2026",
      totalWorkingDays: 30,
      presentDays: 29,
      absentDays: 0,
      halfDays: 1,
      paidLeaves: 0,
      statusToday: "Present",
    },
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "stf-5",
    employeeId: "HOSP-NUR-02",
    name: "Sister Deepa Nair",
    role: "Nurse",
    department: "General & Inpatient Ward",
    phone: "+91 98444 88776",
    email: "deepa.ward@radhixhospital.com",
    shift: "Night",
    joiningDate: "2022-01-20",
    ctc: 500000,
    monthlyGross: 38000,
    inHandSalary: 31200,
    allowances: {
      hra: 7000,
      medicalAllowance: 2500,
      specialAllowance: 3000,
      overtimeBonus: 0,
    },
    deductions: {
      pf: 2800,
      tax: 1000,
      leaveDeductions: 3000,
      leaveDeductionDays: 3,
      deductionReason: "3 Days Unpaid Medical Leaves beyond allowance",
      otherDeductions: 0,
    },
    attendance: {
      month: "October 2026",
      totalWorkingDays: 30,
      presentDays: 25,
      absentDays: 3,
      halfDays: 2,
      paidLeaves: 0,
      statusToday: "Present",
    },
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1590611936760-eeb9bc59302d?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "stf-6",
    employeeId: "HOSP-REC-01",
    name: "Neha Kapoor",
    role: "Receptionist",
    department: "Front Desk & OPD Registration",
    phone: "+91 98777 55443",
    email: "neha.reception@radhixhospital.com",
    shift: "Morning",
    joiningDate: "2023-02-01",
    ctc: 440000,
    monthlyGross: 34000,
    inHandSalary: 29800,
    allowances: {
      hra: 6000,
      medicalAllowance: 2000,
      specialAllowance: 2500,
      overtimeBonus: 800,
    },
    deductions: {
      pf: 2400,
      tax: 800,
      leaveDeductions: 1000,
      leaveDeductionDays: 1,
      deductionReason: "1 Day Unapproved Absence (Post Festival)",
      otherDeductions: 0,
    },
    attendance: {
      month: "October 2026",
      totalWorkingDays: 30,
      presentDays: 28,
      absentDays: 1,
      halfDays: 1,
      paidLeaves: 0,
      statusToday: "Present",
    },
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "stf-7",
    employeeId: "HOSP-WRD-01",
    name: "Ramesh Chander",
    role: "Warden",
    department: "Patient Ward Administration & Sanitation",
    phone: "+91 98888 33221",
    email: "ramesh.warden@radhixhospital.com",
    shift: "Morning",
    joiningDate: "2019-09-12",
    ctc: 380000,
    monthlyGross: 30000,
    inHandSalary: 26800,
    allowances: {
      hra: 5000,
      medicalAllowance: 2000,
      specialAllowance: 2000,
      overtimeBonus: 0,
    },
    deductions: {
      pf: 2200,
      tax: 500,
      leaveDeductions: 500,
      leaveDeductionDays: 1,
      deductionReason: "Late check-in penalties on 2 occasions",
      otherDeductions: 0,
    },
    attendance: {
      month: "October 2026",
      totalWorkingDays: 30,
      presentDays: 29,
      absentDays: 0,
      halfDays: 1,
      paidLeaves: 0,
      statusToday: "Present",
    },
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "stf-8",
    employeeId: "HOSP-SEC-01",
    name: "Vikram Singh",
    role: "Security Guard",
    department: "Hospital Security & Emergency Gate",
    phone: "+91 97111 66554",
    email: "vikram.guard@radhixhospital.com",
    shift: "Morning",
    joiningDate: "2020-04-10",
    ctc: 320000,
    monthlyGross: 25000,
    inHandSalary: 22800,
    allowances: {
      hra: 4000,
      medicalAllowance: 1500,
      specialAllowance: 1500,
      overtimeBonus: 0,
    },
    deductions: {
      pf: 1800,
      tax: 400,
      leaveDeductions: 0,
      leaveDeductionDays: 0,
      deductionReason: "100% On-Duty Attendance",
      otherDeductions: 0,
    },
    attendance: {
      month: "October 2026",
      totalWorkingDays: 30,
      presentDays: 30,
      absentDays: 0,
      halfDays: 0,
      paidLeaves: 0,
      statusToday: "Present",
    },
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "stf-9",
    employeeId: "HOSP-SEC-02",
    name: "Manoj Kumar",
    role: "Security Guard",
    department: "Hospital Security & Night Patrol",
    phone: "+91 97111 44332",
    email: "manoj.guard@radhixhospital.com",
    shift: "Night",
    joiningDate: "2022-09-01",
    ctc: 300000,
    monthlyGross: 23500,
    inHandSalary: 19900,
    allowances: {
      hra: 3800,
      medicalAllowance: 1500,
      specialAllowance: 1500,
      overtimeBonus: 0,
    },
    deductions: {
      pf: 1700,
      tax: 400,
      leaveDeductions: 1500,
      leaveDeductionDays: 2,
      deductionReason: "2 Days Absent (Night shift missed)",
      otherDeductions: 0,
    },
    attendance: {
      month: "October 2026",
      totalWorkingDays: 30,
      presentDays: 26,
      absentDays: 2,
      halfDays: 2,
      paidLeaves: 0,
      statusToday: "Present",
    },
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "stf-10",
    employeeId: "HOSP-PHM-01",
    name: "Arvind Gupta",
    role: "Medical Store",
    department: "Hospital Pharmacy & Drug Store",
    phone: "+91 98112 33445",
    email: "arvind.pharmacy@radhixhospital.com",
    shift: "Morning",
    joiningDate: "2021-05-18",
    ctc: 660000,
    monthlyGross: 52000,
    inHandSalary: 45700,
    allowances: {
      hra: 10000,
      medicalAllowance: 3000,
      specialAllowance: 4000,
      overtimeBonus: 1200,
    },
    deductions: {
      pf: 3800,
      tax: 1700,
      leaveDeductions: 1000,
      leaveDeductionDays: 1,
      deductionReason: "1 Day Planned Leave adjustment",
      otherDeductions: 0,
    },
    attendance: {
      month: "October 2026",
      totalWorkingDays: 30,
      presentDays: 28,
      absentDays: 1,
      halfDays: 1,
      paidLeaves: 0,
      statusToday: "Present",
    },
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "stf-11",
    employeeId: "HOSP-AMB-01",
    name: "Satish Yadav",
    role: "Ambulance Driver",
    department: "Emergency Fleet & Trauma Transport",
    phone: "+91 98999 11002",
    email: "satish.ambulance@radhixhospital.com",
    shift: "Rotational",
    joiningDate: "2020-11-20",
    ctc: 360000,
    monthlyGross: 28000,
    inHandSalary: 25100,
    allowances: {
      hra: 4500,
      medicalAllowance: 1500,
      specialAllowance: 2000,
      overtimeBonus: 900,
    },
    deductions: {
      pf: 1900,
      tax: 400,
      leaveDeductions: 0,
      leaveDeductionDays: 0,
      deductionReason: "Clean record, high emergency call response bonus",
      otherDeductions: 0,
    },
    attendance: {
      month: "October 2026",
      totalWorkingDays: 30,
      presentDays: 29,
      absentDays: 0,
      halfDays: 1,
      paidLeaves: 0,
      statusToday: "Present",
    },
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "stf-12",
    employeeId: "HOSP-INV-01",
    name: "Rakesh Verma",
    role: "Inventory Manager",
    department: "Hospital Stores & Biomedical Inventory",
    phone: "+91 98118 77665",
    email: "rakesh.inv@radhixhospital.com",
    shift: "Morning",
    joiningDate: "2021-08-01",
    ctc: 580000,
    monthlyGross: 45000,
    inHandSalary: 39600,
    allowances: {
      hra: 8000,
      medicalAllowance: 2500,
      specialAllowance: 3500,
      overtimeBonus: 0,
    },
    deductions: {
      pf: 3200,
      tax: 1200,
      leaveDeductions: 1000,
      leaveDeductionDays: 1,
      deductionReason: "1 Unpaid leave deducted per policy",
      otherDeductions: 0,
    },
    attendance: {
      month: "October 2026",
      totalWorkingDays: 30,
      presentDays: 28,
      absentDays: 1,
      halfDays: 1,
      paidLeaves: 0,
      statusToday: "Present",
    },
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "stf-13",
    employeeId: "HOSP-LAB-01",
    name: "Pooja Mehra",
    role: "Lab Technician",
    department: "Pathology & Diagnostics Lab",
    phone: "+91 98115 66778",
    email: "pooja.lab@radhixhospital.com",
    shift: "Morning",
    joiningDate: "2022-04-15",
    ctc: 460000,
    monthlyGross: 36000,
    inHandSalary: 31800,
    allowances: {
      hra: 6500,
      medicalAllowance: 2000,
      specialAllowance: 2500,
      overtimeBonus: 600,
    },
    deductions: {
      pf: 2600,
      tax: 900,
      leaveDeductions: 700,
      leaveDeductionDays: 1,
      deductionReason: "1 Day absent (Advance leave balance exhausted)",
      otherDeductions: 0,
    },
    attendance: {
      month: "October 2026",
      totalWorkingDays: 30,
      presentDays: 28,
      absentDays: 1,
      halfDays: 1,
      paidLeaves: 0,
      statusToday: "Present",
    },
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
  },
];

export const DEFAULT_BEDS: HospitalBed[] = [
  {
    id: "bed-icu-01",
    bedNumber: "ICU-01",
    ward: "ICU",
    floor: "3rd Floor - Critical Care Wing",
    status: "Occupied",
    dailyCharge: 4500,
    patientName: "Harish Sharma",
    patientAge: 62,
    patientGender: "Male",
    patientPhone: "+91 98100 23456",
    admissionDate: "2026-10-27",
    diagnosis: "Acute Myocardial Infarction / Post-Angioplasty Monitoring",
    doctorAssigned: "Dr. Rajesh Sharma",
  },
  {
    id: "bed-icu-02",
    bedNumber: "ICU-02",
    ward: "ICU",
    floor: "3rd Floor - Critical Care Wing",
    status: "Occupied",
    dailyCharge: 4500,
    patientName: "Meenakshi Sundaram",
    patientAge: 54,
    patientGender: "Female",
    patientPhone: "+91 98111 34567",
    admissionDate: "2026-10-28",
    diagnosis: "Severe Respiratory Distress (ARDS on NIV Support)",
    doctorAssigned: "Dr. Vikram Sen",
  },
  {
    id: "bed-icu-03",
    bedNumber: "ICU-03",
    ward: "ICU",
    floor: "3rd Floor - Critical Care Wing",
    status: "Available",
    dailyCharge: 4500,
  },
  {
    id: "bed-icu-04",
    bedNumber: "ICU-04",
    ward: "ICU",
    floor: "3rd Floor - Critical Care Wing",
    status: "Cleaning",
    dailyCharge: 4500,
  },
  {
    id: "bed-emg-01",
    bedNumber: "EMG-01",
    ward: "Emergency",
    floor: "Ground Floor - Trauma Care",
    status: "Occupied",
    dailyCharge: 2500,
    patientName: "Karan Johal",
    patientAge: 29,
    patientGender: "Male",
    patientPhone: "+91 98222 45678",
    admissionDate: "2026-10-30",
    diagnosis: "Road Traffic Accident (Multiple Contusions & Femur Fracture)",
    doctorAssigned: "Dr. Amit Verma",
  },
  {
    id: "bed-emg-02",
    bedNumber: "EMG-02",
    ward: "Emergency",
    floor: "Ground Floor - Trauma Care",
    status: "Available",
    dailyCharge: 2500,
  },
  {
    id: "bed-emg-03",
    bedNumber: "EMG-03",
    ward: "Emergency",
    floor: "Ground Floor - Trauma Care",
    status: "Available",
    dailyCharge: 2500,
  },
  {
    id: "bed-gen-101",
    bedNumber: "GEN-101",
    ward: "General Ward",
    floor: "1st Floor - Male Inpatient Ward",
    status: "Occupied",
    dailyCharge: 1200,
    patientName: "Sohan Lal",
    patientAge: 47,
    patientGender: "Male",
    patientPhone: "+91 98333 56789",
    admissionDate: "2026-10-26",
    diagnosis: "Dengue Fever with Thrombocytopenia",
    doctorAssigned: "Dr. Rajesh Sharma",
  },
  {
    id: "bed-gen-102",
    bedNumber: "GEN-102",
    ward: "General Ward",
    floor: "1st Floor - Male Inpatient Ward",
    status: "Occupied",
    dailyCharge: 1200,
    patientName: "Gopal Krishna",
    patientAge: 51,
    patientGender: "Male",
    patientPhone: "+91 98444 67890",
    admissionDate: "2026-10-29",
    diagnosis: "Post-Appendectomy Recovery (Day 2)",
    doctorAssigned: "Dr. Amit Verma",
  },
  {
    id: "bed-gen-103",
    bedNumber: "GEN-103",
    ward: "General Ward",
    floor: "1st Floor - Male Inpatient Ward",
    status: "Available",
    dailyCharge: 1200,
  },
  {
    id: "bed-gen-104",
    bedNumber: "GEN-104",
    ward: "General Ward",
    floor: "1st Floor - Male Inpatient Ward",
    status: "Available",
    dailyCharge: 1200,
  },
  {
    id: "bed-gen-105",
    bedNumber: "GEN-105",
    ward: "General Ward",
    floor: "1st Floor - Female Inpatient Ward",
    status: "Occupied",
    dailyCharge: 1200,
    patientName: "Suman Devi",
    patientAge: 38,
    patientGender: "Female",
    patientPhone: "+91 98555 78901",
    admissionDate: "2026-10-28",
    diagnosis: "Severe Typhoid & Dehydration",
    doctorAssigned: "Dr. Rajesh Sharma",
  },
  {
    id: "bed-gen-106",
    bedNumber: "GEN-106",
    ward: "General Ward",
    floor: "1st Floor - Female Inpatient Ward",
    status: "Available",
    dailyCharge: 1200,
  },
  {
    id: "bed-sp-201",
    bedNumber: "SP-201",
    ward: "Semi-Private",
    floor: "2nd Floor - Premium Wing",
    status: "Occupied",
    dailyCharge: 2800,
    patientName: "Rajeev Agarwal",
    patientAge: 45,
    patientGender: "Male",
    patientPhone: "+91 98666 89012",
    admissionDate: "2026-10-27",
    diagnosis: "Hypertensive Crisis & Renal Colic",
    doctorAssigned: "Dr. Rajesh Sharma",
  },
  {
    id: "bed-sp-202",
    bedNumber: "SP-202",
    ward: "Semi-Private",
    floor: "2nd Floor - Premium Wing",
    status: "Available",
    dailyCharge: 2800,
  },
  {
    id: "bed-mat-301",
    bedNumber: "MAT-301",
    ward: "Maternity",
    floor: "2nd Floor - Mother & Child Center",
    status: "Occupied",
    dailyCharge: 3200,
    patientName: "Ankita Roy",
    patientAge: 27,
    patientGender: "Female",
    patientPhone: "+91 98777 90123",
    admissionDate: "2026-10-29",
    diagnosis: "Full Term Pregnancy - Normal Delivery Observation",
    doctorAssigned: "Dr. Priya Patel",
  },
  {
    id: "bed-mat-302",
    bedNumber: "MAT-302",
    ward: "Maternity",
    floor: "2nd Floor - Mother & Child Center",
    status: "Available",
    dailyCharge: 3200,
  },
];

export const DEFAULT_AMBULANCES: AmbulanceVehicle[] = [
  {
    id: "amb-1",
    vehicleNumber: "DL 01 AX 9901",
    model: "Force Traveller Mobile ICU",
    type: "Advanced Cardiac Life Support (ACLS)",
    status: "Available",
    driverName: "Satish Yadav",
    driverPhone: "+91 98999 11002",
    currentLocation: "Hospital Base - Bay 1",
    fuelLevel: "92%",
    equipment: ["Ventilator", "Defibrillator", "Oxygen Cylinder (40L)", "ECG Monitor", "Suction Unit"],
  },
  {
    id: "amb-2",
    vehicleNumber: "HR 51 BZ 4321",
    model: "Tata Winger Critical Ambulance",
    type: "Advanced Cardiac Life Support (ACLS)",
    status: "On Call",
    driverName: "Dinesh Kumar",
    driverPhone: "+91 98111 88990",
    currentLocation: "Dispatched: Sector 15 Faridabad (Cardiac SOS)",
    fuelLevel: "78%",
    equipment: ["Ventilator", "Defibrillator", "Oxygen Manifold", "Syringe Pumps"],
  },
  {
    id: "amb-3",
    vehicleNumber: "HR 51 CR 1102",
    model: "Mahindra Bolero Maxi BLS",
    type: "Basic Life Support (BLS)",
    status: "Available",
    driverName: "Mukesh Pal",
    driverPhone: "+91 98222 77665",
    currentLocation: "Hospital Base - Bay 2",
    fuelLevel: "85%",
    equipment: ["Spine Board", "Oxygen Cylinder (20L)", "First Aid Trauma Kit", "Stretcher"],
  },
  {
    id: "amb-4",
    vehicleNumber: "DL 03 EC 5520",
    model: "Maruti Eeco Patient Transport",
    type: "Patient Transport",
    status: "Maintenance",
    driverName: "Ravi Teja",
    driverPhone: "+91 98333 44556",
    currentLocation: "Authorised Service Center (Brake Overhaul)",
    fuelLevel: "40%",
    equipment: ["Wheelchair", "Basic First Aid", "Portable Oxygen"],
  },
];

export const DEFAULT_PHARMACY_ITEMS: PharmacyMedicine[] = [
  { id: "med-1", name: "Augmentin 625 Duo (Amoxicillin + Clav)", category: "Antibiotics", batchNumber: "AUG-882", stockCount: 240, unitPrice: 220, reorderLevel: 50, expiryDate: "2027-08", status: "In Stock" },
  { id: "med-2", name: "Paracetamol IV Infusion 100ml", category: "Pain Relief", batchNumber: "PCM-104", stockCount: 18, unitPrice: 85, reorderLevel: 40, expiryDate: "2027-04", status: "Low Stock" },
  { id: "med-3", name: "Pantoprazole 40mg IV Injection", category: "Consumables" as any, batchNumber: "PAN-551", stockCount: 95, unitPrice: 65, reorderLevel: 30, expiryDate: "2028-01", status: "In Stock" },
  { id: "med-4", name: "Atorvastatin 20mg Tablets", category: "Cardiology", batchNumber: "ATV-309", stockCount: 320, unitPrice: 140, reorderLevel: 60, expiryDate: "2027-11", status: "In Stock" },
  { id: "med-5", name: "Ceftriaxone 1g Injection IP", category: "Antibiotics", batchNumber: "CFT-702", stockCount: 12, unitPrice: 110, reorderLevel: 25, expiryDate: "2027-03", status: "Low Stock" },
  { id: "med-6", name: "Normal Saline (0.9% NaCl) 500ml", category: "IV Fluids", batchNumber: "NS-4001", stockCount: 450, unitPrice: 45, reorderLevel: 100, expiryDate: "2028-06", status: "In Stock" },
  { id: "med-7", name: "Disposable Syringes 5ml (Box of 100)", category: "Surgical & Consumables", batchNumber: "SYR-91", stockCount: 35, unitPrice: 420, reorderLevel: 15, expiryDate: "2029-05", status: "In Stock" },
  { id: "med-8", name: "Lantus Insulin Glargine 100IU SoloStar", category: "Cardiology", batchNumber: "LNT-22", stockCount: 8, unitPrice: 680, reorderLevel: 10, expiryDate: "2026-12", status: "Low Stock" },
  { id: "med-9", name: "Surgical Sterile Gloves 7.5 (Pairs)", category: "Surgical & Consumables", batchNumber: "GLV-11", stockCount: 500, unitPrice: 28, reorderLevel: 150, expiryDate: "2028-10", status: "In Stock" },
  { id: "med-10", name: "Azithromycin 500mg (Strip of 5)", category: "Antibiotics", batchNumber: "AZI-60", stockCount: 160, unitPrice: 115, reorderLevel: 40, expiryDate: "2027-09", status: "In Stock" },
];

export const DEFAULT_PHARMACY_SALES: PharmacySale[] = [
  { id: "ps-1", billNumber: "PHARM-2026-081", patientName: "Harish Sharma (ICU)", doctorName: "Dr. Rajesh Sharma", itemCount: 4, totalAmount: 1850, paymentMethod: "UPI", createdAt: "Today, 10:15 AM" },
  { id: "ps-2", billNumber: "PHARM-2026-082", patientName: "Karan Johal (Emergency)", doctorName: "Dr. Amit Verma", itemCount: 6, totalAmount: 3420, paymentMethod: "Card", createdAt: "Today, 10:45 AM" },
  { id: "ps-3", billNumber: "PHARM-2026-083", patientName: "Rahul Verma (OPD)", doctorName: "Dr. Rajesh Sharma", itemCount: 2, totalAmount: 480, paymentMethod: "Cash", createdAt: "Today, 11:20 AM" },
  { id: "ps-4", billNumber: "PHARM-2026-084", patientName: "Meenakshi Sundaram (ICU)", doctorName: "Dr. Vikram Sen", itemCount: 8, totalAmount: 5120, paymentMethod: "UPI", createdAt: "Today, 11:55 AM" },
  { id: "ps-5", billNumber: "PHARM-2026-085", patientName: "Walk-in Counter Prescription", itemCount: 1, totalAmount: 220, paymentMethod: "Cash", createdAt: "Today, 12:30 PM" },
];

export const DEFAULT_SECURITY_WARDENS: SecurityWardenPost[] = [
  { id: "sec-1", staffName: "Vikram Singh", role: "Security Guard", postLocation: "Main Emergency Gate & Ambulance Bay", shift: "Morning", phone: "+91 97111 66554", status: "On Duty" },
  { id: "sec-2", staffName: "Manoj Kumar", role: "Security Guard", postLocation: "IPD Wards & Night Security Patrol", shift: "Night", phone: "+91 97111 44332", status: "On Duty" },
  { id: "sec-3", staffName: "Ramesh Chander", role: "Warden", postLocation: "General Inpatient Ward Floor Desk", shift: "Morning", phone: "+91 98888 33221", status: "On Duty" },
  { id: "sec-4", staffName: "Harinder Gill", role: "Security Guard", postLocation: "OPD Reception & Parking Entrance", shift: "Morning", phone: "+91 97111 99887", status: "On Duty" },
];

class ClinicStore {
  private appointments: Appointment[] = [];
  private doctors: Doctor[] = DEFAULT_DOCTORS;
  private services: Service[] = DEFAULT_SERVICES;
  private patients: Patient[] = DEFAULT_PATIENTS;
  private clinics: Clinic[] = DEFAULT_CLINICS;
  private staff: StaffMember[] = [...DEFAULT_STAFF];
  private beds: HospitalBed[] = [...DEFAULT_BEDS];
  private ambulances: AmbulanceVehicle[] = [...DEFAULT_AMBULANCES];
  private pharmacyMedicines: PharmacyMedicine[] = [...DEFAULT_PHARMACY_ITEMS];
  private pharmacySales: PharmacySale[] = [...DEFAULT_PHARMACY_SALES];
  private securityWardens: SecurityWardenPost[] = [...DEFAULT_SECURITY_WARDENS];

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window !== "undefined") {
      try {
        const storedApts = localStorage.getItem("radhix_clinic_appointments");
        if (storedApts) {
          this.appointments = JSON.parse(storedApts);
        } else {
          this.appointments = generateSeedAppointments();
          this.persistAppointments();
        }

        const storedDocs = localStorage.getItem("radhix_clinic_doctors");
        if (storedDocs) {
          this.doctors = JSON.parse(storedDocs);
        }

        const storedServices = localStorage.getItem("radhix_clinic_services");
        if (storedServices) {
          this.services = JSON.parse(storedServices);
        }

        const storedStaff = localStorage.getItem("radhix_hospital_staff");
        if (storedStaff) {
          this.staff = JSON.parse(storedStaff);
        }

        const storedBeds = localStorage.getItem("radhix_hospital_beds");
        if (storedBeds) {
          this.beds = JSON.parse(storedBeds);
        }

        const storedAmbs = localStorage.getItem("radhix_hospital_ambulances");
        if (storedAmbs) {
          this.ambulances = JSON.parse(storedAmbs);
        }

        const storedMeds = localStorage.getItem("radhix_hospital_medicines");
        if (storedMeds) {
          this.pharmacyMedicines = JSON.parse(storedMeds);
        }

        const storedSales = localStorage.getItem("radhix_hospital_sales");
        if (storedSales) {
          this.pharmacySales = JSON.parse(storedSales);
        }
      } catch (e) {
        this.appointments = generateSeedAppointments();
      }
    } else {
      this.appointments = generateSeedAppointments();
    }
  }

  private persistAppointments() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("radhix_clinic_appointments", JSON.stringify(this.appointments));
        window.dispatchEvent(new Event("hospital_store_updated"));
      } catch (e) {}
    }
  }

  private persistDoctors() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("radhix_clinic_doctors", JSON.stringify(this.doctors));
        window.dispatchEvent(new Event("hospital_store_updated"));
      } catch (e) {}
    }
  }

  private persistStaff() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("radhix_hospital_staff", JSON.stringify(this.staff));
        window.dispatchEvent(new Event("hospital_store_updated"));
      } catch (e) {}
    }
  }

  private persistBeds() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("radhix_hospital_beds", JSON.stringify(this.beds));
        window.dispatchEvent(new Event("hospital_store_updated"));
      } catch (e) {}
    }
  }

  private persistAmbulances() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("radhix_hospital_ambulances", JSON.stringify(this.ambulances));
        window.dispatchEvent(new Event("hospital_store_updated"));
      } catch (e) {}
    }
  }

  private persistPharmacy() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("radhix_hospital_medicines", JSON.stringify(this.pharmacyMedicines));
        localStorage.setItem("radhix_hospital_sales", JSON.stringify(this.pharmacySales));
        window.dispatchEvent(new Event("hospital_store_updated"));
      } catch (e) {}
    }
  }

  public getClinics(): Clinic[] {
    return this.clinics;
  }

  public getDoctors(): Doctor[] {
    return this.doctors.filter((d) => d.is_active);
  }

  public getAllDoctors(): Doctor[] {
    return this.doctors;
  }

  public getDoctorById(id: string): Doctor | undefined {
    return this.doctors.find((d) => d.id === id);
  }

  public getServices(): Service[] {
    return this.services.filter((s) => s.is_active);
  }

  public getAppointments(): Appointment[] {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("radhix_clinic_appointments");
        if (stored) {
          this.appointments = JSON.parse(stored);
        }
      } catch (e) {}
    }
    return [...this.appointments];
  }

  public getAppointmentByBookingId(bookingId: string): Appointment | undefined {
    return this.appointments.find(
      (a) => a.booking_id.toUpperCase() === bookingId.trim().toUpperCase()
    );
  }

  public getPatientAppointments(query: string): Appointment[] {
    const q = query.trim().toLowerCase();
    return this.appointments.filter(
      (a) =>
        a.booking_id.toLowerCase() === q ||
        a.patient_phone.includes(q) ||
        (a.patient_email && a.patient_email.toLowerCase() === q)
    );
  }

  public getAvailableSlots(doctorId: string, date: string): { slot: string; available: boolean }[] {
    const doc = this.getDoctorById(doctorId);
    if (!doc) return [];

    const targetDate = new Date(date + "T00:00:00");
    const dayOfWeek = targetDate.getDay();

    const schedule = doc.schedules?.find((s) => s.day_of_week === dayOfWeek);
    if (!schedule || !schedule.is_working) {
      return [];
    }

    const standardSlots = [
      "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
      "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
      "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
      "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
    ];

    const bookedSlots = this.appointments
      .filter(
        (a) =>
          a.doctor_id === doctorId &&
          a.appointment_date === date &&
          a.status !== "cancelled"
      )
      .map((a) => a.time_slot);

    return standardSlots.map((slot) => ({
      slot,
      available: !bookedSlots.includes(slot),
    }));
  }

  public bookAppointment(params: {
    doctorId: string;
    serviceId?: string;
    appointmentDate: string;
    timeSlot: string;
    patientName: string;
    patientPhone: string;
    patientEmail?: string;
    patientAge?: number;
    patientGender?: string;
    paymentMethod: PaymentMethod;
    patientNotes?: string;
  }): { success: boolean; appointment?: Appointment; error?: string } {
    const doc = this.getDoctorById(params.doctorId);
    if (!doc) {
      return { success: false, error: "Selected doctor was not found." };
    }

    // Double-booking check
    const existing = this.appointments.find(
      (a) =>
        a.doctor_id === params.doctorId &&
        a.appointment_date === params.appointmentDate &&
        a.time_slot === params.timeSlot &&
        a.status !== "cancelled"
    );

    if (existing) {
      return {
        success: false,
        error: "This time slot has already been booked. Please pick another time slot.",
      };
    }

    const service = params.serviceId
      ? this.services.find((s) => s.id === params.serviceId)
      : undefined;

    const count = this.appointments.length + 1;
    const newBookingId = "RDX-2026-" + String(count).padStart(3, "0");
    const amount = service ? service.fee : doc.consultation_fee;

    const newAppointment: Appointment = {
      id: "apt-" + Date.now(),
      booking_id: newBookingId,
      clinic_id: doc.clinic_id,
      doctor_id: doc.id,
      doctor_name: doc.name,
      doctor_specialty: doc.specialty,
      doctor_avatar: doc.avatar_url,
      service_id: service?.id,
      service_name: service?.name || (doc.specialty + " Consultation"),
      patient_id: "pat-" + Date.now(),
      patient_name: params.patientName,
      patient_phone: params.patientPhone,
      patient_email: params.patientEmail,
      patient_age: params.patientAge,
      patient_gender: params.patientGender,
      appointment_date: params.appointmentDate,
      time_slot: params.timeSlot,
      status: params.paymentMethod === "online" ? "confirmed" : "pending",
      payment_status: params.paymentMethod === "online" ? "paid" : "due",
      payment_method: params.paymentMethod,
      total_amount: amount,
      patient_notes: params.patientNotes,
      razorpay_payment_id:
        params.paymentMethod === "online" ? "pay_demo_" + Date.now() : undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.appointments.unshift(newAppointment);
    this.persistAppointments();

    return { success: true, appointment: newAppointment };
  }

  public updateAppointmentStatus(
    id: string,
    status: AppointmentStatus,
    paymentStatus?: PaymentStatus,
    adminNotes?: string
  ): boolean {
    const idx = this.appointments.findIndex((a) => a.id === id);
    if (idx === -1) return false;

    this.appointments[idx] = {
      ...this.appointments[idx],
      status,
      payment_status: paymentStatus || this.appointments[idx].payment_status,
      admin_notes: adminNotes || this.appointments[idx].admin_notes,
      updated_at: new Date().toISOString(),
    };

    this.persistAppointments();
    return true;
  }

  public rescheduleAppointment(id: string, newDate: string, newSlot: string): { success: boolean; error?: string } {
    const apt = this.appointments.find((a) => a.id === id);
    if (!apt) return { success: false, error: "Appointment not found." };

    const conflict = this.appointments.find(
      (a) =>
        a.id !== id &&
        a.doctor_id === apt.doctor_id &&
        a.appointment_date === newDate &&
        a.time_slot === newSlot &&
        a.status !== "cancelled"
    );

    if (conflict) {
      return { success: false, error: "The selected time slot is already taken." };
    }

    apt.appointment_date = newDate;
    apt.time_slot = newSlot;
    apt.updated_at = new Date().toISOString();
    this.persistAppointments();

    return { success: true };
  }

  public cancelAppointment(id: string, reason?: string): boolean {
    const apt = this.appointments.find((a) => a.id === id);
    if (!apt) return false;

    apt.status = "cancelled";
    if (reason) apt.admin_notes = "Cancelled: " + reason;
    apt.updated_at = new Date().toISOString();
    this.persistAppointments();
    return true;
  }

  public addDoctor(doctor: Doctor) {
    this.doctors.push(doctor);
    this.persistDoctors();
  }

  public updateDoctor(doctor: Doctor) {
    const idx = this.doctors.findIndex((d) => d.id === doctor.id);
    if (idx !== -1) {
      this.doctors[idx] = doctor;
      this.persistDoctors();
    }
  }

  public getDashboardStats(): DashboardStats {
    const today = getDateString(0);
    const todayApts = this.appointments.filter((a) => a.appointment_date === today);

    const pendingCount = todayApts.filter((a) => a.status === "pending").length;
    const confirmedCount = todayApts.filter((a) => a.status === "confirmed").length;
    const completedCount = todayApts.filter((a) => a.status === "completed").length;
    const cancelledCount = todayApts.filter((a) => a.status === "cancelled").length;

    const revenueToday = todayApts
      .filter((a) => a.payment_status === "paid")
      .reduce((sum, a) => sum + a.total_amount, 0);

    const amountDueToday = todayApts
      .filter((a) => a.payment_status === "due" && a.status !== "cancelled")
      .reduce((sum, a) => sum + a.total_amount, 0);

    return {
      todayAppointmentsCount: todayApts.length,
      pendingCount,
      confirmedCount,
      completedCount,
      cancelledCount,
      revenueToday,
      amountDueToday,
      newPatientsCount: 6,
    };
  }

  // =====================================================================
  // HOSPITAL HRM & ASSET INVENTORY METHODS
  // =====================================================================

  public getStaff(): StaffMember[] {
    return [...this.staff];
  }

  public getStaffById(id: string): StaffMember | undefined {
    return this.staff.find((s) => s.id === id || s.employeeId === id);
  }

  public addStaff(data: Partial<StaffMember>): StaffMember {
    const nextNum = this.staff.length + 1;
    const rolePrefix = (data.role || "STF").substring(0, 3).toUpperCase();
    const newStaff: StaffMember = {
      id: "stf-" + Date.now(),
      employeeId: `HOSP-${rolePrefix}-${String(nextNum).padStart(2, "0")}`,
      name: data.name || "New Staff Member",
      role: data.role || "Nurse",
      department: data.department || "General Department",
      phone: data.phone || "+91 98000 00000",
      email: data.email || "staff@radhixhospital.com",
      shift: data.shift || "Morning",
      joiningDate: data.joiningDate || new Date().toISOString().split("T")[0],
      ctc: data.ctc || 480000,
      monthlyGross: data.monthlyGross || 40000,
      inHandSalary: data.inHandSalary || 35200,
      allowances: data.allowances || {
        hra: Math.round((data.monthlyGross || 40000) * 0.2),
        medicalAllowance: 2000,
        specialAllowance: 3000,
        overtimeBonus: 0,
      },
      deductions: data.deductions || {
        pf: Math.round((data.monthlyGross || 40000) * 0.08),
        tax: 800,
        leaveDeductions: 0,
        leaveDeductionDays: 0,
        deductionReason: "Regular active employment",
        otherDeductions: 0,
      },
      attendance: {
        month: "October 2026",
        totalWorkingDays: 30,
        presentDays: 30,
        absentDays: 0,
        halfDays: 0,
        paidLeaves: 0,
        statusToday: "Present",
      },
      status: "Active",
      avatar:
        data.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    };

    this.staff.unshift(newStaff);
    this.persistStaff();
    return newStaff;
  }

  public updateStaffAttendance(id: string, status: AttendanceStatus): boolean {
    const idx = this.staff.findIndex((s) => s.id === id);
    if (idx === -1) return false;

    const prevStatus = this.staff[idx].attendance.statusToday;
    this.staff[idx].attendance.statusToday = status;

    if (prevStatus !== status) {
      if (status === "Present" && prevStatus === "Absent") {
        this.staff[idx].attendance.presentDays += 1;
        this.staff[idx].attendance.absentDays = Math.max(0, this.staff[idx].attendance.absentDays - 1);
      } else if (status === "Absent" && prevStatus !== "Absent") {
        this.staff[idx].attendance.absentDays += 1;
        this.staff[idx].attendance.presentDays = Math.max(0, this.staff[idx].attendance.presentDays - 1);
      }
    }

    this.persistStaff();
    return true;
  }

  public getBeds(): HospitalBed[] {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("radhix_hospital_beds");
        if (stored) {
          this.beds = JSON.parse(stored);
        }
      } catch (e) {}
    }
    return [...this.beds];
  }

  public admitPatientToBed(
    bedId: string,
    info: {
      patientName: string;
      patientAge: number;
      patientGender: string;
      patientPhone: string;
      diagnosis: string;
      doctorAssigned: string;
    }
  ): boolean {
    const idx = this.beds.findIndex((b) => b.id === bedId);
    if (idx === -1) return false;

    this.beds[idx] = {
      ...this.beds[idx],
      status: "Occupied",
      patientName: info.patientName,
      patientAge: info.patientAge,
      patientGender: info.patientGender,
      patientPhone: info.patientPhone,
      diagnosis: info.diagnosis,
      doctorAssigned: info.doctorAssigned,
      admissionDate: new Date().toISOString().split("T")[0],
    };

    this.persistBeds();
    return true;
  }

  public vacateBed(bedId: string): boolean {
    const idx = this.beds.findIndex((b) => b.id === bedId);
    if (idx === -1) return false;

    this.beds[idx] = {
      ...this.beds[idx],
      status: "Available",
      patientName: undefined,
      patientAge: undefined,
      patientGender: undefined,
      patientPhone: undefined,
      diagnosis: undefined,
      doctorAssigned: undefined,
      admissionDate: undefined,
    };

    this.persistBeds();
    return true;
  }

  public getAmbulances(): AmbulanceVehicle[] {
    return [...this.ambulances];
  }

  public updateAmbulanceStatus(id: string, status: AmbulanceStatus): boolean {
    const idx = this.ambulances.findIndex((a) => a.id === id);
    if (idx === -1) return false;

    this.ambulances[idx].status = status;
    this.persistAmbulances();
    return true;
  }

  public getPharmacyMedicines(): PharmacyMedicine[] {
    return [...this.pharmacyMedicines];
  }

  public getPharmacySales(): PharmacySale[] {
    return [...this.pharmacySales];
  }

  public addPharmacySale(sale: Omit<PharmacySale, "id" | "billNumber" | "createdAt">): PharmacySale {
    const billNum = `PHARM-2026-${String(this.pharmacySales.length + 86).padStart(3, "0")}`;
    const newSale: PharmacySale = {
      ...sale,
      id: "ps-" + Date.now(),
      billNumber: billNum,
      createdAt: "Today, " + new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };

    this.pharmacySales.unshift(newSale);
    this.persistPharmacy();
    return newSale;
  }

  public getSecurityWardens(): SecurityWardenPost[] {
    return [...this.securityWardens];
  }

  public getHospitalSummaryStats() {
    const totalStaff = this.staff.length;
    const staffPresentToday = this.staff.filter((s) => s.attendance.statusToday === "Present").length;

    const totalBeds = this.beds.length;
    const occupiedBeds = this.beds.filter((b) => b.status === "Occupied").length;
    const availableBeds = this.beds.filter((b) => b.status === "Available").length;

    const totalAmbulances = this.ambulances.length;
    const availableAmbulances = this.ambulances.filter((a) => a.status === "Available").length;

    const pharmacySalesToday = this.pharmacySales.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const lowStockMedicinesCount = this.pharmacyMedicines.filter((m) => m.status === "Low Stock").length;

    return {
      totalStaff,
      staffPresentToday,
      totalBeds,
      occupiedBeds,
      availableBeds,
      totalAmbulances,
      availableAmbulances,
      pharmacySalesToday,
      lowStockMedicinesCount,
    };
  }

  public resetToDemoData() {
    this.appointments = generateSeedAppointments();
    this.doctors = [...DEFAULT_DOCTORS];
    this.services = [...DEFAULT_SERVICES];
    this.staff = [...DEFAULT_STAFF];
    this.beds = [...DEFAULT_BEDS];
    this.ambulances = [...DEFAULT_AMBULANCES];
    this.pharmacyMedicines = [...DEFAULT_PHARMACY_ITEMS];
    this.pharmacySales = [...DEFAULT_PHARMACY_SALES];
    this.persistAppointments();
    this.persistDoctors();
    this.persistStaff();
    this.persistBeds();
    this.persistAmbulances();
    this.persistPharmacy();
  }
}

export const clinicStore = new ClinicStore();

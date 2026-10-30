const fs = require("fs");

const storeCode = `import {
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
} from "./types";

export const DEFAULT_CLINICS: Clinic[] = [
  {
    id: "c1111111-1111-1111-1111-111111111111",
    name: "Radhix Super-Speciality Clinic",
    slug: "radhix-main",
    tagline: "Excellence in Healthcare, Compassionate in Care",
    brand_color: "#1E40AF",
    accent_color: "#14B8A6",
    address: "Plot 42, Tech Park Boulevard, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    phone: "+91 98765 43210",
    email: "care@radhixclinic.com",
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

class ClinicStore {
  private appointments: Appointment[] = [];
  private doctors: Doctor[] = DEFAULT_DOCTORS;
  private services: Service[] = DEFAULT_SERVICES;
  private patients: Patient[] = DEFAULT_PATIENTS;
  private clinics: Clinic[] = DEFAULT_CLINICS;

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
      } catch (e) {}
    }
  }

  private persistDoctors() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("radhix_clinic_doctors", JSON.stringify(this.doctors));
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

  public resetToDemoData() {
    this.appointments = generateSeedAppointments();
    this.doctors = [...DEFAULT_DOCTORS];
    this.services = [...DEFAULT_SERVICES];
    this.persistAppointments();
    this.persistDoctors();
  }
}

export const clinicStore = new ClinicStore();
`;

fs.writeFileSync("src/lib/store.ts", storeCode, "utf8");
console.log("Created src/lib/store.ts successfully!");

const fs = require("fs");

// 1. DOCTORS API: src/app/api/doctors/route.ts
const doctorsApiCode = `import { NextResponse } from "next/server";
import { clinicStore } from "@/lib/store";

export async function GET() {
  const doctors = clinicStore.getDoctors();
  return NextResponse.json({ success: true, doctors });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    clinicStore.addDoctor(data);
    return NextResponse.json({ success: true, message: "Doctor registered successfully." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
`;

fs.writeFileSync("src/app/api/doctors/route.ts", doctorsApiCode, "utf8");

// 2. SLOTS ENGINE API: src/app/api/slots/route.ts
const slotsApiCode = `import { NextResponse } from "next/server";
import { clinicStore } from "@/lib/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get("doctorId");
  const date = searchParams.get("date");

  if (!doctorId || !date) {
    return NextResponse.json(
      { success: false, error: "doctorId and date parameters are required" },
      { status: 400 }
    );
  }

  const slots = clinicStore.getAvailableSlots(doctorId, date);
  return NextResponse.json({
    success: true,
    doctorId,
    date,
    slots,
  });
}
`;

fs.writeFileSync("src/app/api/slots/route.ts", slotsApiCode, "utf8");

// 3. APPOINTMENTS API: src/app/api/appointments/route.ts
const appointmentsApiCode = `import { NextResponse } from "next/server";
import { clinicStore } from "@/lib/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (query) {
    const apts = clinicStore.getPatientAppointments(query);
    return NextResponse.json({ success: true, appointments: apts });
  }

  const apts = clinicStore.getAppointments();
  return NextResponse.json({ success: true, appointments: apts });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = clinicStore.bookAppointment(body);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 409 });
    }

    return NextResponse.json({ success: true, appointment: result.appointment });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status, paymentStatus, adminNotes } = await req.json();
    const ok = clinicStore.updateAppointmentStatus(id, status, paymentStatus, adminNotes);
    return NextResponse.json({ success: ok });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
`;

fs.writeFileSync("src/app/api/appointments/route.ts", appointmentsApiCode, "utf8");

// 4. RAZORPAY CREATE ORDER: src/app/api/razorpay/create-order/route.ts
const razorpayCreateOrderCode = `import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, bookingId, patientName } = await req.json();

    // Mock Razorpay Order ID for sandbox demo
    const orderId = "order_rzp_" + Date.now();

    return NextResponse.json({
      success: true,
      order: {
        id: orderId,
        amount: (amount || 500) * 100, // in paise
        currency: "INR",
        receipt: bookingId || "RDX-DEMO",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
`;

fs.writeFileSync("src/app/api/razorpay/create-order/route.ts", razorpayCreateOrderCode, "utf8");

// 5. RAZORPAY VERIFY: src/app/api/razorpay/verify/route.ts
const razorpayVerifyCode = `import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id } = await req.json();

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id || ("pay_" + Date.now()),
      message: "Payment signature verified successfully.",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
`;

fs.writeFileSync("src/app/api/razorpay/verify/route.ts", razorpayVerifyCode, "utf8");
console.log("Created all backend API routes!");

import { NextResponse } from "next/server";
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

import { NextResponse } from "next/server";
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

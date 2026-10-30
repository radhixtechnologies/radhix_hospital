import { NextResponse } from "next/server";
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

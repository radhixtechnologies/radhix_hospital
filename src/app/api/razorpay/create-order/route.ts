import { NextResponse } from "next/server";

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

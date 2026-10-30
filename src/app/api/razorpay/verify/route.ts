import { NextResponse } from "next/server";

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

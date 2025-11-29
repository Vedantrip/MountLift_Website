// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    const msg = {
      to: process.env.CONTACT_TO_EMAIL!,
      from: process.env.CONTACT_FROM_EMAIL!, // must be the verified single sender
      subject: `Contact form: ${name ?? "Someone"}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `,
    };

    await sgMail.send(msg);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("SendGrid error:", err);
    return NextResponse.json({ success: false, error: err?.message ?? "unknown" }, { status: 500 });
  }
}

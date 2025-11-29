// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// small helper to escape HTML (prevents injection)
function escapeHtml(str?: string) {
  if (!str) return "";
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body.name?.trim() || "No name";
    const email = body.email?.trim();
    const phone = body.phone?.trim() || "Not provided";
    const message = body.message?.trim() || "";

    // Basic validation
    if (!email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (email and message)." },
        { status: 400 }
      );
    }

    // Escape user input for safe HTML
    const escName = escapeHtml(name);
    const escEmail = escapeHtml(email);
    const escPhone = escapeHtml(phone);
    const escMessage = escapeHtml(message).replaceAll("\n", "<br/>");

    // HTML email to site owner (CONTACT_TO_EMAIL)
    const ownerHtml = `
      <div style="font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; line-height:1.5;">
        <div style="max-width:720px;margin:0 auto;padding:24px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;">
            <div style="width:46px;height:46px;border-radius:10px;background:#111;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;">ML</div>
            <div>
              <div style="font-size:16px;font-weight:700;">New Contact Form Submission</div>
              <div style="font-size:13px;color:#6b7280;margin-top:2px;">MountLift • ${new Date().toLocaleString()}</div>
            </div>
          </div>

          <div style="background:#fbfbfb;border:1px solid #eee;border-radius:12px;padding:18px;">
            <h3 style="margin:0 0 8px 0;font-size:15px;color:#111">Sender</h3>
            <p style="margin:0 0 12px 0;color:#374151"><strong>Name:</strong> ${escName}<br/>
            <strong>Email:</strong> ${escEmail}<br/>
            <strong>Phone:</strong> ${escPhone}</p>

            <h3 style="margin:0 0 8px 0;font-size:15px;color:#111">Message</h3>
            <div style="padding:12px;border-radius:8px;background:white;border:1px solid #f1f1f1;color:#111">${escMessage}</div>
          </div>

          <p style="margin-top:14px;font-size:13px;color:#6b7280">View more at your dashboard or reply directly to <a href="mailto:${escEmail}" style="color:#111;text-decoration:underline">${escEmail}</a>.</p>
        </div>
      </div>
    `;

    // Plain text fallback for owner
    const ownerText = `
New Contact Form Submission - MountLift
Time: ${new Date().toLocaleString()}

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
    `;

    // HTML confirmation email to sender
    const senderHtml = `
      <div style="font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; line-height:1.5;">
        <div style="max-width:720px;margin:0 auto;padding:24px;">
          <div style="background:linear-gradient(90deg,#111,#444);padding:18px;border-radius:10px;color:#fff">
            <h2 style="margin:0;font-size:20px">Thanks for contacting MountLift, ${escName.split(" ")[0] || "there"}!</h2>
            <p style="margin:6px 0 0 0;color:#ddd">We received your message and will get back within 24–48 hours.</p>
          </div>

          <div style="margin-top:16px;background:#fff;border:1px solid #eee;padding:16px;border-radius:8px;">
            <h3 style="margin:0 0 8px 0;font-size:15px;color:#111">Your message</h3>
            <div style="color:#374151">${escMessage}</div>
          </div>

          <p style="margin-top:14px;font-size:13px;color:#6b7280">If you need urgent help, reply to this email or call us.</p>

          <div style="margin-top:18px;font-size:13px;color:#9ca3af">MountLift — Elevating brands through authentic influencer partnerships</div>
        </div>
      </div>
    `;

    // Plain text fallback for sender
    const senderText = `Thanks for contacting MountLift, ${name}!

We got your message and will reply within 24-48 hours.

Your message:
${message}

— MountLift
`;

    // Message to owner
    const ownerMsg = {
      to: process.env.CONTACT_TO_EMAIL!,
      from: process.env.CONTACT_FROM_EMAIL!, // must be verified Single Sender
      subject: `New contact from ${name}`,
      text: ownerText,
      html: ownerHtml,
      replyTo: escEmail,
    };

    // Confirmation to sender
    const senderMsg = {
      to: email,
      from: process.env.CONTACT_FROM_EMAIL!,
      subject: "Thanks for contacting MountLift — we received your message",
      text: senderText,
      html: senderHtml,
    };

    // Send both messages (owner first)
    await sgMail.send(ownerMsg);
    await sgMail.send(senderMsg);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    // log full SendGrid error body if present for debugging
    try {
      console.error("SendGrid full error:", JSON.stringify(err?.response?.body || err, null, 2));
    } catch (e) {
      console.error("Error logging SendGrid error:", err);
    }
    return NextResponse.json({ success: false, error: err?.message || "unknown" }, { status: 500 });
  }
}
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a property inquiry email to the house owner.
 * @param {Object} data - { name, email, phone, timeslot, message, propertyTitle, ownerEmail }
 */
async function sendInquiryMail(data) {
  const { name, email, phone, timeslot, message, propertyTitle, ownerEmail } = data;

  const { error } = await resend.emails.send({
    from: "Rentywenty <onboarding@resend.dev>", // use this until you verify a domain
    to: ownerEmail,
    replyTo: email,
    subject: `🏠 New Inquiry for "${propertyTitle}" from ${name}`,
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
        <div style="background:#1a1a2e;padding:28px 32px;">
          <h2 style="color:#f5c518;margin:0;font-size:22px;letter-spacing:1px;">🏠 Rentywenty</h2>
          <p style="color:#aaa;margin:6px 0 0;font-size:13px;">New Property Inquiry</p>
        </div>
        <div style="padding:28px 32px;background:#fff;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;color:#888;font-size:13px;width:130px;">Property</td>
              <td style="padding:10px 0;color:#1a1a2e;font-weight:700;">${propertyTitle}</td>
            </tr>
            <tr style="border-top:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#888;font-size:13px;">Name</td>
              <td style="padding:10px 0;color:#1a1a2e;font-weight:600;">${name}</td>
            </tr>
            <tr style="border-top:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#888;font-size:13px;">Email</td>
              <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#f5c518;text-decoration:none;">${email}</a></td>
            </tr>
            <tr style="border-top:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#888;font-size:13px;">Phone</td>
              <td style="padding:10px 0;color:#1a1a2e;">${phone}</td>
            </tr>
            <tr style="border-top:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#888;font-size:13px;">Preferred Time</td>
              <td style="padding:10px 0;color:#1a1a2e;font-weight:600;">${timeslot}</td>
            </tr>
            <tr style="border-top:1px solid #f0f0f0;">
              <td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Message</td>
              <td style="padding:10px 0;color:#1a1a2e;line-height:1.6;">${message}</td>
            </tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#fffbea;border-radius:8px;border-left:4px solid #f5c518;">
            <p style="margin:0;font-size:13px;color:#555;">
              💡 <strong>Tip:</strong> Just hit <em>Reply</em> to this email to respond directly to ${name}.
            </p>
          </div>
        </div>
        <div style="background:#f9f9f9;padding:16px 32px;text-align:center;font-size:12px;color:#bbb;">
          Sent via Rentywenty &bull; ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message || "Failed to send email.");
  }
}

module.exports = { sendInquiryMail };

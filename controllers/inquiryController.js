const { sendInquiryMail } = require("../utils/mailer");

const sendInquiry = async (req, res) => {
  const { name, email, phone, timeslot, message, propertyTitle, ownerEmail } = req.body;

  // Log every incoming request so we can see it in Render logs
  console.log("📩 Inquiry received:", { name, email, phone, timeslot, propertyTitle, ownerEmail });

  if (!name || !email || !phone || !timeslot || !message || !propertyTitle || !ownerEmail) {
    console.log("❌ Validation failed — missing fields:", { name, email, phone, timeslot, message, propertyTitle, ownerEmail });
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  try {
    console.log("📤 Attempting to send mail to:", ownerEmail);
    await sendInquiryMail({ name, email, phone, timeslot, message, propertyTitle, ownerEmail });
    console.log("✅ Mail sent successfully to:", ownerEmail);
    return res.status(200).json({ success: true, message: "Inquiry sent successfully!" });
  } catch (err) {
    // Log the FULL error so Render shows us exactly what went wrong
    console.error("❌ Mail error code:", err.code);
    console.error("❌ Mail error message:", err.message);
    console.error("❌ Mail error response:", err.response);
    console.error("❌ Full error:", JSON.stringify(err, null, 2));
    return res.status(500).json({ success: false, error: err.message || "Failed to send email." });
  }
};

module.exports = { sendInquiry };

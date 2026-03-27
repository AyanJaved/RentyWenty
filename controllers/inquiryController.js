const { sendInquiryMail } = require("../utils/mailer");

const sendInquiry = async (req, res) => {
  const { name, email, phone, timeslot, message, propertyTitle, ownerEmail } = req.body;

  if (!name || !email || !phone || !timeslot || !message || !propertyTitle || !ownerEmail) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  try {
    await sendInquiryMail({ name, email, phone, timeslot, message, propertyTitle, ownerEmail });
    return res.status(200).json({ success: true, message: "Inquiry sent successfully!" });
  } catch (err) {
    console.error("Mail error:", err);
    return res.status(500).json({ success: false, error: "Failed to send email. Please try again." });
  }
};

module.exports = { sendInquiry };

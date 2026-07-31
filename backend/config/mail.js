const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify SMTP connection when server starts
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Email configuration error:");
        console.error(error.message);
    } else {
        console.log("✅ Mail server is ready.");
    }
});

module.exports = transporter;
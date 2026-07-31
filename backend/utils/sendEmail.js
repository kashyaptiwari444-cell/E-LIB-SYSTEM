const transporter = require("../config/mail");

const sendEmail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"E-Library" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log(`✅ Email sent successfully to ${to}`);
        console.log(`Message ID: ${info.messageId}`);

        return info;

    } catch (error) {
        console.error("❌ Email sending failed:");
        console.error(error.message);

        throw error;
    }
};

module.exports = sendEmail;
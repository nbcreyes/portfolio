import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const EmailService = {
  // Notify you when someone contacts you
  async sendContactNotification({ name, email, message }) {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">New Contact Message</h2>
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 16px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Login to your admin panel to reply.
          </p>
        </div>
      `,
    });
  },

  // Send your reply to the visitor
  async sendReply({ to, name, replyMessage }) {
    await transporter.sendMail({
      from: `"Neil Benedict Reyes" <${process.env.GMAIL_USER}>`,
      to,
      subject: `Re: Your message to Neil Benedict Reyes`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">Hey ${name},</h2>
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 16px 0;">
            <p style="white-space: pre-wrap;">${replyMessage}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            — Neil Benedict Reyes<br/>
            <a href="${process.env.FRONTEND_URL}">${process.env.FRONTEND_URL}</a>
          </p>
        </div>
      `,
    });
  },
};

export default EmailService;
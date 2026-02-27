import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

// Lazy initialization — only created when first used
let resendClient = null;

const getResend = () => {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
};

const EmailService = {
  async sendContactNotification({ name, email, message }) {
    await getResend().emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
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

  async sendReply({ to, name, replyMessage }) {
    await getResend().emails.send({
      from: 'Neil Benedict Reyes <onboarding@resend.dev>',
      to,
      subject: 'Re: Your message to Neil Benedict Reyes',
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
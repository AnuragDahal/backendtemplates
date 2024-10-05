import nodemailer from 'nodemailer'
import { sendInternalServerError } from '../utils/statusUtils';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.GMAIL_USER,
    pass: env.APP_SPECIFIC_PASSWORD,
  },
});

export const sendEmail = async (to, subject, html,res) => {
    try {
    const info = await transporter.sendMail({
        from: env.GMAIL_USER, // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
      });
    if (info.messageId) {
      return true
    }
    } catch (error) {
      return sendInternalServerError("Error sending Email")
    }
}

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendResetPasswordEmail(to: string, token: string) {
    const resetUrl = `https://heartfelt-faloodeh-02cd30.netlify.app/reset-password?token=${token}`;

    const mailOptions = {
      from: `"Tortuga App" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Reset your password',
      html: `
        <h3>Forgot your password?</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you did not request this, just ignore this email.</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

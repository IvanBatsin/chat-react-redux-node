import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST || 'smtp.ethereal.email',
  port: Number(process.env.NODEMAILER_PORT) || 1234,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});
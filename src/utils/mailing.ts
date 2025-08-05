import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

export async function sendActivationMail(to: string, username: string, code: number) {
  const link = `http://localhost/3000/activation/${username}/${code}`;

  return await transporter.sendMail({
    from: "support@instagram.com",
    to,
    subject: "Account Activation",
    html: `
    <p>activate your account,click below link</p>
    <a href="${link}">${link}</a>
    `,
  });
}

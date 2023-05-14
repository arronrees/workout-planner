import { emailTransporter } from '../constants';

async function sendEmailVerification(
  email: string,
  id: string,
  name: string,
  randomString: string
) {
  try {
    const message = await emailTransporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_ADDRESS}>`,
      to: email,
      subject: `${process.env.SITE_NAME} - Verify your email address`,
      text: 'Please verify your email address',
      html: `
        <p>Hi, <b>${name}.</b> Thanks for joining.</p>
        <p>Please visit this <a href="${process.env.WEB_URL}/user/verify-email/${id}/${randomString}" target="_blank" rel="noreferrer">link</a> to verify your email address</p>
      `,
    });

    return message;
  } catch (err) {
    console.error(err);

    return null;
  }
}

async function sendPasswordUpdateNotification(email: string, name: string) {
  try {
    const message = await emailTransporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_ADDRESS}>`,
      to: email,
      subject: `${process.env.SITE_NAME} - Password Updated`,
      text: 'Your password has been updated.',
      html: `
        <p>Hi, <b>${name}.</b></p>
        <p>Your password has been updated.</p>
      `,
    });

    return message;
  } catch (err) {
    console.error(err);

    return null;
  }
}

const emailService = {
  sendEmailVerification,
  sendPasswordUpdateNotification,
};

export default emailService;

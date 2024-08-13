import nodemailer from 'nodemailer';
import { CODE_MAP, CODE_TIMER_MAP } from './db';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

const CODE_TIMER = 5 * 60 * 1000;

export const saveTimer = (email: string, code: number) => {
  CODE_MAP.set(email, code);
  CODE_TIMER_MAP.set(email, setTimeout(() => {
    CODE_MAP.delete(email);
  }, CODE_TIMER));
};

export const deleteTimer = (email: string) => {
  CODE_MAP.delete(email);
  const timer = CODE_TIMER_MAP.get(email);
  if (timer) {
    clearTimeout(timer);
  }
  CODE_TIMER_MAP.delete(email);
};

export const verifyCode = (email: string, code: number) => {
  const savedCode = CODE_MAP.get(email);
  return savedCode === code;
};

export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const sendEmail = async (to: string, subject: string, text: string) => {
  let flag = false;
  try {
    const needSend = process.env.NEED_EMAIL_VERIFY === 'true';
    if (needSend) {
      console.log('send email', text);
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: subject,
        html: text
      });
    }
    flag = true;
  } catch (e) {
    console.log(e);
    flag = false;
  }
  return flag;
};

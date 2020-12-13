import { transport } from '../core/mailer';

interface ISendMail {
  from: string,
  to: string,
  subject: string,
  html: string
}

export const sendMail = async (info: ISendMail): Promise<void> => {
  try {
    await transport.sendMail({...info});
  } catch (err) {
    throw new Error('Send message error');
  }
}
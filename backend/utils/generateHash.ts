import crypto from 'crypto';

export const generateHash = (value: string): string => {
  return crypto.createHash('md5').update(value + Date.now().toString().slice(-4)).digest('hex');
}
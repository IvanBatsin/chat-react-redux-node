import differenceInMinutes from 'date-fns/differenceInMinutes';

export const isOnline = (lastSeen: string): boolean => {
  const minutes = differenceInMinutes(new Date, new Date(lastSeen));
  return minutes <= 5;
}
export const timeFormatter = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = (time % 60).toFixed();
  return `${minutes > 10 ? minutes : '0'}${minutes}:${+seconds > 10 ? seconds : '0'}${seconds}`;
}
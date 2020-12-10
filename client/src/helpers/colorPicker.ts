export const colorPicker = (): string => {
  const colors = [
    '#cc5436', '#6ca893', '#2f7dac', '#724f9a', '#965c87', '#b97144', '#7f8d68', '#716831', '#7a243e'
  ];
  return  colors[Math.ceil(Math.random() * colors.length - 1)];
}
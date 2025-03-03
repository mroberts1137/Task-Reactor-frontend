export const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];

export const sumTotal = (arr) => {
  if (!arr || arr.length === 0) return 0;
  return arr
    .map((item) => parseFloat(item.value))
    .reduce((acc, cur) => acc + cur, 0);
};

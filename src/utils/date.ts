export const formatDate = (date: string | Date) => {
  const d = new Date(date);
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ][d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();

  return `${month} ${day}. ${year}`;
};

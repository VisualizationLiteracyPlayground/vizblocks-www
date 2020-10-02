/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function sortDateDesc(dateA, dateB) {
  return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
}

export function prettyDateFormat(date) {
  const dateObj = new Date(date);
  return `${dateObj.getDate()} ${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
}
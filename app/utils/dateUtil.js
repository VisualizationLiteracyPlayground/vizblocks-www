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

// function to pad single digit time with 0
function addZero(digit) {
  let paddedDigit = digit;
  if (digit < 10) {
    paddedDigit = `0${digit}`;
  }
  return paddedDigit;
}

export function dateTimeFormat(date) {
  const currDate = new Date(date);
  const hour = addZero(currDate.getHours());
  const min = addZero(currDate.getMinutes());
  return `${currDate.getDate()}/${currDate.getMonth() + 1}/${currDate.getFullYear()} ${hour}:${min}`;
}

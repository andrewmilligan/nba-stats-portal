import formatDateFromString from './formatDateFromString';

const formatUTCDate = function formatUTCDate(dateInput, formatString) {
  const date = new Date(dateInput);
  if (`${date}`.toLowerCase() === 'invalid date') {
    return '';
  }

  // parse date components
  const month = `${date.getUTCMonth() + 1}`;
  const day = `${date.getUTCDate()}`;
  const year = `${date.getUTCFullYear()}`;
  const weekday = date.toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'UTC',
  });

  const dateComponents = {
    year,
    month,
    day,
    weekday,
  };

  return formatDateFromString(dateComponents, formatString);
};

export default formatUTCDate;

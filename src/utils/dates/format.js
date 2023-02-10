import formatDateFromString from './formatDateFromString';

const format = function format(dateInput, formatString) {
  const date = new Date(dateInput);
  if (`${date}`.toLowerCase() === 'invalid date') {
    return '';
  }

  // parse time components
  const timeString = date.toLocaleTimeString('en-US', { timeZoneName: 'short' });
  const [time, rawAmPm, timezone] = timeString.split(/\s/g);
  const [hour, minute, second] = time.split(':');
  const ampm = ({ AM: 'a.m.', PM: 'p.m.' })[rawAmPm];

  // parse date components
  const [month, day, year] = date.toLocaleDateString('en-US').split('/');
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });

  const dateComponents = {
    year,
    month,
    day,
    weekday,
    hour,
    minute,
    second,
    ampm,
    timezone,
  };

  return formatDateFromString(dateComponents, formatString);
};

export default format;

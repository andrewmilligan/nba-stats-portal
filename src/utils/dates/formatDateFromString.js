const AP_MONTHS = {
  1: 'Jan.',
  2: 'Feb.',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'Aug.',
  9: 'Sept.',
  10: 'Oct.',
  11: 'Nov.',
  12: 'Dec.',
};

const formatDateFromString = function formatDateFromString(data, string) {
  const apmonth = AP_MONTHS[data.month];
  const apday = `${apmonth} ${data.day}`;
  const apdate = `${apday} ${data.year}`;
  const minute = (data.minute === '00') ? '' : `:${data.minute}`;
  const aptime = `${data.hour}${minute} ${data.ampm}`;
  const monthpadded = data.month.padStart(2, '0');
  const daypadded = data.day.padStart(2, '0');
  const isodate = `${data.year}-${monthpadded}-${daypadded}`;
  const dateComponents = {
    apmonth,
    apday,
    apdate,
    aptime,
    monthpadded,
    daypadded,
    isodate,
    ...data,
  };

  let formattedString = '';
  let token = '';
  let inToken = false;
  string.split('').forEach((letter) => {
    if (letter === '{' && !inToken) {
      inToken = true;
      token = '';
    } else if (letter === '}' && inToken) {
      const value = dateComponents[token] || `{${token}}`;
      formattedString += value;
      inToken = false;
      token = '';
    } else if (inToken) {
      token += letter;
    } else {
      formattedString += letter;
    }
  });

  return formattedString;
};

export default formatDateFromString;

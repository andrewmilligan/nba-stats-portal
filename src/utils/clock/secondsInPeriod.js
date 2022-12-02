const secondsInPeriod = function secondsInPeriod(period) {
  const minutesInPeriod = (period > 4) ? 5 : 12;
  return minutesInPeriod * 60;
};

export default secondsInPeriod;

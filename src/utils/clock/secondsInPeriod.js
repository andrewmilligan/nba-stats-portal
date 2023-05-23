const minutesInQuarter = {
  nba: 12,
  wnba: 10,
};

const minutesInOvertime = {
  nba: 5,
  wnba: 5,
};

const secondsInPeriod = function secondsInPeriod(period, opts = {}) {
  const {
    league = 'nba',
  } = opts;
  const minutesInPeriod = (period > 4)
    ? minutesInOvertime
    : minutesInQuarter;
  return (minutesInPeriod[league]) * 60;
};

export default secondsInPeriod;

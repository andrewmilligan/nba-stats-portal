import secondsInPeriod from './secondsInPeriod';

const secondsBeforePeriodStart = function secondsBeforePeriodStart(period) {
  const completedPeriods = period - 1;
  const completedRegularPeriods = Math.min(completedPeriods, 4);
  const completedExtraPeriods = Math.max(
    completedPeriods - completedRegularPeriods,
    0,
  );
  const completedRegularSeconds = (
    completedRegularPeriods * secondsInPeriod(1)
  );
  const completedExtraSeconds = (
    completedExtraPeriods * secondsInPeriod(5)
  );
  return completedRegularSeconds + completedExtraSeconds;
};

export default secondsBeforePeriodStart;

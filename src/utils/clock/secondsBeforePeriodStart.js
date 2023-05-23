import secondsInPeriod from './secondsInPeriod';

const secondsBeforePeriodStart = function secondsBeforePeriodStart(
  period,
  opts,
) {
  const completedPeriods = period - 1;
  const completedRegularPeriods = Math.min(completedPeriods, 4);
  const completedExtraPeriods = Math.max(
    completedPeriods - completedRegularPeriods,
    0,
  );
  const completedRegularSeconds = (
    completedRegularPeriods * secondsInPeriod(1, opts)
  );
  const completedExtraSeconds = (
    completedExtraPeriods * secondsInPeriod(5, opts)
  );
  return completedRegularSeconds + completedExtraSeconds;
};

export default secondsBeforePeriodStart;

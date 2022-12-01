import { useMemo } from 'react';

const usePeriods = function usePeriods(maxPeriod) {
  return useMemo(() => (
    [...Array(maxPeriod)].map((_, i) => {
      const period = i + 1;
      const labelPrefix = period > 4 ? 'OT' : 'Q';
      const labelNum = period > 4 ? period - 4 : period;
      const minutes = (12 * Math.min(i, 4)) + (5 * Math.max(0, i - 4));
      const seconds = minutes * 60;
      return {
        period,
        seconds, 
        label: `${labelPrefix}${labelNum}`,
      };
    })
  ), [maxPeriod]);

};

export default usePeriods;

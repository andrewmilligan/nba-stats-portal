import { useState, useEffect } from 'react';

import useDataFetch from 'Utils/hooks/useDataFetch';
import { dailySchedule } from 'Utils/data/urls';

import useCurrentDate from './useCurrentDate';

console.log(dailySchedule);

const useDailySchedule = function useDailySchedule(dates) {
  const dateControls = useCurrentDate(dates);
  const { date } = dateControls;
  const {
    data: schedule,
    isLoadingNewData,
  } = useDataFetch(
    dailySchedule(date),
    { interval: 10000 },
  );

  return {
    schedule,
    isLoading: isLoadingNewData,
    ...dateControls,
  };
};

export default useDailySchedule;

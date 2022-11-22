import { useState, useEffect } from 'react';

import fetchDailySchedule from 'Utils/data/fetchDailySchedule';

import useCurrentDate from './useCurrentDate';

const useDailySchedule = function useDailySchedule(dates) {
  const dateControls = useCurrentDate(dates);
  const { date } = dateControls;
  const [isLoading, setIsLoading] = useState(true);
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    if (!date) return;
    const fetchSchedule = async () => {
      setIsLoading(true);
      const sched = await fetchDailySchedule(date);
      setSchedule(sched);
      setIsLoading(false);
    };
    fetchSchedule();
  }, [date]);

  return {
    schedule,
    isLoading,
    ...dateControls,
  };
};

export default useDailySchedule;

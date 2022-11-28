import { useState, useEffect, useMemo } from 'react';

import format from 'Utils/dates/format';
import useHashProps from 'Utils/hooks/useHashProps';

const useCurrentDate = function useCurrentDate(dates = []) {
  const {
    date: hashDate,
  } = useHashProps();

  const [currentDate, setCurrentDate] = useState();
  const date = hashDate || currentDate;

  useEffect(() => {
    const now = new Date();
    const index = dates.findIndex((date) => {
      const [year, month, day] = date.split('-').map(Number);
      return new Date(year, month - 1, day) > now;
    });
    const dateIndex = (index < 0)
      ? (dates.length - 1)
      : Math.max(0, index - 1);
    setCurrentDate(dates[dateIndex]);
  }, [dates]);

  const index = dates.findIndex((d) => d === date);

  return {
    index,
    date,
    isCurrentDate: date === currentDate,
    nextDate: dates[index + 1],
    previousDate: dates[index - 1],
  };
};

export default useCurrentDate;

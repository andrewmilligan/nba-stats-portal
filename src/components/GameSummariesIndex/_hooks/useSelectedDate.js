import { useState, useEffect, useMemo } from 'react';

import { useDates, useCurrentDate } from 'Atoms/schedule';
import format from 'Utils/dates/format';
import useHashProps from 'Utils/hooks/useHashProps';

const useSelectedDate = function useSelectedDate() {
  const dates = useDates();
  const currentDate = useCurrentDate();
  const {
    date: hashDate,
  } = useHashProps();

  const date = hashDate || currentDate;
  const index = dates.findIndex((d) => d === date);

  return {
    index,
    date,
    isCurrentDate: date === currentDate,
    nextDate: dates[index + 1],
    previousDate: dates[index - 1],
  };
};

export default useSelectedDate;

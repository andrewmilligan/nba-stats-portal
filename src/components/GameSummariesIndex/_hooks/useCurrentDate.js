import { useState, useEffect, useCallback } from 'react';

const useCurrentDate = function useCurrentDate(dates) {
  const [currentDateIndex, setCurrentDateIndex] = useState();
  const numDates = dates.length;

  useEffect(() => {
    const now = new Date();
    const index = dates.findIndex((date) => {
      const [year, month, day] = date.split('-').map(Number);
      return new Date(year, month - 1, day) > now;
    });
    const dateIndex = (index < 0)
      ? (dates.length - 1)
      : Math.max(0, index - 1);
    setCurrentDateIndex(dateIndex);
  }, [dates]);

  const selectNextDate = useCallback(() => {
    setCurrentDateIndex((oldIndex) => (
      Math.min(oldIndex + 1, numDates - 1)
    ));
  }, [numDates]);

  const selectPreviousDate = useCallback(() => {
    setCurrentDateIndex((oldIndex) => (
      Math.max(oldIndex - 1, 0)
    ));
  }, []);

  return {
    index: currentDateIndex,
    date: dates[currentDateIndex],
    nextDate: dates[currentDateIndex + 1],
    previousDate: dates[currentDateIndex - 1],
    selectNextDate: currentDateIndex < dates.length - 1
      ? selectNextDate
      : undefined,
    selectPreviousDate: currentDateIndex > 0
      ? selectPreviousDate
      : undefined,
  };
};

export default useCurrentDate;

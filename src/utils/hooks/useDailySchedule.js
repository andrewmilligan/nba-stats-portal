import { useState, useEffect, useMemo } from 'react';

import teamMetadata from 'Utils/teams/metadata';
import useDataFetch from 'Utils/hooks/useDataFetch';
import { dailySchedule } from 'Utils/data/urls';

import useCurrentDate from './useCurrentDate';

const useDailySchedule = function useDailySchedule(dates) {
  const dateControls = useCurrentDate(dates);
  const { date } = dateControls;
  const {
    data: rawSchedule,
    isLoadingNewData,
  } = useDataFetch(
    dailySchedule(date),
    { interval: 10000 },
  );

  const schedule = useMemo(() => {
    if (!rawSchedule) return rawSchedule;

    const games = rawSchedule.games
      .filter((game) => (
        !!teamMetadata.get(game.homeTeam.teamId)
        && !!teamMetadata.get(game.awayTeam.teamId)
      ))
      .sort((a, b) => (
        a.gameDateTime.localeCompare(b.gameDateTime)
      ));
    return {
      ...rawSchedule,
      games,
    };
  }, [rawSchedule]);

  return {
    schedule,
    isLoading: isLoadingNewData,
    ...dateControls,
  };
};

export default useDailySchedule;

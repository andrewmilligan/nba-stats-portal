import { useEffect } from 'react';
import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from 'recoil';

import { gameInDailyScoreboardSelectorFamily } from 'Atoms/dailyScoreboard';
import teamMetadata from 'Utils/teams/metadata';
import useDataFetch from 'Utils/hooks/useDataFetch';
import { dates, dailySchedule } from 'Utils/data/urls';

export const nowAtom = atom({
  key: 'schedule.nowAtom',
  default: undefined,
});

export const datesAtom = atomFamily({
  key: 'schedule.datesAtom',
  default: undefined,
});

export const gameDatesSelector = selector({
  key: 'schedule.gameDatesSelector',
  get: ({ get }) => {
    const allGameDates = ['nba', 'wnba'].reduce((games, league) => {
      const { gameDates = [] } = get(datesAtom(league)) || {};
      return [...games, ...gameDates];
    }, []);
    return allGameDates;
  },
});

export const dailyScheduleAtomFamily = atomFamily({
  key: 'schedule.dailyScheduleAtomFamily',
  default: undefined,
});

export const dailyScheduleSelectorFamily = selectorFamily({
  key: 'schedule.dailyScheduleSelectorFamily',
  get: (key) => ({ get }) => {
    const [league] = key.split(':');
    const schedule = get(dailyScheduleAtomFamily(key));
    if (!schedule) return schedule;
    const games = schedule.games
      .filter((game) => (
        (
          !!teamMetadata.nba.get(game.homeTeam.teamId)
          && !!teamMetadata.nba.get(game.awayTeam.teamId)
        )
        || (
          !!teamMetadata.wnba.get(game.homeTeam.teamId)
          && !!teamMetadata.wnba.get(game.awayTeam.teamId)
        )
      ))
      .map((game) => (
        get(gameInDailyScoreboardSelectorFamily(`${league}:${game.gameId}`)) || game
      ))
      .sort((a, b) => (
        a.gameDateTime.localeCompare(b.gameDateTime)
      ));
    return {
      ...schedule,
      games,
    };
  },
});

export const currentDateSelector = selector({
  key: 'schedule.currentDateSelector',
  get: ({ get }) => {
    const now = get(nowAtom);
    const dates = get(gameDatesSelector);
    if (!dates) return undefined;
    const index = dates.findIndex((date) => {
      const [year, month, day] = date.split('-').map(Number);
      return new Date(year, month - 1, day) > now;
    });
    const dateIndex = (index < 0)
      ? (dates.length - 1)
      : Math.max(0, index - 1);
    return dates[dateIndex];
  },
});

export const initSchedule = function initSchedule(
  snapshot,
  { nbaDates, wnbaDates },
) {
  snapshot.set(datesAtom('nba'), nbaDates);
  snapshot.set(datesAtom('wnba'), wnbaDates);
  snapshot.set(nowAtom, new Date());
};

export const useInitializeSchedule = function useInitializeSchedule() {
  const setNow = useSetRecoilState(nowAtom);

  // update now atom periodically
  useEffect(() => {
    let timer;
    const pollUpdateNow = () => {
      setNow(new Date());
      timer = setTimeout(pollUpdateNow, 30 * 1000); // 30s
    };
    pollUpdateNow();
    return () => clearTimeout(timer);
  }, [setNow]);
};

export const useInitializeDailySchedule = function useInitializeDailySchedule(
  date,
  league = 'nba',
) {
  const dailyScheduleAtom = dailyScheduleAtomFamily(`${league}:${date}`);
  const setDates = useSetRecoilState(datesAtom(league));

  const setDailySchedule = useSetRecoilState(dailyScheduleAtom);
  const resetDailySchedule = useResetRecoilState(dailyScheduleAtom);

  // load data
  useDataFetch(dailySchedule(date, league), {
    onLoad: setDailySchedule,
  });
  useDataFetch(dates(league), {
    onLoad: setDates,
  });

  // reset when we're done
  useEffect(() => () => {
    resetDailySchedule();
  }, [date, resetDailySchedule]);
};

export const useDailySchedule = function useDailySchedule(date, league = 'nba') {
  return useRecoilValue(dailyScheduleSelectorFamily(`${league}:${date}`));
};

export const useDates = function useDates() {
  return useRecoilValue(gameDatesSelector);
};

export const useCurrentDate = function useCurrentDate() {
  return useRecoilValue(currentDateSelector);
};

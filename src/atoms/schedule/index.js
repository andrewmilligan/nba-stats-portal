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
import { dailySchedule } from 'Utils/data/urls';

export const nowAtom = atom({
  key: 'schedule.nowAtom',
  default: undefined,
});

export const datesAtom = atom({
  key: 'schedule.datesAtom',
  default: undefined,
});

export const gameDatesSelector = selector({
  key: 'schedule.gameDatesSelector',
  get: ({ get }) => {
    const { gameDates } = get(datesAtom) || {};
    return gameDates;
  },
});

export const dailyScheduleAtomFamily = atomFamily({
  key: 'schedule.dailyScheduleAtomFamily',
  default: undefined,
});

export const dailyScheduleSelectorFamily = selectorFamily({
  key: 'schedule.dailyScheduleSelectorFamily',
  get: (date) => ({ get }) => {
    const schedule = get(dailyScheduleAtomFamily(date));
    if (!schedule) return schedule;
    const games = schedule.games
      .filter((game) => (
        !!teamMetadata.get(game.homeTeam.teamId)
        && !!teamMetadata.get(game.awayTeam.teamId)
      ))
      .map((game) => (
        get(gameInDailyScoreboardSelectorFamily(game.gameId)) || game
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

export const initSchedule = function initSchedule(snapshot, { dates }) {
  snapshot.set(datesAtom, dates);
  snapshot.set(nowAtom, new Date());
};

export const useInitializeDailySchedule = function useInitializeDailySchedule(date) {
  const dailyScheduleAtom = dailyScheduleAtomFamily(date);
  const setDailySchedule = useSetRecoilState(dailyScheduleAtom);
  const resetDailySchedule = useResetRecoilState(dailyScheduleAtom);
  const setNow = useSetRecoilState(nowAtom);

  // load data
  useDataFetch(dailySchedule(date), {
    onLoad: setDailySchedule,
  });

  // reset when we're done
  useEffect(() => () => {
    resetDailySchedule();
  }, [date, resetDailySchedule]);

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

export const useDailySchedule = function useDailySchedule(date) {
  return useRecoilValue(dailyScheduleSelectorFamily(date));
};

export const useDates = function useDates() {
  return useRecoilValue(gameDatesSelector);
};

export const useCurrentDate = function useCurrentDate() {
  return useRecoilValue(currentDateSelector);
};

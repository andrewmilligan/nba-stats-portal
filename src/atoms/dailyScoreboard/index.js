import {
  atom,
  selector,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import useDataFetch from 'Utils/hooks/useDataFetch';
import { dailyScoreboard } from 'Utils/data/urls';
import { gameMetadataAtomFamily } from 'Atoms/game';

export const dailyScoreboardAtom = atom({
  key: 'dailyScoreboard.dailyScoreboardAtom',
  default: undefined,
});

export const dailyScoreboardSelector = selector({
  key: 'dailyScoreboard.dailyScoreboardSelector',
  get: ({ get }) => get(dailyScoreboardAtom),
  set: ({ set }, data) => {
    set(dailyScoreboardAtom, data);
    data.games.forEach((game) => (
      set(gameMetadataAtomFamily(game.gameId), game)
    ));
  },
});

export const dailyScoreboardGamesByIdSelector = selector({
  key: 'dailyScoreboard.dailyScoreboardGamesByIdSelector',
  get: ({ get }) => {
    const {
      games = [],
    } = get(dailyScoreboardAtom) || {};
    return games.reduce((games, game) => {
      games.set(game.gameId, game);
      return games;
    }, new Map());
  },
});

export const gameInDailyScoreboardSelectorFamily = selectorFamily({
  key: 'dailyScoreboard.gameInDailyScoreboardSelectorFamily',
  get: (gameId) => ({ get }) => {
    const games = get(dailyScoreboardGamesByIdSelector);
    return games.get(gameId);
  },
});

export const useInitializeDailyScoreboard = function useInitializeDailyScoreboard() {
  const setDailyScoreboard = useSetRecoilState(dailyScoreboardSelector);
  useDataFetch(dailyScoreboard(), {
    interval: 10000,
    onLoad: setDailyScoreboard,
  });
};

export const useDailyScoreboard = function useDailyScoreboard() {
  return useRecoilValue(dailyScoreboardAtom);
};

export const useGameInDailyScoreboard = function useGameInDailyScoreboard(gameId) {
  return useRecoilValue(gameInDailyScoreboardSelectorFamily(gameId));
};

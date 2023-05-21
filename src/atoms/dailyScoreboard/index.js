import {
  atomFamily,
  selector,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import useDataFetch from 'Utils/hooks/useDataFetch';
import { dailyScoreboard } from 'Utils/data/urls';
import { gameMetadataAtomFamily } from 'Atoms/game';

export const dailyScoreboardAtom = atomFamily({
  key: 'dailyScoreboard.dailyScoreboardAtom',
  default: undefined,
});

export const dailyScoreboardSelector = selectorFamily({
  key: 'dailyScoreboard.dailyScoreboardSelector',
  get: (key) => ({ get }) => get(dailyScoreboardAtom(key)),
  set: (key) => ({ set }, data) => {
    set(dailyScoreboardAtom(key), data);
    data.games.forEach((game) => (
      set(gameMetadataAtomFamily(game.gameId), game)
    ));
  },
});

export const dailyScoreboardGamesByIdSelector = selectorFamily({
  key: 'dailyScoreboard.dailyScoreboardGamesByIdSelector',
  get: (key) => ({ get }) => {
    const {
      games = [],
    } = get(dailyScoreboardAtom(key)) || {};
    return games.reduce((games, game) => {
      games.set(game.gameId, game);
      return games;
    }, new Map());
  },
});

export const gameInDailyScoreboardSelectorFamily = selectorFamily({
  key: 'dailyScoreboard.gameInDailyScoreboardSelectorFamily',
  get: (key) => ({ get }) => {
    const [league, gameId] = key.split(':');
    const games = get(dailyScoreboardGamesByIdSelector(league));
    return games.get(gameId);
  },
});

export const useInitializeDailyScoreboard = function useInitializeDailyScoreboard(
  league = 'nba',
) {
  const setDailyScoreboard = useSetRecoilState(dailyScoreboardSelector(league));
  useDataFetch(dailyScoreboard(league), {
    interval: 10000,
    onLoad: setDailyScoreboard,
  });
};

export const useDailyScoreboard = function useDailyScoreboard(league = 'nba') {
  return useRecoilValue(dailyScoreboardAtom(league));
};

export const useGameInDailyScoreboard = function useGameInDailyScoreboard(
  gameId,
  league = 'nba',
) {
  const key = `${league}:${gameId}`;
  return useRecoilValue(gameInDailyScoreboardSelectorFamily(key));
};

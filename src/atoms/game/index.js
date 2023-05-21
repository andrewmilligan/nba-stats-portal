import { useCallback, useEffect } from 'react';
import {
  atomFamily,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from 'recoil';

import {
  useGameInDailyScoreboard,
  gameInDailyScoreboardSelectorFamily,
} from 'Atoms/dailyScoreboard';
import { nowAtom } from 'Atoms/schedule';
import { ONGOING_CODE, UPCOMING_CODE } from 'Utils/gameStatus/statuses';
import useDataFetch from 'Utils/hooks/useDataFetch';
import {
  gameBoxScore,
  gamePlayByPlay,
  playerBoxScores,
  dailySchedule,
} from 'Utils/data/urls';
import secondsBeforePeriodStart from 'Utils/clock/secondsBeforePeriodStart';
import secondsInPeriod from 'Utils/clock/secondsInPeriod';
import parseClock from 'Utils/clock/parseClock';
import { statusFromLastAction } from 'Utils/gameStatus/statusFromLastAction';
import teamFouls from 'Utils/gameStatus/teamFouls';

export const gameBakedMetadataAtomFamily = atomFamily({
  key: 'game.gameBakedMetadataAtomFamily',
  default: undefined,
});

export const gameMetadataAtomFamily = atomFamily({
  key: 'game.gameMetadataAtomFamily',
  default: undefined,
});

export const boxScoreAtomFamily = atomFamily({
  key: 'game.boxScoreAtomFamily',
  default: undefined,
});

export const playByPlayAtomFamily = atomFamily({
  key: 'game.playByPlayAtomFamily',
  default: undefined,
});

export const playByPlaySelectorFamily = selectorFamily({
  key: 'game.playByPlaySelectorFamily',
  get: (gameId) => ({ get }) => {
    const playByPlay = get(playByPlayAtomFamily(gameId));
    return playByPlay && playByPlay.map((action) => {
      const {
        period,
        clock,
        scoreHome,
        scoreAway,
        ...restAction
      } = action;
      const secsInPeriod = secondsInPeriod(period);
      const secsLeftInPeriod = parseClock(clock).totalSeconds;
      const secsIntoPeriod = secsInPeriod - secsLeftInPeriod;
      return {
        period,
        clock,
        seconds: secondsBeforePeriodStart(period) + secsIntoPeriod,
        secondsLeftInPeriod: secsLeftInPeriod,
        scoreHome: parseInt(scoreHome, 10),
        scoreAway: parseInt(scoreAway, 10),
        ...restAction,
      };
    });
  },
});

export const gameStateSelector = selectorFamily({
  key: 'game.gameStateSelector',
  get: (gameId) => ({ get }) => {
    const playByPlay = get(playByPlaySelectorFamily(gameId));
    if (!playByPlay) return undefined;
    const lastAction = playByPlay[playByPlay.length - 1];
    const {
      period,
      clock,
      seconds,
      scoreHome,
      scoreAway,
      possession,
    } = lastAction;
    const fouls = teamFouls(playByPlay);
    return {
      period,
      clock,
      seconds,
      scoreHome,
      scoreAway,
      possession,
      teamFouls: fouls,
      ...statusFromLastAction(lastAction),
    };
  },
});

export const gameSelector = selectorFamily({
  key: 'game.gameSelector',
  get: (gameId) => ({ get }) => {
    try {
      const now = get(nowAtom);
      const bakedMetadata = get(gameBakedMetadataAtomFamily(gameId));
      const metadata = get(gameMetadataAtomFamily(gameId)) || bakedMetadata;
      if (!metadata) return undefined;

      const boxScore = get(boxScoreAtomFamily(gameId));
      const playByPlay = get(playByPlaySelectorFamily(gameId));
      const state = get(gameStateSelector(gameId));
      const gameInScoreboard = get(gameInDailyScoreboardSelectorFamily(gameId));
      const isFuture = new Date(metadata.gameDateTime) > now && !gameInScoreboard;
      const isLaterToday = gameInScoreboard && gameInScoreboard.gameStatus === UPCOMING_CODE;

      return {
        isUpcoming: !!(isFuture || isLaterToday),
        metadata,
        state,
        boxScore,
        playByPlay,
      };
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
});

export const initGame = function initGame(snapshot, opts = {}) {
  const {
    gameMetadata,
  } = opts;

  snapshot.set(gameBakedMetadataAtomFamily(gameMetadata.gameId), gameMetadata);
};

export const useGameMetadata = function useGameMetadata(gameId) {
  const baked = useRecoilValue(gameBakedMetadataAtomFamily(gameId));
  const meta = useRecoilValue(gameMetadataAtomFamily(gameId));
  return meta || baked;
};

export const useInitializeGame = function useInitializeGame(gameId, league = 'nba') {
  const game = useGameInDailyScoreboard(gameId, league);
  const interval = (!game || game.gameStatus !== ONGOING_CODE) ? null : 10000;
  const meta = useGameMetadata(gameId);
  const now = new Date();
  const gameISODate = meta && new Date(meta.gameDateTime).toISOString().split('T')[0];
  const isFuture = !meta || (new Date(meta.gameDateTime) > now && !game);
  const isLaterToday = game && game.gameStatus === UPCOMING_CODE;
  const isUpcoming = !!(isFuture || isLaterToday);

  const boxScoreAtom = boxScoreAtomFamily(gameId);
  const playByPlayAtom = playByPlayAtomFamily(gameId);
  const gameMetadataAtom = gameMetadataAtomFamily(gameId);

  // setters for when we load new data
  const setBoxScore = useSetRecoilState(boxScoreAtom);
  const setPlayByPlay = useSetRecoilState(playByPlayAtom);
  const setGameMetadata = useSetRecoilState(gameMetadataAtom);
  const setGameMetadataFromGames = useCallback((games) => {
    const game = games.games.find((g) => g.gameId === gameId);
    if (game) {
      setGameMetadata(game);
    }
  }, [gameId, setGameMetadata]);

  // re-setters for when we're done with this game
  const resetBoxScore = useResetRecoilState(boxScoreAtom);
  const resetPlayByPlay = useResetRecoilState(playByPlayAtom);

  // subscribe to the data we need
  const boxScoreUrl = !isUpcoming && gameBoxScore(gameId, league);
  useDataFetch(boxScoreUrl, {
    onLoad: setBoxScore,
    interval,
  });
  const playByPlayUrl = !isUpcoming && gamePlayByPlay(gameId, league);
  useDataFetch(playByPlayUrl, {
    onLoad: setPlayByPlay,
    interval,
  });
  const dailyScheduleUrl = !game && dailySchedule(gameISODate, league);
  useDataFetch(dailyScheduleUrl, {
    onLoad: setGameMetadataFromGames,
  });

  // reset when we're done
  useEffect(() => () => {
    resetBoxScore();
    resetPlayByPlay();
  }, [gameId, resetBoxScore, resetPlayByPlay]);
};

export const useInitializeGameMetadata = function useInitializeGameMetadata(
  gameMetadata,
) {
  const {
    gameId,
  } = gameMetadata || {};
  const setGameMeta = useSetRecoilState(gameMetadataAtomFamily(gameId));
  const resetGameMeta = useResetRecoilState(gameMetadataAtomFamily(gameId));

  useEffect(() => {
    setGameMeta(gameMetadata);
    return () => {
      resetGameMeta();
    };
  }, [gameMetadata, setGameMeta, resetGameMeta]);
};

export const useGame = function useGame(gameId) {
  return useRecoilValue(gameSelector(gameId));
};

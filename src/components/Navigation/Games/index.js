import { useMemo } from 'react';
import classnames from 'classnames';

import { COMPLETE_CODE } from 'Utils/gameStatus/statuses';
import { useDailyScoreboard } from 'Atoms/dailyScoreboard';
import GameSummaryCard from 'Components/GameSummaryCard';

import styles from './styles.module.scss';

const Games = function Games() {
  const nbaSchedule = useDailyScoreboard('nba');
  const wnbaSchedule = useDailyScoreboard('wnba');
  const isLoading = !nbaSchedule || !wnbaSchedule;

  if (isLoading) return null;

  const {
    gameDate: date,
    games: nbaGames = [],
  } = nbaSchedule;

  const {
    games: wnbaGames = [],
  } = wnbaSchedule;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {!isLoading && (
          nbaGames.map((game, i, allGames) => (
            <div
              key={game.gameId}
              className={classnames(
                styles.game,
                { [styles.isNotLast]: i < allGames.length - 1 },
              )}
            >
              <GameSummaryCard
                game={game}
                gameDate={date}
                mode="condensed"
                border={false}
                league="nba"
              />
            </div>
          ))
        )}
        <div className={styles.sep} />
        {!isLoading && (
          wnbaGames.map((game, i, allGames) => (
            <div
              key={game.gameId}
              className={classnames(
                styles.game,
                { [styles.isNotLast]: i < allGames.length - 1 },
              )}
            >
              <GameSummaryCard
                game={game}
                gameDate={date}
                mode="condensed"
                border={false}
                league="wnba"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Games;

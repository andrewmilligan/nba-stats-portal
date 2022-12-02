import { useMemo } from 'react';
import classnames from 'classnames';

import { COMPLETE_CODE } from 'Utils/gameStatus/statuses';
import { useDailyScoreboard } from 'Atoms/dailyScoreboard';
import GameSummaryCard from 'Components/GameSummaryCard';

import styles from './styles.module.scss';

const Games = function Games() {
  const schedule = useDailyScoreboard();
  const isLoading = !schedule;

  if (!schedule) return null;

  const {
    gameDate: date,
    games = [],
  } = schedule;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {!isLoading && (
          games.map((game, i, allGames) => (
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
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Games;

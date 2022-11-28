import { useMemo } from 'react';
import classnames from 'classnames';

import { COMPLETE_CODE } from 'Utils/gameStatus/statuses';
import useDailySchedule from 'Utils/hooks/useDailySchedule';
import GameSummaryCard from 'Components/GameSummaryCard';

import styles from './styles.module.scss';

const Games = function Games(props) {
  const {
    dates: {
      gameDates,
    },
  } = props;

  const {
    schedule,
    isLoading,
  } = useDailySchedule(gameDates);

  if (!schedule) return null;

  const {
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

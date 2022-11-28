import useDailySchedule from 'Utils/hooks/useDailySchedule';
import GameSummaryCard from 'Components/GameSummaryCard';
import Placeholder from 'Components/Placeholder';

import Header from './Header';
import styles from './styles.module.scss';

const GameSummariesIndex = function GameSummariesIndex(props) {
  const {
    dates: {
      gameDates,
    },
  } = props;

  const {
    date,
    isCurrentDate,
    schedule,
    isLoading,
    nextDate,
    previousDate,
  } = useDailySchedule(gameDates);

  const {
    games = [],
  } = schedule || {};

  return (
    <div className={styles.container}>
      <Header
        gameDate={date}
        isCurrentDate={isCurrentDate}
        nextDate={nextDate}
        previousDate={previousDate}
      />
      <div className={styles.games}>
        {!isLoading && (
          games.map((game) => (
            <GameSummaryCard
              key={game.gameId}
              game={game}
            />
          ))
        )}
        {isLoading && [...Array(4)].map((_, i) => (
          <Placeholder
            key={i}
            className={styles.placeholder}
          />
        ))}
      </div>
    </div>
  );
};

export default GameSummariesIndex;

import GameSummaryCard from 'Components/GameSummaryCard';

import Header from './Header';
import useDailySchedule from './_hooks/useDailySchedule';
import styles from './styles.module.scss';

const GameSummariesIndex = function GameSummariesIndex(props) {
  const {
    dates: {
      gameDates,
    },
  } = props;

  const {
    date,
    schedule,
    isLoading,
    nextDate,
    previousDate,
    selectNextDate,
    selectPreviousDate,
  } = useDailySchedule(gameDates);

  if (!schedule) return null;

  const {
    games,
  } = schedule;

  return (
    <div className={styles.container}>
      <Header
        gameDate={date}
        nextDate={nextDate}
        previousDate={previousDate}
        selectNextDate={selectNextDate}
        selectPreviousDate={selectPreviousDate}
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
      </div>
    </div>
  );
};

export default GameSummariesIndex;

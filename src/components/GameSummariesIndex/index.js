import { useInitializeDailySchedule, useDailySchedule } from 'Atoms/schedule';
import GameSummaryCard from 'Components/GameSummaryCard';
import Placeholder from 'Components/Placeholder';

import useSelectedDate from './_hooks/useSelectedDate';
import Header from './Header';
import styles from './styles.module.scss';

const GameSummariesIndex = function GameSummariesIndex(props) {
  const {
    league,
  } = props;

  const {
    date,
    isCurrentDate,
    nextDate,
    previousDate,
  } = useSelectedDate();

  useInitializeDailySchedule(date, league);
  const schedule = useDailySchedule(date, league);
  const isLoading = typeof schedule === 'undefined';

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
        league={league}
      />
      <div className={styles.games}>
        {!isLoading && (
          games.map((game) => (
            <GameSummaryCard
              key={game.gameId}
              game={game}
              gameDate={date}
              league={league}
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

GameSummariesIndex.defaultProps = {
  league: 'nba',
};

export default GameSummariesIndex;

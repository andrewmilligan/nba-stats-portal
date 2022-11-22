import gameStatusText from 'Utils/gameStatus/gameStatusText';

import Status from './Status';
import Score from './Score';
import styles from './styles.module.scss';

const GameSummaryCard = function GameSummaryCard(props) {
  const {
    game,
  } = props;

  const {
    gameStatus,
    gameDateTime,
    homeTeam,
    awayTeam,
  } = game;

  const status = gameStatusText(game);

  return (
    <div className={styles.container}>
      <Status
        gameStatus={gameStatus}
        gameStatusText={status}
      />
      <Score
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    </div>
  );
};

export default GameSummaryCard;

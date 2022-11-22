import gameStatusText from 'Utils/gameStatus/gameStatusText';
import { ONGOING_CODE, COMPLETE_CODE } from 'Utils/gameStatus/statuses';

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
  const isFinal = gameStatus === COMPLETE_CODE;
  const isLive = gameStatus === ONGOING_CODE;

  return (
    <div className={styles.container}>
      <Status
        gameStatus={gameStatus}
        gameStatusText={status}
      />
      <Score
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        isFinal={isFinal}
        isLive={isLive}
      />
    </div>
  );
};

export default GameSummaryCard;

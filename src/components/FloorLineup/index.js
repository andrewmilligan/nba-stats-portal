import { COMPLETE_CODE } from 'Utils/gameStatus/statuses';

import Lineup from './Lineup';
import styles from './styles.module.scss';

const FloorLineup = function FloorLineup(props) {
  const {
    game,
  } = props;

  const {
    boxScore,
  } = game;

  const gameIsOver = boxScore.gameStatus === COMPLETE_CODE;

  return (
    <div className={styles.container}>
      <div className={styles.lineups}>
        <Lineup
          team={boxScore.awayTeam}
          gameIsOver={gameIsOver}
        />
        <Lineup
          team={boxScore.homeTeam}
          gameIsOver={gameIsOver}
        />
      </div>
    </div>
  );
};

FloorLineup.defaultProps = {
  boxScore: {},
};

export default FloorLineup;

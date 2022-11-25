import { COMPLETE_CODE } from 'Utils/gameStatus/statuses';

import Topline from './Topline';
import Lineup from './Lineup';
import styles from './styles.module.scss';

const FloorLineup = function FloorLineup(props) {
  const {
    boxScore,
  } = props;

  const gameIsOver = boxScore.gameStatus === COMPLETE_CODE;

  return (
    <div className={styles.container}>
      <Topline boxScore={boxScore} />
      <div className={styles.lineups}>
        <Lineup
          team={boxScore.homeTeam}
          gameIsOver={gameIsOver}
        />
        <Lineup
          team={boxScore.awayTeam}
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

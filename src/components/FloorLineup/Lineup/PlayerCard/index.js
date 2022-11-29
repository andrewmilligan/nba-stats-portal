import { useState, useCallback } from 'react';
import classnames from 'classnames';

import { playerHeadshot } from 'Utils/data/urls';
import playerMinutes from 'Utils/clock/playerMinutes';

import Headshot from './Headshot';
import TopInfo from './TopInfo';
import Fouls from './Fouls';
import ExtendedStats from './ExtendedStats';
import styles from './styles.module.scss';

const PlayerCard = function PlayerCard(props) {
  const {
    player,
    seasonBoxScores,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setIsExpanded((old) => !old), []);

  const {
    status,
    name,
    jerseyNum,
    statistics: {
      minutes,
      points,
      reboundsTotal,
      reboundsDefensive,
      reboundsOffensive,
      assists,
      foulsPersonal,
      fieldGoalsAttempted,
      fieldGoalsMade,
      threePointersAttempted,
      threePointersMade,
      freeThrowsAttempted,
      freeThrowsMade,
    },
  } = player;

  const isInactive = status === 'INACTIVE';

  const statLine = [
    `${points} PTS`,
    `${assists} AST`,
    `${reboundsTotal} RBS`,
  ].join(', ');

  const stat = (num, name, plural) => {
    const statName = (num === 1) ? name : (plural || `${name}s`);
    return `${num} ${statName}`;
  };

  return (
    <div
      className={styles.container}
      onClick={toggleExpanded}
    >
      <div className={styles.content}>

        <Headshot player={player} />

        <div className={styles.details}>
          <TopInfo player={player} />

          <div className={styles.stats}>

            {/* POINTS */}
            <div className={styles.mainStat}>
              {stat(points, 'point')}
            </div>
            <div>
              {fieldGoalsAttempted > 0 && (
                <span>
                  {`${fieldGoalsMade}/${fieldGoalsAttempted} from the field`}
                </span>
              )}
              {threePointersAttempted > 0 && (
                <>
                  {', '}
                  <span>
                    {`${threePointersMade}/${threePointersAttempted} from deep`}
                  </span>
                </>
              )}
              {freeThrowsAttempted > 0 && (
                <>
                  {', '}
                  <span>
                    {`${freeThrowsMade}/${freeThrowsAttempted} from the line`}
                  </span>
                </>
              )}
            </div>

            {reboundsTotal > 0 && (
              <>
                <div className={styles.mainStat}>
                  {stat(reboundsTotal, 'rebound')}
                </div>
                <div>
                  {`${reboundsDefensive} defensive, ${reboundsOffensive} offensive`}
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {isExpanded && (
        <ExtendedStats
          player={player}
          seasonBoxScores={seasonBoxScores}
        />
      )}

      <div className={styles.fouls}>
        <Fouls fouls={foulsPersonal} />
      </div>
    </div>
  );
};

export default PlayerCard;

import { useMemo, useState, useCallback } from 'react';

import PlayerCard from './PlayerCard';
import styles from './styles.module.scss';

const Lineup = function Lineup(props) {
  const {
    team,
    gameIsOver,
  } = props;

  const {
    players = [],
  } = team;

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setIsExpanded((old) => !old), []);
  const lineup = useMemo(() => {
    const lookup = {
      '1': 1,
      '0': 2,
    };
    const attr = gameIsOver ? 'starter' : 'oncourt';
    return [...players].sort((a, b) => (
      lookup[a[attr]] - lookup[b[attr]]
    ));
  }, [players, gameIsOver]);

  const onFloor = lineup.slice(0, 5);
  const bench = lineup.slice(5);

  return (
    <div className={styles.container}>
      {onFloor.map((player) => (
        <PlayerCard
          key={player.personId}
          player={player}
        />
      ))}

      <div className={styles.bench} />

      {isExpanded && bench.map((player) => (
        <PlayerCard
          key={player.personId}
          player={player}
        />
      ))}

      <button
        type="button"
        className={styles.expand}
        onClick={toggleExpanded}
      >
        {isExpanded ? 'Hide Bench' : 'Show Bench'}
      </button>
    </div>
  );
};

Lineup.defaultProps = {
  team: {},
  gameIsOver: false,
};

export default Lineup;

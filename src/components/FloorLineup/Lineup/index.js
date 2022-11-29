import { useMemo, useState, useCallback } from 'react';

import PlayerCard from './PlayerCard';
import styles from './styles.module.scss';

const Lineup = function Lineup(props) {
  const {
    team,
    gameIsOver,
    seasonBoxScores,
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

  const seasonBoxScoresByPlayer = useMemo(() => (
    seasonBoxScores.reduce((byPlayer, boxScore) => {
      const { personId } = boxScore;
      if (!byPlayer.has(personId)) byPlayer.set(personId, []);
      byPlayer.get(personId).push(boxScore);
      return byPlayer;
    }, new Map())
  ), [seasonBoxScores]);

  return (
    <div className={styles.container}>
      <div className={styles.teamName}>
        {`${team.teamCity} ${team.teamName}`}
      </div>

      {onFloor.map((player) => (
        <PlayerCard
          key={player.personId}
          player={player}
          seasonBoxScores={seasonBoxScoresByPlayer.get(player.personId)}
        />
      ))}

      <div className={styles.bench} />

      {isExpanded && bench.map((player) => (
        <PlayerCard
          key={player.personId}
          player={player}
          seasonBoxScores={seasonBoxScoresByPlayer.get(player.personId)}
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
  seasonBoxScores: [],
};

export default Lineup;

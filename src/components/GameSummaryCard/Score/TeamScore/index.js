import classnames from 'classnames';

import { teamLogo } from 'Utils/data/urls';
import { useTeamRecord } from 'Atoms/records';

import styles from './styles.module.scss';

const TeamScore = function TeamScore(props) {
  const {
    team: {
      teamId,
      teamCity,
      teamName,
      teamTricode,
      score,
    },
    lost,
    isFinal,
    isLive,
    mode,
  } = props;

  const {
    wins = '',
    losses = '',
  } = useTeamRecord(teamId);

  const logo = teamLogo(teamId, { variant: 'D' });

  const showScore = isLive || isFinal;

  const teamDisplayNameByMode = {
    default: `${teamCity} ${teamName}`,
    condensed: teamTricode,
  };
  const teamDisplayName = (
    teamDisplayNameByMode[mode]
    || teamDisplayNameByMode.default
  );

  return (
    <div className={styles.container}>
      <div className={styles.team}>
        <img
          className={styles.logo}
          src={logo}
          alt={`${teamCity} ${teamName} logo`}
        />
        <div
          className={classnames(
            styles.tricode,
            { [styles.lost]: lost },
          )}
        >
          {teamDisplayName}
        </div>
      </div>

      <div
        className={classnames(
          styles.score,
          { [styles.won]: isFinal && !lost },
        )}
      >
        {showScore ? score : `${wins} - ${losses}`}
      </div>
    </div>
  );
};

export default TeamScore;

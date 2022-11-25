import classnames from 'classnames';

import { teamLogo } from 'Utils/data/urls';

import styles from './styles.module.scss';

const TeamScore = function TeamScore(props) {
  const {
    team: {
      teamId,
      teamCity,
      teamName,
      score,
      wins,
      losses,
    },
    lost,
    isFinal,
    isLive,
  } = props;

  const logo = teamLogo(teamId, { variant: 'D' });

  const showScore = isLive || isFinal;

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
          {`${teamCity} ${teamName}`}
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

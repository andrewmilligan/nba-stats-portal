import dataUrl from 'Utils/data/dataUrl';

import styles from './styles.module.scss';

const TeamScore = function TeamScore(props) {
  const {
    team: {
      teamId,
      teamCity,
      teamName,
      score,
    },
  } = props;

  const logo = dataUrl(`images/teams/logos/${teamId}/primary/L/logo.svg`);

  return (
    <div className={styles.container}>
      <div className={styles.team}>
        <img
          className={styles.logo}
          src={logo}
          alt={`${teamCity} ${teamName} logo`}
        />
        <div className={styles.tricode}>
          {`${teamCity} ${teamName}`}
        </div>
      </div>
      <div className={styles.score}>
        {score}
      </div>
    </div>
  );
};

export default TeamScore;

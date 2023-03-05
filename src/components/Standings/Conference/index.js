import { Fragment } from 'react';
import classnames from 'classnames';

import { teamLogo } from 'Utils/data/urls';

import styles from './styles.module.scss';

const Conference = function Conference(props) {
  const {
    conference,
    standings,
  } = props;

  return (
    <div className={styles.container}>
      <h2 className={styles.conference}>
        {`${conference} Conference`}
      </h2>
      <div className={styles.standings}>
        <>
          <div className={classnames(styles.header, styles.name)}>
            Team
          </div>
          <div />
          <div className={classnames(styles.header, styles.record)}>
            W
          </div>
          <div className={classnames(styles.header, styles.record)}>
            L
          </div>
          <div className={classnames(styles.header, styles.gamesBack)}>
            GB
          </div>
          <div className={styles.rule} />
        </>
        {standings.map((team, i) => (
          <Fragment key={team.teamId}>
            <div className={styles.rank}>
              {`${i + 1}.`}
            </div>
            <div className={styles.name}>
              <img
                className={styles.logo}
                src={teamLogo(team.teamId, { variant: 'D' })}
                alt={`${team.teamCity} ${team.teamName} logo`}
              />
              {`${team.teamCity} ${team.teamName}`}
            </div>
            <div className={styles.record}>
              {team.record.wins}
            </div>
            <div className={styles.record}>
              {team.record.losses}
            </div>
            <div className={styles.gamesBack}>
              {team.record.gamesBack || '—'}
            </div>
            {i < standings.length - 1 && (
              <div
                className={classnames(
                  styles.rule,
                  {
                    [styles.playIn]: i === 5,
                    [styles.notIn]: i === 9,
                  },
                )}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Conference;

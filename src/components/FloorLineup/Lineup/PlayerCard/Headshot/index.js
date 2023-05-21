import classnames from 'classnames';

import { playerHeadshot } from 'Utils/data/urls';

import styles from './styles.module.scss';

const Headshot = function Headshot(props) {
  const {
    player,
    league,
  } = props;

  const {
    status,
    personId,
    name,
  } = player;

  const isInactive = status === 'INACTIVE';

  return (
    <div className={styles.container}>
      <div
        className={classnames(
          styles.headshot,
          { [styles.inactive]: isInactive },
        )}
      >
        <img
          className={styles.headshotImage}
          src={playerHeadshot(personId, { league })}
          alt={`${name} headshot`}
        />
      </div>
    </div>
  );
};

Headshot.defaultProps = {
  league: 'nba',
};

export default Headshot;

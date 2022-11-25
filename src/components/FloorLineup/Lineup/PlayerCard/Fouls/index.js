import classnames from 'classnames';

import styles from './styles.module.scss';

const FOULS = [...Array(6)].map((_, i) => i);

const Fouls = function Fouls(props) {
  const {
    fouls,
  } = props;

  return (
    <div className={styles.container}>
      {FOULS.map((key) => (
        <div
          key={key}
          className={classnames(styles.foul, {
            [styles.slot]: key < FOULS.length - fouls,
          })}
        />
      ))}
    </div>
  );
};

Fouls.defaultProps = {
  fouls: 0,
};

export default Fouls;

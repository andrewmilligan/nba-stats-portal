import classnames from 'classnames';

import styles from './styles.module.scss';

const TIMEOUTS = [...Array(7)].map((_, i) => i);

const Timeouts = function Timeouts(props) {
  const {
    timeouts,
  } = props;

  return (
    <div className={styles.container}>
      {TIMEOUTS.map((key) => (
        <div
          key={key}
          className={classnames(styles.slot, {
            [styles.timeout]: key < timeouts,
          })}
        />
      ))}
    </div>
  );
};

Timeouts.defaultProps = {
  timeouts: 0,
};

export default Timeouts;

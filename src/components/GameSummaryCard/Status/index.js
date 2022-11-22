import classnames from 'classnames';

import statusCodeToSlug from 'Utils/gameStatus/statusCodeToSlug';

import styles from './styles.module.scss';

const Status = function Status(props) {
  const {
    gameStatus,
    gameStatusText,
  } = props;

  const statusSlug = statusCodeToSlug(gameStatus);

  return (
    <div className={styles.container}>
      <div>
        {gameStatusText}
      </div>
      <div
        className={classnames(
          styles.statusIndicator,
          styles[statusSlug],
        )}
      />
    </div>
  );
};

export default Status;

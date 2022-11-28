import classnames from 'classnames';

import statusCodeToSlug from 'Utils/gameStatus/statusCodeToSlug';
import StatusIndicator from 'Components/StatusIndicator';

import styles from './styles.module.scss';

const Status = function Status(props) {
  const {
    gameStatus,
    gameStatusText,
  } = props;

  return (
    <div className={styles.container}>
      <div>
        {gameStatusText}
      </div>
      <StatusIndicator gameStatus={gameStatus} />
    </div>
  );
};

export default Status;

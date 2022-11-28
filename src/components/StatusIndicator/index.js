import classnames from 'classnames';

import { ONGOING_CODE } from 'Utils/gameStatus/statuses';
import statusCodeToSlug from 'Utils/gameStatus/statusCodeToSlug';

import styles from './styles.module.scss';

const StatusIndicator = function StatusIndicator(props) {
  const {
    gameStatus,
  } = props;

  const statusSlug = statusCodeToSlug(gameStatus);

  if (gameStatus !== ONGOING_CODE) {
    return null;
  }

  return (
    <div
      className={classnames(
        styles.indicator,
        styles[statusSlug],
      )}
    />
  );
};

StatusIndicator.defaultProps = {
  isLive: false,
};

export default StatusIndicator;

import format from 'Utils/dates/format';

import styles from './styles.module.scss';

const GameDate = function GameDate(props) {
  const {
    gameMetadata,
  } = props;

  const {
    gameDateTime,
  } = gameMetadata;

  const date = format(gameDateTime, '{apdate}');

  return (
    <div className={styles.container}>
      {`${date}`}
    </div>
  );
};

export default GameDate;

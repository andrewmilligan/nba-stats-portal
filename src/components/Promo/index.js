import gameStatusText from 'Utils/gameStatus/gameStatusText';

import styles from './styles.module.scss';

const Promo = function Promo(props) {
  const {
    game,
  } = props;

  const text = 'Tune in for live results when the game starts.';

  return (
    <div className={styles.container}>
      {text}
    </div>
  );
};

export default Promo;

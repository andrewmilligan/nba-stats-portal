import classnames from 'classnames';

import styles from './styles.module.scss';

const Possession = function Possession(props) {
  const {
    hasPossession,
  } = props;

  return (
    <div
      className={classnames(
        styles.container,
        { [styles.possession]: hasPossession },
      )}
    >
      Possession
    </div>
  );
};

export default Possession;

import styles from './styles.module.scss';

const Action = function Action(props) {
  const {
    action,
  } = props;

  return (
    <div className={styles.container}>
      {action.description}
    </div>
  );
};

export default Action;

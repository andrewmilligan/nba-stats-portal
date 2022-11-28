import styles from './styles.module.scss';

const Name = function Name(props) {
  const {
    team,
  } = props;

  return (
    <div className={styles.container}>
      {team.teamTricode}
    </div>
  );
};

Name.defaultProps = {
  team: {},
};

export default Name;

import classnames from 'classnames';

import styles from './styles.module.scss';

const Name = function Name(props) {
  const {
    team,
    state,
    side,
  } = props;

  const hasPossession = state && state.possession === team.teamId;

  return (
    <div
      className={classnames(
        styles.container,
        styles[side],
      )}
    >
      {team.teamTricode}
      {hasPossession && (
        <div
          className={classnames(
            styles.possessionIndicator,
            styles[side],
          )}
        />
      )}
    </div>
  );
};

Name.defaultProps = {
  team: {},
};

export default Name;

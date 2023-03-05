import classnames from 'classnames';

import { FINAL } from 'Utils/gameStatus/statusFromLastAction';

import styles from './styles.module.scss';

const Name = function Name(props) {
  const {
    team,
    state,
    side,
  } = props;

  const hasPossession = state.possession === team.teamId;

  const {
    scoreHome = 0,
    scoreAway = 0,
  } = state;
  const homeTeamMargin = scoreHome - scoreAway;
  const homeTeamLeads = homeTeamMargin > 0;
  const hasWonIfFinal = (side === 'homeTeam') ? homeTeamLeads : !homeTeamLeads;
  const hasWon = state.status === FINAL && hasWonIfFinal;

  return (
    <div
      className={classnames(
        styles.container,
        styles[side],
      )}
    >
      {team.teamTricode}
      {(hasPossession || hasWon) && (
        <div
          className={classnames(
            styles.possessionIndicator,
            styles[side],
            { [styles.won]: hasWon },
          )}
        />
      )}
    </div>
  );
};

Name.defaultProps = {
  team: {},
  state: {},
};

export default Name;

import TeamLogo from './TeamLogo';
import Name from './Name';

const TeamName = function TeamName(props) {
  const {
    team,
    state,
    side,
  } = props;

  return (
    <div>
      <TeamLogo team={team} />
      <Name
        team={team}
        state={state}
        side={side}
      />
    </div>
  );
};

export default TeamName;

import TeamLogo from './TeamLogo';
import Name from './Name';

const TeamName = function TeamName(props) {
  const {
    team,
    state,
    side,
    league,
  } = props;

  return (
    <div>
      <TeamLogo
        team={team}
        league={league}
      />
      <Name
        team={team}
        state={state}
        side={side}
      />
    </div>
  );
};

export default TeamName;

import TeamLogo from './TeamLogo';
import Name from './Name';

const TeamName = function TeamName(props) {
  const {
    team,
  } = props;

  return (
    <div>
      <TeamLogo team={team} />
      <Name team={team} />
    </div>
  );
};

export default TeamName;

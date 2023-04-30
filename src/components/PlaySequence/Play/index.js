import Period from './Period';

const plays = {
  period: Period,
};

const Null = function Null(props) {
  const {
    actionType,
    subType,
    description,
  } = props;

  return (
    `[${actionType}: ${subType}] ${description}`
  );
};

const Play = function Play(props) {
  const {
    actionType,
  } = props;

  const Component = plays[actionType] || Null;

  return (
    <Component {...props} />
  );
};

export default Play;

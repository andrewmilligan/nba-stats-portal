import { ordinal } from 'journalize';

const Period = function Period(props) {
  const {
    subType,
    period,
  } = props;

  const name = `${ordinal(period, true)} period`;

  if (subType === 'start') {
    return `The ${name} is underway.`;
  }

  return `That's the end of the ${name}.`;
};

export default Period;

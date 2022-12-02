import parseClock from 'Utils/clock/parseClock';
import periodLabel from 'Utils/clock/periodLabel';
import teamMetadata from 'Utils/teams/metadata';

import {
  FINAL,
  PERIOD_END,
  TIMEOUT,
} from './statusFromLastAction';

const gameStatusTextFromState = function gameStatusTextFromState(state) {
  const {
    status,
    period,
    clock,
    teamId,
  } = state;

  if (status === FINAL) {
    return 'Final';
  }

  if (status === PERIOD_END) {
    return `End ${periodLabel(period)}`;
  }

  if (status === TIMEOUT) {
    const timeoutTeam = teamMetadata.get(teamId);
    return `Timeout ${timeoutTeam.teamTricode}`;
  }

  const { formattedMinutesSeconds } = parseClock(clock);
  return `${periodLabel(period)} ${formattedMinutesSeconds}`;
};

export default gameStatusTextFromState;

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

  const { formattedMinutesSeconds } = parseClock(clock);
  const time = `${periodLabel(period)} ${formattedMinutesSeconds}`;

  if (status === FINAL) {
    return 'Final';
  }

  if (status === PERIOD_END) {
    if (period === 2) {
      return 'Half';
    }

    return `End ${periodLabel(period)}`;
  }

  if (status === TIMEOUT) {
    const timeoutTeam = teamMetadata.get(teamId);
    return `${time}, TO ${timeoutTeam.teamTricode}`;
  }

  return time;
};

export default gameStatusTextFromState;

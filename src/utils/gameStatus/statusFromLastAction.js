export const TIMEOUT = 'timeout';
export const PERIOD_END = 'period-end';
export const FINAL = 'final';
export const PLAYING = 'playing';
export const BEFORE_TIPOFF = 'before-tipoff';

export const statusFromLastAction = function statusFromLastAction(action) {
  if (!action) {
    return {
      status: BEFORE_TIPOFF,
    };
  }

  const {
    actionType,
    subType,
    teamId,
  } = action;

  if (actionType === 'timeout') {
    return {
      status: TIMEOUT,
      teamId,
    };
  }

  if (actionType === 'period' && subType === 'end') {
    return {
      status: PERIOD_END,
    };
  }

  if (actionType === 'game' && subType === 'end') {
    return {
      status: FINAL,
    };
  }
};

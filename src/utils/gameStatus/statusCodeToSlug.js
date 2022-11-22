import {
  UPCOMING,
  ONGOING,
  COMPLETE,
  UPCOMING_CODE,
  ONGOING_CODE,
  COMPLETE_CODE,
} from './statuses';

const statuses = new Map([
  [UPCOMING_CODE, UPCOMING],
  [ONGOING_CODE, ONGOING],
  [COMPLETE_CODE, COMPLETE],
]);

const statusCodeToSlug = function statusCodeToSlug(status) {
  return statuses.get(status);
};

export default statusCodeToSlug;

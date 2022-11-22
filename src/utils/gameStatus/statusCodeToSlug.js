import {
  UPCOMING,
  ONGOING,
  COMPLETE,
} from './statuses';

const statuses = new Map([
  [1, UPCOMING],
  [2, ONGOING],
  [3, COMPLETE],
]);

const statusCodeToSlug = function statusCodeToSlug(status) {
  return statuses.get(status);
};

export default statusCodeToSlug;

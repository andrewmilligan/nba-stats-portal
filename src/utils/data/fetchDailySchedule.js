import fetchJson from './fetchJson';
import dataUrl from './dataUrl';

const fetchDailySchedule = async function fetchDailySchedule(date) {
  const url = dataUrl(`stats/global/daily-schedule/${date}.json`);
  return fetchJson(url);
};

export default fetchDailySchedule;

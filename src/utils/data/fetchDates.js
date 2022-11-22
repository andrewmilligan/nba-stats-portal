import fetchJson from './fetchJson';
import dataUrl from './dataUrl';

const fetchDates = async function fetchDates() {
  const url = dataUrl('stats/global/dates.json');
  return fetchJson(url);
};

export default fetchDates;

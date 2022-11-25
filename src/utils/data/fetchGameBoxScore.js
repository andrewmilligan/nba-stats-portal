import fetchJson from './fetchJson';
import dataUrl from './dataUrl';

const fetchGameBoxScore = async function fetchGameBoxScore(gameId) {
  const url = dataUrl(`stats/game/${gameId}/boxscore.json`);
  return fetchJson(url);
};

export default fetchGameBoxScore;

import getConfig from 'next/config';

const { publicRuntimeConfig = {} } = getConfig();
const {
  IS_DEVELOPMENT = false,
} = publicRuntimeConfig;
const baseUrl = IS_DEVELOPMENT
  ? '/nba/backend'
  : '';

export const dataUrl = function dataUrl(path) {
  return `${baseUrl}/${path}`;
};

export const dates = function dates() {
  return dataUrl('stats/global/dates.json');
};

export const dailySchedule = function dailySchedule(date) {
  if (!date) return undefined;
  return dataUrl(`stats/global/daily-schedule/${date}.json`);
};

export const gameBoxScore = function gameBoxScore(gameId) {
  if (!gameId) return undefined;
  return dataUrl(`stats/game/${gameId}/boxscore.json`);
};

export const gamePlayByPlay = function gamePlayByPlay(gameId) {
  if (!gameId) return undefined;
  return dataUrl(`stats/game/${gameId}/playbyplay.json`);
};

export const teamLogo = function teamLogo(teamId, opts = {}) {
  const {
    variant = 'L',
  } = opts;
  if (!teamId) return undefined;
  return dataUrl(`images/teams/logos/${teamId}/primary/${variant}/logo.svg`);
};

export const playerHeadshot = function playerHeadshot(personId, opts = {}) {
  const {
    variant = 'small',
  } = opts;
  if (!personId) return undefined;
  return dataUrl(`images/players/headshots/latest/${variant}/${personId}.png`);
};

import getAssetUrl from 'Utils/paths/getAssetUrl';

const IS_DEVELOPMENT = process.env.IS_DEVELOPMENT;
const baseUrl = IS_DEVELOPMENT
  ? getAssetUrl('backend').pathname
  : '';

export const dataUrl = function dataUrl(path) {
  return `${baseUrl}/${path}`;
};

export const dates = function dates() {
  return dataUrl('stats/global/dates.json');
};

export const dailyScoreboard = function dailyScoreboard() {
  return dataUrl('stats/global/scoreboard.json');
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

export const playerBoxScores = function playerBoxScores(teamId) {
  if (!teamId) return undefined;
  return dataUrl(`stats/team/${teamId}/playerBoxScores.json`);
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

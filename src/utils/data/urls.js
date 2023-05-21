import getAssetUrl from 'Utils/paths/getAssetUrl';

const IS_DEVELOPMENT = process.env.IS_DEVELOPMENT;
const baseUrl = IS_DEVELOPMENT
  ? getAssetUrl('backend').pathname
  : '';

export const dataUrl = function dataUrl(path) {
  return `${baseUrl}/${path}`;
};

export const dates = function dates(league = 'nba') {
  return dataUrl(`stats/${league}/global/dates.json`);
};

export const dailyScoreboard = function dailyScoreboard(league = 'nba') {
  return dataUrl(`stats/${league}/global/scoreboard.json`);
};

export const records = function records(league = 'nba') {
  return dataUrl(`stats/${league}/global/records.json`);
};

export const dailySchedule = function dailySchedule(date, league = 'nba') {
  if (!date) return undefined;
  return dataUrl(`stats/${league}/global/daily-schedule/${date}.json`);
};

export const gameBoxScore = function gameBoxScore(gameId, league = 'nba') {
  if (!gameId) return undefined;
  return dataUrl(`stats/${league}/game/${gameId}/boxscore.json`);
};

export const gamePlayByPlay = function gamePlayByPlay(gameId, league = 'nba') {
  if (!gameId) return undefined;
  return dataUrl(`stats/${league}/game/${gameId}/playbyplay.json`);
};

export const playerBoxScores = function playerBoxScores(teamId, league = 'nba') {
  if (!teamId) return undefined;
  return dataUrl(`stats/${league}/team/${teamId}/playerBoxScores.json`);
};

export const teamLogo = function teamLogo(teamId, opts = {}) {
  const {
    variant = 'L',
    league = 'nba',
  } = opts;
  if (!teamId) return undefined;
  return dataUrl(`images/${league}/teams/logos/primary/${variant}/${teamId}.svg`);
};

export const playerHeadshot = function playerHeadshot(personId, opts = {}) {
  const {
    variant = 'small',
    league = 'nba',
  } = opts;
  if (!personId) return undefined;
  return dataUrl(`images/${league}/players/headshots/latest/${variant}/${personId}.png`);
};

import formatPlay from './formatPlay';

export { stringify } from './tokens';

export const formatPlays = function formatPlays(plays) {
  if (!plays) return [];
  const formatted = plays.map(formatPlay).filter(Boolean);
  return formatted;
};

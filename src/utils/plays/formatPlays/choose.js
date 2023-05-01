const seededRandom = (seed) => {
  if (typeof seed === 'undefined') return Math.random();

  const seedNum = (typeof seed === 'number')
    ? seed
    : `${seed}`.split('').reduce((t, c) => t + c.charCodeAt(0), 0);

  const min = 0;
  const max = 1;

  const s = ((seedNum * 9301) + 49297) % 233280;
  const rnd = s / 233280;

  return min + rnd * (max - min);
}

const choose = function choose(choices, options = {}) {
  const {
    seed,
  } = options;

  if (!choices) return undefined;
  const n = choices.length;
  return choices[Math.floor(seededRandom(seed) * n)];
};

export default choose;

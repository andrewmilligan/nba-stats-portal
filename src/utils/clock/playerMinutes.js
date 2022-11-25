const playerMinutes = function playerMinutes(minutes) {
  const time = minutes.slice('PT'.length);
  const [min, seconds] = time.split('M');
  const sec = seconds.slice(0, -1 * 'S'.length);

  const numMinutes = +min;
  const numSeconds = +sec;
  const roundedSeconds = Math.round(numSeconds);
  const roundedMinutes = numMinutes + (numSeconds < 30 ? 0 : 1);
  const formattedMinutes = `${roundedMinutes}`;
  const formattedSeconds = `${roundedSeconds}`.padStart(2, '0');

  return {
    minutes: numMinutes,
    seconds: numSeconds,
    roundedMinutes,
    roundedSeconds,
    formattedMinutes,
    formattedSeconds,
    formattedMinutesSeconds: `${formattedMinutes}:${formattedSeconds}`,
  };
};

export default playerMinutes;

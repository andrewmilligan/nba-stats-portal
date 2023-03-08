const parseClock = function parseClock(minutes) {
  const time = minutes.slice('PT'.length);
  const [min, seconds] = time.split('M');
  const sec = seconds.slice(0, -1 * 'S'.length);

  const numMinutes = +min;
  const numSeconds = +sec;
  const roundedSeconds = Math.round(numSeconds);
  const roundedMinutes = numMinutes + (numSeconds < 30 ? 0 : 1);
  const formattedMinutes = `${numMinutes}`;
  const formattedSeconds = `${roundedSeconds}`.padStart(2, '0');
  const totalSeconds = numSeconds + (numMinutes * 60);

  return {
    minutes: numMinutes,
    seconds: numSeconds,
    totalSeconds,
    roundedMinutes,
    roundedSeconds,
    formattedMinutes,
    formattedSeconds,
    formattedMinutesSeconds: `${formattedMinutes}:${formattedSeconds}`,
  };
};

export default parseClock;

const periodLabel = function periodLabel(period) {
  const labelPrefix = period > 4 ? 'OT' : 'Q';
  const labelNum = period > 4 ? period - 4 : period;
  return `${labelPrefix}${labelNum}`;
};

export default periodLabel;

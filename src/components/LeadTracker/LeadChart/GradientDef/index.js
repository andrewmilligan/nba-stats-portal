const GradientDef = function GradientDef(props) {
  const {
    id,
    y1,
    y2,
    color: stopColor,
  } = props;

  return (
    <linearGradient
      id={id}
      x1="0"
      y1={y1}
      x2="0"
      y2={y2}
      gradientUnits="userSpaceOnUse"
    >
      <stop
        offset="0%"
        style={{
          stopColor,
          stopOpacity: 0.5,
        }}
      />
      <stop
        offset="100%"
        style={{
          stopColor,
          stopOpacity: 0.05,
        }}
      />
    </linearGradient>
  );
};

export default GradientDef;

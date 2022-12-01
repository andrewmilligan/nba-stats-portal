const Area = function Area(props) {
  const {
    area,
    line,
    stroke,
    fill,
  } = props;

  return (
    <g>
      <path
        d={area}
        fill={fill}
      />
      <path
        d={line}
        fill="none"
        stroke={stroke}
      />
    </g>
  );
};

export default Area;

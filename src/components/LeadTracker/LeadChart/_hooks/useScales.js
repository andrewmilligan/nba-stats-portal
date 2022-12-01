import { useMemo } from 'react';
import { scaleLinear } from 'd3-scale';
import { area, line, curveStepAfter } from 'd3-shape';

const useScales = function useScales(opts = {}) {
  const {
    maxTime,
    maxLead,
    width,
    height,
    margin,
  } = opts;

  return useMemo(() => {
    const clockScale = scaleLinear()
      .domain([0, maxTime])
      .range([margin.left, width - margin.right])

    const leadScale = scaleLinear()
      .domain([-maxLead, maxLead])
      .range([margin.top, height - margin.bottom]);

    const homeArea = area()
      .x((event) => clockScale(event.seconds))
      .y1(({ homeLead }) => (
        leadScale(Math.max(0, homeLead))
      ))
      .y0(leadScale(0))
      .curve(curveStepAfter);

    const homeLine = line()
      .x((event) => clockScale(event.seconds))
      .y(({ homeLead }) => (
        leadScale(Math.max(0, homeLead))
      ))
      .defined(({ homeLead }) => (
        homeLead >= 0
      ))
      .curve(curveStepAfter);

    const awayArea = area()
      .x((event) => clockScale(event.seconds))
      .y1(({ homeLead }) => (
        leadScale(Math.min(0, homeLead))
      ))
      .y0(leadScale(0))
      .curve(curveStepAfter);

    const awayLine = line()
      .x((event) => clockScale(event.seconds))
      .y(({ homeLead }) => (
        leadScale(Math.min(0, homeLead))
      ))
      .defined(({ homeLead }) => (
        homeLead <= 0
      ))
      .curve(curveStepAfter);

    return {
      clockScale,
      leadScale,
      homeArea,
      homeLine,
      awayArea,
      awayLine,
    };
  }, [
    maxTime,
    maxLead,
    width,
    height,
    margin.top,
    margin.right,
    margin.bottom,
    margin.left,
  ]);
};

export default useScales;

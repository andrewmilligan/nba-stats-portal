import { useMemo } from 'react';
import { scaleLinear } from 'd3-scale';
import { area, line, curveStepAfter } from 'd3-shape';

const useScales = function useScales(opts = {}) {
  const {
    maxTime,
    maxLead,
    width,
    height,
  } = opts;

  return useMemo(() => {
    const clockScale = scaleLinear()
      .domain([0, maxTime])
      .range([0, width])

    const leadScale = scaleLinear()
      .domain([-maxLead, maxLead])
      .range([0, height]);

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
  }, [maxTime, maxLead, width, height]);
};

export default useScales;

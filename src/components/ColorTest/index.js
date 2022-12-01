import { Fragment } from 'react';

import useResizeObserver from 'Utils/hooks/useResizeObserver';
import teamColors from 'Utils/teams/colors';
import sideColors from 'Utils/teams/sideColors';
import teamMetadata from 'Utils/teams/metadata';
import { teamLogo } from 'Utils/data/urls';

import styles from './styles.module.scss';

const ColorTest = function ColorTest() {
  return (
    <div className={styles.container}>
      {[...sideColors].map(([teamId, safeColors]) => {
        const team = teamMetadata.get(teamId);
        const colors = teamColors.get(teamId);
        return (
          <Fragment key={teamId}>
            <div>{team.teamTricode}</div>
            <div>
              <img
                className={styles.logo}
                src={teamLogo(teamId)}
              />
            </div>
            <div className={styles.canvasContainer}>
              {colors.map((backgroundColor, i) => (
                <div
                  key={i}
                  className={styles.swatch}
                  style={{ backgroundColor }}
                />
              ))}
            </div>
            <div className={styles.canvasContainer}>
              {safeColors.map((backgroundColor, i) => (
                <div
                  key={i}
                  className={styles.swatch}
                  style={{ backgroundColor }}
                />
              ))}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default ColorTest;

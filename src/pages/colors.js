import { Fragment } from 'react';
import Head from 'Components/Head';
import Navigation from 'Components/Navigation';
import Footer from 'Components/Footer';
import Well from 'Components/Well';
import colors from 'Utils/teams/sideColors';
import teamMeta from 'Utils/teams/metadata';
import { teamLogo } from 'Utils/data/urls';

export default function Home() {
  return (
    <div>
      <Head />
      <Navigation />
      <Well>
        {Object.entries(colors).map(([league, teams]) => (
          <div key={league}>
            <h2>{league.toUpperCase()}</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '200px max-content 1fr 1fr',
                gap: '1em',
                alignItems: 'center',
                marginBottom: '0.5em',
              }}
            >
              {[...teams].map(([id, colors]) => (
                <Fragment key={id}>
                  <img
                    src={teamLogo(id, { variant: 'D', league })}
                    alt={''}
                  />
                  <div>
                    {teamMeta[league].get(id).teamCity}
                    {' '}
                    {teamMeta[league].get(id).teamName}
                  </div>
                  {colors.slice(0, 2).map((color, i) => (
                    <div
                      key={i}
                      style={{
                        height: '100%',
                        backgroundColor: color,
                      }}
                    />
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
        <div>
        </div>
      </Well>
      <Footer />
    </div>
  )
}

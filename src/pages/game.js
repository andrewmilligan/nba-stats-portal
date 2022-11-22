import Head from 'next/head'
import fetch from 'isomorphic-unfetch';

export default function Game() {
  return (
    <div>
      <Head>
        <title>NBA Stats: Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export const getStaticProps = async function getStaticProps() {
  const rsp = await fetch('https://d19kaplwqv19rl.cloudfront.net/stats/global/dates.json');
  const dates = await rsp.json();
  return {
    props: {
      dates,
    },
  };
};

import Head from 'Components/Head';
import Navigation from 'Components/Navigation';
import Footer from 'Components/Footer';
import Well from 'Components/Well';
import ColorTest from 'Components/ColorTest';

export default function Home() {
  return (
    <div>
      <Head />
      <Navigation />
      <Well>
        <ColorTest />
      </Well>
      <Footer />
    </div>
  )
}

export const getStaticProps = async function getStaticProps() {
  return {
    props: {},
  };
};

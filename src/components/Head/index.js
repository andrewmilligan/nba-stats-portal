import NextHead from 'next/head';

import social from 'Images/social.png';
import getAssetUrl from 'Utils/paths/getAssetUrl';

const Head = function Head(props) {
  const {
    title,
    description,
    image,
  } = props;

  return (
    <NextHead>
      <title key="title">{title}</title>
      <link
        key="favicon"
        rel="icon"
        href={getAssetUrl('favicon.ico').href}
      />

      {/* Viewport */}
      <meta
        name="viewport"
        content={
          'minimum-scale=1, initial-scale=1, '
          + 'width=device-width, shrink-to-fit=no'
        }
      />

      {/* Social */}
      <meta
        key="description"
        name="description"
        content={description}
      />
      <meta
        key="twitter:card"
        property="twitter:card"
        content="summary_large_image"
      />
      <meta
        key="og:type"
        property="og:type"
        content="article"
      />
      <meta
        key="twitter:site"
        property="twitter:site"
        content="@andmilligan"
      />
      <meta
        key="twitter:creator"
        property="twitter:creator"
        content="@andmilligan"
      />
      <meta
        key="twitter:title"
        property="twitter:title"
        content={title}
      />
      <meta
        key="og:title"
        property="og:title"
        content={title}
      />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={description}
      />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta
        key="twitter:image"
        property="twitter:image"
        content={image}
      />
      <meta
        key="twitter:image:alt"
        property="twitter:image:alt"
        content={title}
      />
      <meta
        key="og:image"
        property="og:image"
        content={image}
      />
      <meta
        key="og:image:type"
        property="og:image:type"
        content={image}
      />
    </NextHead>
  );
};

Head.defaultProps = {
  title: 'NBA Stats',
  description: 'Live results and stats for NBA games.',
  image: getAssetUrl(social.src).href,
};

export default Head;

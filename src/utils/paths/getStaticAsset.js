import getConfig from 'next/config';

const { publicRuntimeConfig = {} } = getConfig();
const {
  basePath,
  deploymentDomain,
  IS_DEVELOPMENT = false,
} = publicRuntimeConfig;

const urlPrefix = IS_DEVELOPMENT
  ? basePath
  : `${deploymentDomain}${basePath}`;

const getStaticAsset = function getStaticAsset(path) {
  return `${urlPrefix}/${path}`;
};

export default getStaticAsset;

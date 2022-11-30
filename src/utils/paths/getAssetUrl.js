const basePath = process.env.BASE_PATH;
const deploymentDomain = process.env.DEPLOYMENT_DOMAIN;

// Deployment domain plus base path with single trailing slash even if
// basePath is just a single slash
const baseUrl = new URL(
  `${basePath}/`.replace(/[\/]+$/, '/'),
  deploymentDomain,
);

const getAssetUrl = function getAssetUrl(path) {
  return new URL(path, baseUrl);
};

export default getAssetUrl;

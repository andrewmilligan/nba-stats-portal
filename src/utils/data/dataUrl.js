const baseUrl = '/nba/backend';

const dataUrl = function dataUrl(path) {
  return `${baseUrl}/${path}`;
};

export default dataUrl;

import unfetch from 'isomorphic-unfetch';

const fetchJson = async function fetchJson(url) {
  const rsp = await unfetch(url);
  return rsp.json();
};

export default fetchJson;

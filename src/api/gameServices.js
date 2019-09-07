import URLSearchParams from 'url-search-params';

// // To see all the requests in the chrome Dev tools in the network tab.
// XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
//   GLOBAL.originalXMLHttpRequest :
//   GLOBAL.XMLHttpRequest;

// // fetch logger
// global._fetch = fetch;
// global.fetch = function (uri, options, ...args) {
//   return global._fetch(uri, options, ...args).then((response) => {
//     console.log('Fetch', { request: { uri, options, ...args }, status: response.status });
//     return response;
//   });
// };


const parseParams = (p = {}) => {
  const length = Object.keys(p).length;
  if (!length) { return ''; }
  const params = new URLSearchParams();
  Object.keys(p).forEach(key => params.append(key, p[key]));
  return `?${params.toString()}`;
}

class GameApiServices {
  headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dhbWUtdGVzdC5tb3Bjb24ub3JnL3JlZ2lzdGVyIiwiaWF0IjoxNTY3ODM0NDE4LCJuYmYiOjE1Njc4MzQ0MTgsImp0aSI6InlzUnRwMHlKNWhWR1VHaUMiLCJzdWIiOjE2LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.kKOsMBYULTV_bUTIk4leU1rlZd6GrDYHmOHQBQM518w',
  }
  get = (url, params) => {
    const options = {
      headers: this.headers,
      method: 'get',
    }
    return this.request(`${url}${parseParams(params)}`, options);
  }
  post = (url, data) => {
    const options = {
      headers: this.headers,
      method: 'post',
      body: JSON.stringify(data)
    }
    return this.request(url, options);
  }
  request = async (url, options) => {
    // const options = {
    //   headers: this.headers,
    //   method: this.method,
    // };
    let urlF = `https://game-test.mopcon.org${url}`;
    // if (this.data) { options.body = JSON.stringify(this.data); }
    // if (this.params) { url = `${url}${this.parseParams()}` }
    const result = await fetch(urlF, options);
    return await result.json();
  }
}

export default new GameApiServices();

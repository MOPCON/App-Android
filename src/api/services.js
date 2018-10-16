import URLSearchParams from 'url-search-params';

const parseParams = (p = {}) => {
  const params = new URLSearchParams();
  Object.keys(p).forEach(key => params.append(key, p[key]));
  return `?${params.toString()}`;
}

class ApiServices {
  headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
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
    let urlF = `${process.env.MOPCON_API_URL}${url}`;
    // if (this.data) { options.body = JSON.stringify(this.data); }
    // if (this.params) { url = `${url}${this.parseParams()}` }
    console.log(urlF, options);
    const result = await fetch(urlF, options);
    return await result.json();
  }
}

export default new ApiServices();

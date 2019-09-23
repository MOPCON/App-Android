import URLSearchParams from 'url-search-params';
import AsyncStorage from '@react-native-community/async-storage';

const parseParams = (p = {}) => {
  const length = Object.keys(p).length;
  if (!length) { return ''; }
  const params = new URLSearchParams();
  Object.keys(p).forEach(key => params.append(key, p[key]));
  return `?${params.toString()}`;
}

class GameApiServices {
  get = (url, params) => {
    const options = {
      method: 'get',
    };
    return this.request(`${url}${parseParams(params)}`, options);
  }
  post = (url, data) => {
    const options = {
      method: 'post',
      body: JSON.stringify(data)
    };
    return this.request(url, options);
  }
  request = async (url, originOptions) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const gameServer = await AsyncStorage.getItem('gameServer');
    const Authorization = await AsyncStorage.getItem('Authorization');
    if (Authorization) { headers.Authorization = Authorization; }

    const options = {
      ...originOptions,
      headers,
    };

    let urlF = `${gameServer}${url}`;
    // if (this.data) { options.body = JSON.stringify(this.data); }
    // if (this.params) { url = `${url}${this.parseParams()}` }
    try {
      const result = await fetch(urlF, options);
      const response = await result.json();
      console.log(urlF, options, response)
      if (result.status === 200) { return response; }
    } catch (e) {
      console.error(e);
      window.ee = e;
      throw e;
    }
  }
}

export default new GameApiServices();

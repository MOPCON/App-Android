import { URL, URLSearchParams } from 'whatwg-url';
import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-community/async-storage';

global.Buffer = Buffer;
global.URL = URL;
global.URLSearchParams = URLSearchParams;

// // To see all the requests in the chrome Dev tools in the network tab.
// XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
//   GLOBAL.originalXMLHttpRequest :
//   GLOBAL.XMLHttpRequest;


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

    const gameServer = global.gameServer;
    const Authorization = await AsyncStorage.getItem('Authorization');
    if (Authorization) { headers.Authorization = Authorization; }

    const options = {
      ...originOptions,
      headers,
    };

    const urlF = `${gameServer}${url}`;



    // if (this.data) { options.body = JSON.stringify(this.data); }
    // if (this.params) { url = `${url}${this.parseParams()}` }
    try {
      const result = await fetch(urlF, options);
      const response = await result.json();
      console.log(urlF, options, response)
      if (result.status === 200) { return response; }
    } catch (e) {
      throw e;
    }
  }
}

export default new GameApiServices();

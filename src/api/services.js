class ApiServices {
  headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  parseParams = () => {
    const params = new URLSearchParams();
    Object.keys(this.params).forEach(key => params.append(key, this.params[key]));
    return `?${params.toString()}`;
  }

  get = (url, params) => {
    this.method = 'get';
    this.url = url;
    this.params = params;
    delete this.data;
    return this.request();
  }
  post = (url, data) => {
    this.method = 'post';
    this.url = url;
    this.data = data;
    delete this.params;
    return this.request();
  }
  request = async () => {
    const options = {
      headers: this.headers,
      method: this.method,
    };
    let url = `${process.env.MOPCON_API_URL}${this.url}`;
    if (this.data) { options.body = JSON.stringify(this.data); }
    if (this.params) { url = `${url}${this.parseParams()}` }
    console.log(url, options);
    const result = await fetch(url, options);
    return await result.json();
  }
}

export default new ApiServices();

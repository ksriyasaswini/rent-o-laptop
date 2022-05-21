const host = "http://172.18.234.136:9000/";

const headers = new Headers();
headers.append('Accept', 'application/json');

headers.append('Access-Control-Allow-Origin', host);
headers.append('Access-Control-Allow-Credentials', 'true');

const apiService = {
  getRequest: function(uri, body) {
    const url = host + uri;
    console.log("Sending request to: "+ url);
    headers.append('Content-Type', 'aplication/json');
    return new Promise ((resolve, reject) => {
      this._fetch(url, body, 'GET', headers).then ((data) => {
        return resolve(data)
      }).catch((exe) => {
        return reject(exe)
      })
    })
  },

  postRequest: function(uri, body, contentType = 'aplication/json') {
    const url = host + uri;
    headers.append('Content-Type', contentType);

    console.log("Sending request to: "+ uri);
    return new Promise ((resolve, reject) => {
      this._fetch(url, body, 'POST', headers).then ((data) => {
        return resolve(data)
      }).catch((exe) => {
        return reject(exe)
      })
    })
  },

  putRequest: function(uri, body, contentType = 'aplication/json') {
    const url = host + uri;
    headers.append('Content-Type', contentType);

    console.log("Sending request to: "+ uri);
    return new Promise ((resolve, reject) => {
      this._fetch(url, body, 'PUT', headers).then ((data) => {
        return resolve(data)
      }).catch((exe) => {
        return reject(exe)
      })
    })
  },

  deleteRequest: function(uri, body, contentType = 'aplication/json') {
    const url = host + uri;
    headers.append('Content-Type', contentType);

    console.log("Sending request to: "+ uri);
    return new Promise ((resolve, reject) => {
      this._fetch(url, body, 'DELETE', headers).then ((data) => {
        return resolve(data)
      }).catch((exe) => {
        return reject(exe)
      })
    })
  },
  
  _fetch: function(url, body, method, headers) {
    return new Promise ((resolve, reject) => {
      fetch(url, {
          headers: headers,
          method: method,
          body: JSON.stringify(body) 
      }).then((response) => {
        response = response.json()
        console.log(JSON.stringify(response))
        return resolve(response);
      }).catch((exe) => {
        console.log("Can’t access " + url + " response. ");
        return reject(exe);
      })
    })
  }
};

export default apiService;
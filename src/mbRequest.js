export default {
  post(options) {
    const { url, body, json } = options;
    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    if (json) {
      request.body = JSON.stringify(body);
    }

    return fetch(url, request).then(results => this.processResults(results));
  },

  get(options) {
    const { url } = options;
    const request = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return fetch(url, request).then(results => this.processResults(results));
  },

  delete(options) {
    const { url } = options;
    const request = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return fetch(url, request).then(results => this.processResults(results));
  },

  processResults(results) {
    if (results.status > 299) {
      return results.json().then(resultsJson => Promise.reject(resultsJson));
    }

    if (results.status === 200 || results.status === 201) {
      return results.json();
    }

    return results;
  },
};

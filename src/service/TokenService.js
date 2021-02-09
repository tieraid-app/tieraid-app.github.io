class Service {
  accessToken = "access-token";
  refreshToken = "refresh-token";
  isLoggedIn = "is-logged-in";
  timerInterval = null;

  isAuthenticated = () => {
    const isLoggedIn = window.sessionStorage.getItem(this.isLoggedIn);
    return isLoggedIn ? true : false;
  };

  setAccessToken = (accessToken) => {
    window.sessionStorage.setItem(this.accessToken, accessToken);
  };

  getAccessToken = () => {
    return window.sessionStorage.getItem(this.accessToken);
  };

  getRefreshToken = () => {
    return window.sessionStorage.getItem(this.refreshToken);
  };

  setAuthenticated = (accessToken, refreshToken) => {
    window.sessionStorage.setItem(this.accessToken, accessToken);
    window.sessionStorage.setItem(this.refreshToken, refreshToken);
    window.sessionStorage.setItem(this.isLoggedIn, 'true');
  };

  deleteToken = () => {
    clearInterval(this.timerInterval);
    window.sessionStorage.removeItem(this.isLoggedIn);
    window.sessionStorage.removeItem(this.accessToken);
    window.sessionStorage.removeItem(this.refreshToken);
  };

  fetch = (url, options = {}) => {
    if (!('headers' in options)) {
      options.headers = {};
    }
    const token = this.getAccessToken();
    if (token !== null) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, options)
      .then((response) => {
        if (response.status === 401) {
          this.deleteToken();
        }
        return response;
      }).then(response => {
        if (!response.ok) {
          throw new Error(`Could not fetch ${url}`);
        }
        return response.json();
      })
  };

  startRefresh = () => {
    this.timerInterval = setInterval(() => {
      const refresh = this.getRefreshToken();
      if (refresh !== null) {
        this.fetch('/auth/refresh/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({refresh})
        }).then((token) => {
          const { access } = token;
          this.setAccessToken(access);
        });
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000 * 60 * 4);
  };
}

const TokenService = new Service();

export default TokenService;
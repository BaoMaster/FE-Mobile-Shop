const LocalStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    // localStorage.setItem('access_token', tokenObj.access_token);
    // localStorage.setItem('refresh_token', tokenObj.refresh_token);
  }
  function _getAccessToken() {
    if (localStorage.getItem('auth')) {
      return JSON.parse(localStorage.getItem('auth')).token;
    }
    // else {
    //   localStorage.setItem(
    //     'auth',
    //     JSON.stringify({
    //       token: '',
    //       username: '',
    //     })
    //   );
    // }
  }
  function _getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
  function _clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();
export default LocalStorageService;

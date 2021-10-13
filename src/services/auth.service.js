import http from '../http-common';
const API_URL = 'auth/';

const register = data => {
  return http.post(API_URL + 'signup', {
    data
  });
};

const login = (username, password) => {
  return http
    .post(API_URL + 'signin', {
      username,
      password,
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
// eslint-disable-next-line
export default {
  register,
  login,
  logout,
  getCurrentUser,
};

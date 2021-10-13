import axios from 'axios';
const user = JSON.parse(localStorage.getItem('user'));

const API_URL = 'http://api.klhealthcare.net:8080/api/ticket';

const remove = id => {
  console.log(id);
  return axios.delete(API_URL + '/delete/' + id, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': user.accessToken,
    },
  });
};

const getAll = () => {
  return axios.get(API_URL + '/getData', {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': user.accessToken,
    },
  });
};

const get = id => {
  return axios.get(API_URL + '/find/' + id, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': user.accessToken,
    },
  });
};
const update = (id, data) => {
  return axios.put(API_URL + '/update/' + id, data, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': user.accessToken,
    },
  });
};

// eslint-disable-next-line
export default { remove, getAll, update, get };

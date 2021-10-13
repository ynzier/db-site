import http from '../http-common';
const user = JSON.parse(localStorage.getItem('user'));

const create = data => {
  return http.post('/add', data, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': 'test',
    },
  });
};

const getAll = () => {
  return http.get('/getData', {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': 'test',
    },
  });
};
const getCustomerDetail = id => {
  return http.get(`/getCustomer/${id}`, {
    headers: {
      'Content-type': 'application/json',
    },
  });
};
const update = (id, data) => {
  return http.put(`/updateCustomer/${id}`, data);
};

const remove = id => {
  return http.delete(`/delete/${id}`, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': user.accessToken,
    },
  });
};
const getFreeTransID = () => {
  return http.get(`/getTransaction`, {
    headers: {
      'Content-type': 'application/json',
    },
  });
};
const createTransaction = data => {
  return http.post('/transaction', data, {
    headers: {
      'Content-type': 'application/json',
    },
  });
};

// eslint-disable-next-line
export default {
  create,
  getAll,
  update,
  remove,
  getCustomerDetail,
  createTransaction,
  getFreeTransID,
};

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
const getTransaction = id => {
  return http.get('/getTransaction/' + id, {
    headers: {
      'Content-type': 'application/json',
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
const createTransaction = (data, total) => {
  return http.post(
    '/transaction',
    { data, total },
    {
      headers: {
        'Content-type': 'application/json',
      },
    },
  );
};
const getAllReceipts = (id) => {
  return http.get(`/getAllReceipts/${id}`, {
    headers: {
      'Content-type': 'application/json',
    },
  });
};

const checkPayment = (id, data) => {
  return http.get(`/checkPayment/${id}`, {
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
  getAllReceipts,
  checkPayment,
  getTransaction,
};

import http from '../http-common';
const getAll = () => {
  return http.get('/admin/product/getAll', {
    headers: {
      'Content-type': 'application/json',
    },
  });
};

const getOne = id => {
  return http.get(`/admin/product/getOne/${id}`, {
    headers: {
      'Content-type': 'application/json',
    },
  });
};

// eslint-disable-next-line
export default {
  getAll,
  getOne,
};

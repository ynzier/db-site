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
const getProductType = () => {
  return http.get('/admin/product/getAllProductType', {
    headers: {
      'Content-type': 'application/json',
    },
  });
};
const updateStock = data => {
  return http.put('/updateStock', data, {
    headers: {
      'Content-type': 'application/json',
    },
  });
};
// eslint-disable-next-line
export default {
  getAll,
  getOne,
  updateStock,
  getProductType,
};

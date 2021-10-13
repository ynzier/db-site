import http from '../http-common';
const cust_no = JSON.parse(localStorage.getItem('user'))
  ? JSON.parse(localStorage.getItem('user')).custNo
  : '';

const getCart = id => {
  return http.get('/getCart/' + id, {
    headers: {
      'Content-type': 'application/json',
    },
  });
};

const addItem = (prod_id, data) => {
  return http.post(`/addItemToCart/${cust_no}/${prod_id}`, data, {
    headers: {
      'Content-type': 'application/json',
    },
  });
};

const deleteItem = prod_id => {
  return http.delete(`/deleteFromCart/${cust_no}/${prod_id}`, {
    headers: {
      'Content-type': 'application/json',
    },
  });
};

const getCustNo = () => {
  return JSON.parse(localStorage.getItem('user'));
};
// eslint-disable-next-line
export default {
  getCart,
  addItem,
  deleteItem,
  getCustNo,
};

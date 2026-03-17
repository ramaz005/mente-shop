import axios from 'axios';

export const getProducts = async () => {
  const res = await axios.get('mente-backend-production.up.railway.app/api/products?populate=*');
  return res.data.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`mente-backend-production.up.railway.app/api/products/${id}?populate=*`);
  return res.data.data;
};
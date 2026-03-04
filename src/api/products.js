import axios from 'axios';

export const getProducts = async () => {
  const res = await axios.get('http://localhost:1337/api/products');
  return res.data.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`http://localhost:1337/api/products/${id}`);
  return res.data.data;
};
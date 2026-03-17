import axios from 'axios';

const STRAPI = 'https://mente-backend-production.up.railway.app';

export const getProducts = async () => {
  const res = await axios.get(`${STRAPI}/api/products?populate=*`);
  return res.data.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${STRAPI}/api/products/${id}?populate=*`);
  return res.data.data;
};
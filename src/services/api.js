import axios from 'axios';

const API_URL = 'https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products';

export const fetchProducts = async (page, rows, sortBy, orderBy) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page,
        rows,
        sortBy,
        orderBy
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

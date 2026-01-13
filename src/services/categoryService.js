import api from '../utils/api';

export const getAllCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch categories',
    };
  }
};


export const getCategoryList = async () => {
  try {
    const response = await api.get('/products/category-list');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch category list',
    };
  }
};

export default {
  getAllCategories,
  getCategoryList,
};

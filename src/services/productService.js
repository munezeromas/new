import api from '../utils/api';

export const getAllProducts = async ({ limit = 100, skip = 0, select } = {}) => {
  try {
    let url = `/products?limit=${limit}&skip=${skip}`;
    if (select) {
      url += `&select=${select}`;
    }
    
    const response = await api.get(url);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch products',
    };
  }
};


export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch product',
    };
  }
};


export const searchProducts = async (query, { limit = 100, skip = 0 } = {}) => {
  try {
    const response = await api.get(`/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Search failed',
    };
  }
};


export const getProductsByCategory = async (category, { limit = 100, skip = 0 } = {}) => {
  try {
    const response = await api.get(`/products/category/${category}?limit=${limit}&skip=${skip}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch products by category',
    };
  }
};


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


export const getProductsSorted = async (sortBy, order = 'asc', { limit = 100, skip = 0 } = {}) => {
  try {
    const response = await api.get(`/products?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to sort products',
    };
  }
};


export const addProduct = async (productData) => {
  try {
    const response = await api.post('/products/add', productData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to add product',
    };
  }
};


export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update product',
    };
  }
};


export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to delete product',
    };
  }
};

export default {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  getAllCategories,
  getProductsSorted,
  addProduct,
  updateProduct,
  deleteProduct,
};

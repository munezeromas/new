import api from '../utils/api';

export const getAllCarts = async ({ limit = 10, skip = 0 } = {}) => {
  try {
    const response = await api.get(`/carts?limit=${limit}&skip=${skip}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch carts',
    };
  }
};


export const getCartById = async (id) => {
  try {
    const response = await api.get(`/carts/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch cart',
    };
  }
};

export const getUserCarts = async (userId) => {
  try {
    const response = await api.get(`/carts/user/${userId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch user carts',
    };
  }
};

/**
 * Add a new cart
 * POST https://dummyjson.com/carts/add
 * 
 * @param {Object} cartData 
 * @param {number} cartData.userId - User ID
 * @param {Array} cartData.products - Array of {id, quantity}
 */
export const addCart = async (cartData) => {
  try {
    const response = await api.post('/carts/add', cartData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to add cart',
    };
  }
};


export const updateCart = async (id, cartData) => {
  try {
    const response = await api.put(`/carts/${id}`, cartData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update cart',
    };
  }
};

export const deleteCart = async (id) => {
  try {
    const response = await api.delete(`/carts/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to delete cart',
    };
  }
};

export default {
  getAllCarts,
  getCartById,
  getUserCarts,
  addCart,
  updateCart,
  deleteCart,
};
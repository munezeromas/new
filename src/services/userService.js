import api from '../utils/api';

export const getAllUsers = async ({ limit = 30, skip = 0, select } = {}) => {
  try {
    let url = `/users?limit=${limit}&skip=${skip}`;
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
      error: error.response?.data?.message || 'Failed to fetch users',
    };
  }
};


export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch user',
    };
  }
};


export const searchUsers = async (query, { limit = 30, skip = 0 } = {}) => {
  try {
    const response = await api.get(`/users/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`);
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


export const filterUsers = async (filters, { limit = 30, skip = 0 } = {}) => {
  try {
    const queryParams = new URLSearchParams(filters);
    queryParams.append('limit', limit);
    queryParams.append('skip', skip);
    
    const response = await api.get(`/users/filter?${queryParams.toString()}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Filter failed',
    };
  }
};


export const getUsersSorted = async (sortBy, order = 'asc', { limit = 30, skip = 0 } = {}) => {
  try {
    const response = await api.get(`/users?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to sort users',
    };
  }
};


export const getUserCarts = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/carts`);
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


export const getUserPosts = async (userId, { limit = 10, skip = 0 } = {}) => {
  try {
    const response = await api.get(`/users/${userId}/posts?limit=${limit}&skip=${skip}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch user posts',
    };
  }
};


export const getUserTodos = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/todos`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch user todos',
    };
  }
};


export const addUser = async (userData) => {
  try {
    const response = await api.post('/users/add', userData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to add user',
    };
  }
};


export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update user',
    };
  }
};


export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data||message || 'Failed to delete user',
    };
  }
};

export default {
  getAllUsers,
  getUserById,
  searchUsers,
  filterUsers,
  getUsersSorted,
  getUserCarts,
  getUserPosts,
  getUserTodos,
  addUser,
  updateUser,
  deleteUser,
};

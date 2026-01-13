import api from '../utils/api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', {
      username,
      password,
      expiresInMins: 60, 
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed',
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to get user',
    };
  }
};


export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post('/auth/refresh', {
      refreshToken,
      expiresInMins: 60,
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Token refresh failed',
    };
  }
};

export default {
  login,
  getCurrentUser,
  refreshToken,
};
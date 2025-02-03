import axios from 'axios';

export const INVALID_CHARACTERS = ['<', '>', '\\', '`', '{', '|', '}'];

// Base Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/users',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function for error handling
const handleApiError = (error) => {
  console.error('API Error:', error?.response?.data || error.message);
  throw error.response?.data || error.message; // Re-throw for higher-level handling
};

const isTextValid = text => {
    for (let i = 0; i < INVALID_CHARACTERS.length; i++) {
      if (text.toString().includes(INVALID_CHARACTERS[i])) return false;
    }
    return true;
  }

const validateUsername = username => {
  const response = {};

  if (!username || !username.trim()) {
    response.isValid = false;
    response.validationMessage = 'Username is required'
  }

  if (!isTextValid(username)) {
    response.isValid = false;
    response.validationMessage = 'Username is invalid'
  }

  if (!Object.keys(response).includes('isValid')) {
    response.isValid = true;
    response.validationMessage = 'Username is available'
  }

  return response;
};

const validateEmail = email => {
  const response = {};

  if (!email || !email.trim()) {
    response.isValid = false;
    response.validationMessage = 'Email is required'
  }

  if (!isTextValid(email)) {
    response.isValid = false;
    response.validationMessage = 'Email is invalid'
  }

  if (!Object.keys(response).includes('isValid')) {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    response.isValid = isValid;
    response.validationMessage = isValid ? 'Email is available' : 'Invalid email format';
  }

  return response;
};

// API methods
const api = {
  // Fetch all users
  fetchUsers: async () => {
    try {
      const response = await axiosInstance.get('/');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Add a new user
  addUser: async (username, email) => {
    if (!username || !email) {
      throw new Error('Username and email are required to add a user.');
    }

    try {
      const response = await axiosInstance.post('/', { username, email });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update an existing user
  updateUser: async (id, username, email) => {
    if (!id || !username || !email) {
      throw new Error('ID, username, and email are required to update a user.');
    }

    try {
      const response = await axiosInstance.put(`/${id}`, { username, email });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Delete a user
  deleteUser: async (id) => {
    if (!id) {
      throw new Error('ID is required to delete a user.');
    }

    try {
      await axiosInstance.delete(`/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Check if a username is taken
  checkUsername: async (username) => {
    if (!username) throw new Error('Username is required to check availability.');

    try {
      const response = await axiosInstance.get(`/check-username/${username}`);
      return response.data.exists;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Check if an email is taken
  checkEmail: async (email) => {
    if (!email) throw new Error('Email is required to check availability.');

    try {
      const response = await axiosInstance.get(`/check-email/${email}`);
      return response.data.exists;
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default api;

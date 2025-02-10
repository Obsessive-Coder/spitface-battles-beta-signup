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

export const validateUsername = username => {
  const response = { isValid: true, message: "Valid username." };

  // Check for valid characters (letters, numbers, _.-')
  const validCharacters = /^[a-zA-Z0-9._'-]+$/;
  if (!validCharacters.test(username)) {
    response.isValid = false;
    response.message = "Username can only contain letters, numbers, and the characters: _ . ' -";
  }

  // Check for consecutive spaces or special characters
  if (/( {2,}|[-'._]{2,})/.test(username)) {
    response.isValid = false;
    response.message = "No consecutive spaces or special characters are allowed.";
  }

  // Check length (between 3 and 22 characters)
  if (username.length < 3 || username.length > 22) {
    response.isValid = false;
    response.message = "Username must be between 3 and 22 characters.";
  }

  return response;
};

export const validateEmail = email => {
  const response = { isValid: true, message: "Valid email address." };

  // Regular expression for validating an email address
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Check if the email matches the general pattern
  if (!emailRegex.test(email)) {
    response.isValid = false;
    response.message = "Please enter a valid email address.";
  }

  // Check if the email is too short or too long (basic limits)
  if (email.length < 5 || email.length > 100) {
    response.isValid = false;
    response.message = "Email must be between 5 and 100 characters.";
  }

  return response;
};

// API methods
export const api = {
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

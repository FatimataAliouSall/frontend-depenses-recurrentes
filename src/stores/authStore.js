import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
  }),
  actions: {
    async login(usernameOrEmail, password) {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          username: usernameOrEmail,
          password,
        });

        // Log the complete response for debugging
        console.log('Full response:', response.data);

        // Destructure the tokens properly
        const { token, userId, username } = response.data;

        console.log('Token received:', token);

        this.isAuthenticated = true;
        this.token = token;
        this.user = { userId, username }; // Stocker les informations utilisateur
        localStorage.setItem('authToken', token);

        // Add the token to Axios headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw new Error('Login failed.');
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      localStorage.removeItem('authToken');
      delete axios.defaults.headers.common['Authorization']; // Remove token from Axios headers
    },

    checkAuth() {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.isAuthenticated = true;
        this.token = token;
        // Vous pouvez également récupérer les informations de l'utilisateur ici si nécessaire
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        this.isAuthenticated = false;
      }
    },
  },
});

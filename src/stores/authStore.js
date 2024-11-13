import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
    loginErrors: [], // Stocker les erreurs de login
  }),
  actions: {
    async login(usernameOrEmail, password) {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          username: usernameOrEmail,
          password,
        });

        // Vérifiez la réponse et assurez-vous qu'elle contient le token, l'ID utilisateur et le nom d'utilisateur
        const { token, userId, username } = response.data;
        if (!token || !userId || !username) {
          throw new Error('Données de connexion incorrectes reçues');
        }

        // Mettre à jour l'état d'authentification et stocker le token
        this.isAuthenticated = true;
        this.token = token;
        this.user = { userId, username };
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Réinitialiser les erreurs de connexion
        this.loginErrors = [];
      } catch (error) {
        // Réinitialisez l'état en cas d'erreur
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;

        // Vérifiez et enregistrez les erreurs spécifiques pour les afficher
        if (error.response && error.response.data && error.response.data.errors) {
          this.loginErrors = error.response.data.errors.map(err => err.msg);
        } else {
          this.loginErrors = ['La connexion a échoué.'];
        }

        console.error('Erreur de connexion:', this.loginErrors);
        throw new Error('La connexion a échoué.');
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      localStorage.removeItem('authToken');
      delete axios.defaults.headers.common['Authorization'];
    },

    checkAuth() {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.isAuthenticated = true;
        this.token = token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        this.isAuthenticated = false;
      }
    },
  },
});

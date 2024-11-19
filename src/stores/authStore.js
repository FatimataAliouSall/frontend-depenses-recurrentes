import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null, // Stockage des informations utilisateur
    role: '', // Rôle de l'utilisateur
    token: null, // Jeton JWT
    loginErrors: [], // Gestion des erreurs de connexion
  }),

  actions: {
    // Action pour se connecter
    async login(email, password) {
      console.log('Tentative de connexion...');
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email,
          password,
        });

        const { token, userId, username, role } = response.data;

        // Mise à jour de l'état
        this.isAuthenticated = true;
        this.token = token;
        this.user = { userId, username };
        this.role = role;
        this.loginErrors = [];

        // Stockage local et configuration axios
        localStorage.setItem('authToken', token);
        localStorage.setItem('authUser', JSON.stringify(this.user));
        localStorage.setItem('authRole', this.role);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // console.log(`Connexion réussie. Utilisateur connecté : ${username}, Rôle : ${role}`);
      } catch (error) {
        console.error('Erreur lors de la connexion :', error.response?.data || error);

        // Réinitialisation de l'état en cas d'échec
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;
        this.role = '';
        
        if (error.response?.data?.message) {
          this.loginErrors = [error.response.data.message];
        } else {
          this.loginErrors = ['Erreur inconnue lors de la connexion.'];
        }

        throw new Error(this.loginErrors[0]);
      }
    },

    // Action pour se déconnecter
    logout() {
      console.log('Déconnexion...');
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      this.role = '';

      // Nettoyage du stockage local
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      localStorage.removeItem('authRole');

      delete axios.defaults.headers.common['Authorization'];
      console.log('Déconnexion réussie.');
    },

    // Vérification de l'état d'authentification
    checkAuth() {
      console.log('Vérification de l’état d’authentification...');
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('authUser');
      const role = localStorage.getItem('authRole');

      if (token && user) {
        console.log('Token et utilisateur trouvés.');
        this.isAuthenticated = true;
        this.token = token;
        this.user = JSON.parse(user);
        this.role = role || '';
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        console.warn('Aucun token ou utilisateur trouvé. Réinitialisation de l’état.');
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;
        this.role = '';
      }
    },
  },
});

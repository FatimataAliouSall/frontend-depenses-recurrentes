import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
    user: {
      username: '',
      email: '',
      role: '',
      status: true,
    },
    isLoading: false,
    error: null,
  }),

  actions: {
    // Charger la liste des utilisateurs (existante)
    async loadUserData() {
      this.users = [];
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        if (response.status === 200) {
          this.users = response.data;
        } else {
          console.error('Échec du chargement des utilisateurs avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors du chargement des utilisateurs';
        console.error('Erreur lors du chargement des utilisateurs :', error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    // Ajouter un nouvel utilisateur (existante)
    async addUser(user) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post('http://localhost:3000/api/users', user);
        if (response.status === 201) {
          this.users.push(response.data); 
        } else {
          console.error('Échec de l\'ajout de l\'utilisateur avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de l\'ajout de l\'utilisateur';
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error.response?.data || error.message);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Récupérer l'utilisateur connecté (nouvelle méthode)
    async getProfil() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/api/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assurez-vous que le token est bien présent
          },
        });
    
        if (response.status === 200) {
          this.user = response.data; // Sauvegarde des données de l'utilisateur dans le state
          console.log('Utilisateur récupéré :', this.user); // Affiche les données utilisateur dans la console
        } else {
          console.error('Échec de la récupération du profil avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la récupération du profil';
        console.error('Erreur lors de la récupération du profil :', error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    // Mettre à jour le profil de l'utilisateur (nouvelle méthode)
    async updateProfile(user) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.put(`http://localhost:3000/api/profile${user.id}`, user, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.status === 200) {
          this.user = response.data; // Mettre à jour l'utilisateur avec les nouvelles données
        } else {
          console.error('Échec de la mise à jour du profil avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la mise à jour du profil';
        console.error('Erreur lors de la mise à jour du profil :', error.response?.data || error.message);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Méthode existante pour supprimer un utilisateur
    async removeUser(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.delete(`http://localhost:3000/api/users/${id}`);
        if (response.status === 200) {
          await this.loadUserData();
        } else {
          console.error('Échec de la suppression de l\'utilisateur avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la suppression de l\'utilisateur';
        console.error('Erreur lors de la suppression de l\'utilisateur :', error.response?.data || error.message);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Méthode existante pour récupérer un utilisateur par ID
    async getUserById(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`);
        if (response.status === 200) {
          this.user = response.data; 
        } else {
          console.error('Échec de la récupération de l\'utilisateur avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la récupération de l\'utilisateur';
        console.error('Erreur lors de la récupération de l\'utilisateur :', error.response?.data || error.message);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Méthode existante pour mettre à jour un utilisateur
    async updateUser(user) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.put(`http://localhost:3000/api/users/${user.id}`, user);
        if (response.status === 200) {
          const index = this.users.findIndex(u => u.id === user.id);
          if (index !== -1) {
            this.users[index] = response.data;
          }
        } else {
          console.error('Échec de la mise à jour de l\'utilisateur avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la mise à jour de l\'utilisateur';
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error.response?.data || error.message);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

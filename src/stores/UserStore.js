// stores/UserStore.js
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
    }
  }),

  actions: {
    async loadUserData() {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        if (response.status === 200) {
          this.users = response.data;
        } else {
          console.error('Échec du chargement des utilisateurs avec le statut :', response.status);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs :', error.response?.data || error.message);
      }
    },

    async addUser(user) {
      try {
        const response = await axios.post('http://localhost:3000/api/users', user);
        if (response.status === 201) {
          this.users.push(response.data); 
        } else {
          console.error('Échec de l\'ajout de l\'utilisateur avec le statut :', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error.response?.data || error.message);
        throw error;
      }
    },

    async removeUser(id) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/users/${id}`);
        if (response.status === 200) {
          await this.loadUserData();
        } else {
          console.error('Échec de la suppression de l\'utilisateur avec le statut :', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error.response?.data || error.message);
        throw error;
      }
    },

    // Nouvelle méthode pour récupérer un utilisateur par son ID
    async getUserById(id) {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`);
        if (response.status === 200) {
          this.user = response.data; // Met à jour l'utilisateur dans le state
        } else {
          console.error('Échec de la récupération de l\'utilisateur avec le statut :', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error.response?.data || error.message);
        throw error;
      }
    },

    // Nouvelle méthode pour mettre à jour un utilisateur
    async updateUser(user) {
      try {
        const response = await axios.put(`http://localhost:3000/api/users/${user.id}`, user);
        if (response.status === 200) {
          // Optionnel : Vous pouvez mettre à jour la liste des utilisateurs ici si nécessaire
          const index = this.users.findIndex(u => u.id === user.id);
          if (index !== -1) {
            this.users[index] = response.data; // Mise à jour de l'utilisateur dans le state
          }
        } else {
          console.error('Échec de la mise à jour de l\'utilisateur avec le statut :', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error.response?.data || error.message);
        throw error;
      }
    }
  }
});

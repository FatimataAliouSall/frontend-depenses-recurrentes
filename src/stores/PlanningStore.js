// stores/PlanningStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePlanningStore = defineStore('planningStore', {
  state: () => ({
    plannings: [],
    isLoading: false,
    error: null,
    successMessage: null,
  }),

  actions: {
    async loadPlannings() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/api/planning'); // URL corrigée
        this.plannings = response.data;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors du chargement des plannings';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async createPlanning(name, startDate, endDate, amount, expenseId) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.post('http://localhost:3000/api/planning', { name, startDate, endDate, amount, expenseId });
        this.plannings.push(response.data.newPlanning);
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la création du planning';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async updatePlanning(id, name, startDate, endDate, amount) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.put(`http://localhost:3000/api/planning/${id}`, { name, startDate, endDate, amount });
        const index = this.plannings.findIndex((planning) => planning.id === id);
        if (index !== -1) this.plannings[index] = response.data.updatedPlanning;
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la mise à jour du planning';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async deletePlanning(id) { // méthode renommée
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.delete(`http://localhost:3000/api/planning/${id}`);
        this.plannings = this.plannings.filter((planning) => planning.id !== id);
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la suppression du planning';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

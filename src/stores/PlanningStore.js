// stores/PlanningStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePlanningStore = defineStore('planningStore', {
  state: () => ({
    plannings: [],
    planning: {
      id: null,
      name: '',
      startDate: '',
      endDate: '',
      amount: '',
      expense: '',

    },
    isLoading: false,
    error: null,
    successMessage: null,
  }),

  actions: {
    async loadPlannings() {
      this.plannings = [];
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/api/planning'); 
        this.plannings = response.data;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors du chargement des plannings';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async addPlanning(planning) {
      if (!planning.name) {
        this.error = 'Le nom de la planification est requis.';
        return;
      }
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.post('http://localhost:3000/api/planning', planning);
        if (response.status === 201) {
          this.plannings.push(response.data); 
          this.successMessage = 'Planification ajoutée avec succès !';
        } else {
          console.error('Échec de l\'ajout de la planification avec le statut :', response.status);
        }
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la création du planning';
        console.error(this.error,error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async updatePlanning(planning) {
      if (!planning.name) {
        this.error = 'Le nom de la planification est requis.';
        return;
      }
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.put(`http://localhost:3000/api/planning/${planning.id}`, planning);
        if (response.status === 200) {
          const index = this.plannings.findIndex(ec => ec.id === planning.id);
          if (index !== -1) {
            this.plannings[index] = response.data;
            this.successMessage = 'planification mise à jour avec succès !';
          }
        } else {
          console.error('Échec de la mise à jour de la planification avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la mise à jour de planification';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async removePlanning(id) { 
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.delete(`http://localhost:3000/api/planning/${id}`);
        if (response.status === 200) {
          this.plannings = this.plannings.filter(planning => planning.id !== id);
          this.successMessage = 'planification supprimée avec succès !';
        } else {
          console.error('Échec de la suppression de la planification avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la suppression de la planification';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },
    async getPlanningById(id) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(`http://localhost:3000/api/planning/${id}`);
        if (response.status === 200) {
          this.planning = response.data; 
        } else {
          console.error('Échec de la récupération de la  planification avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la récupération de la planificatiion';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

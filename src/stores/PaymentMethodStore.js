// stores/PaymentMethodStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePaymentMethodStore = defineStore('paymentMethodStore', {
  state: () => ({
    paymentMethods: [],
    isLoading: false,
    error: null,
    successMessage: null,
  }),

  actions: {
    // Charger les méthodes de paiement
    async loadPaymentMethods() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/api/payment-methods');
        this.paymentMethods = response.data;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors du chargement des méthodes de paiement';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    // Créer une nouvelle méthode de paiement
    async createPaymentMethod(name, status, userId) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.post('http://localhost:3000/api/payment-methods', { name, status, userId });
        this.paymentMethods.push(response.data.newPaymentMethod); // Ajouter la nouvelle méthode localement
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la création de la méthode de paiement';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    // Mettre à jour une méthode de paiement existante
    async updatePaymentMethod(id, name, status) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.put(`http://localhost:3000/api/payment-methods/${id}`, { name, status });
        const index = this.paymentMethods.findIndex((method) => method.id === id);
        if (index !== -1) this.paymentMethods[index] = response.data.updatedPaymentMethod; // Mettre à jour localement
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la mise à jour de la méthode de paiement';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    // Supprimer une méthode de paiement
    async deletePaymentMethod(id) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.delete(`http://localhost:3000/api/payment-methods/${id}`);
        this.paymentMethods = this.paymentMethods.filter((method) => method.id !== id); // Filtrer la méthode supprimée
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la suppression de la méthode de paiement';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

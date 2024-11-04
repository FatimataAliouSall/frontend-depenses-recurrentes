// stores/PaymentStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePaymentStore = defineStore('paymentStore', {
  state: () => ({
    payments: [],
    isLoading: false,
    error: null,
    successMessage: null,
  }),

  actions: {
    async loadPayments() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/api/payments');
        this.payments = response.data;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors du chargement des paiements';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async createPayment(amount, paymentDate, reference, userId, planningId, paymentMethodId, expenseId) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.post('http://localhost:3000/api/payments', { amount, paymentDate, reference, userId, planningId, paymentMethodId, expenseId });
        this.payments.push(response.data.newPayment);
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la création du paiement';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async updatePayment(id, amount, paymentDate, reference) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.put(`http://localhost:3000/api/payments/${id}`, { amount, paymentDate, reference });
        const index = this.payments.findIndex((payment) => payment.id === id);
        if (index !== -1) this.payments[index] = response.data.updatedPayment;
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la mise à jour du paiement';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async deletePayment(id) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.delete(`http://localhost:3000/api/payments/${id}`);
        this.payments = this.payments.filter((payment) => payment.id !== id);
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la suppression du paiement';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

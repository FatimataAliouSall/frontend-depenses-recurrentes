import { defineStore } from 'pinia';
import axios from 'axios';

export const usePaymentStore = defineStore('paymentStore', {
  state: () => ({
    expenses: [],
    paymentMethods: [],
    plannings: [],
    payments: [],
    payment: {
      id: null,
      amount: '',
      paymentDate: '',
      reference: '',
      userId: null,
      planning: '',
      paymentMethod: '',
      expenses: '',
    },
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
        if (response.status === 200) {
          this.payments = response.data;
        } else {
          console.error('Échec du chargement des paiements avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors du chargement des paiements';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async addPayment(payment) {
      if (!payment.amount || !payment.paymentDate) {
        this.error = 'Le montant et la date de paiement sont requis.';
        return;
      }
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.post('http://localhost:3000/api/payments', payment);
        if (response.status === 201) {
          this.payments.push(response.data);
          this.successMessage = 'Paiement ajouté avec succès !';
        } else {
          console.error('Échec de la création du paiement avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la création du paiement';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async updatePayment(payment) {
      if (!payment.amount || !payment.paymentDate) {
        this.error = 'Le montant et la date de paiement sont requis.';
        return;
      }
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.put(`http://localhost:3000/api/payments/${payment.id}`, payment);
        if (response.status === 200) {
          const index = this.payments.findIndex(p => p.id === payment.id);
          if (index !== -1) {
            this.payments[index] = response.data;
            this.successMessage = 'Paiement mis à jour avec succès !';
          }
        } else {
          console.error('Échec de la mise à jour du paiement avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la mise à jour du paiement';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async removePayment(id) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.delete(`http://localhost:3000/api/payments/${id}`);
        if (response.status === 200) {
          this.payments = this.payments.filter(payment => payment.id !== id);
          this.successMessage = 'Paiement supprimé avec succès !';
        } else {
          console.error('Échec de la suppression du paiement avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la suppression du paiement';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async getPaymentById(id) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(`http://localhost:3000/api/payments/${id}`);
        if (response.status === 200) {
          this.payment = response.data;
        } else {
          console.error('Échec de la récupération du paiement avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la récupération du paiement';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async getRequirements() {
      try {
        const response = await axios.get('http://localhost:3000/api/payments-requirements');
        if (response.status === 200) {
          this.plannings = response.data.plannings;
          this.paymentMethods = response.data.paymentMethods;
          console.log(response.data);
        } else {
          console.error('Échec de la récupération du paiement avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la récupération du paiement';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

  }
});

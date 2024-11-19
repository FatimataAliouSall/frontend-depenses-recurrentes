
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePaymentMethodStore = defineStore('paymentMethodStore', {
  
  state: () => ({
    paymentMethods: [],
    paymentMethod: {
      id: null,
      name: '',
      status: true,
      userId: null,
    },
    isLoading: false,
    error: null,
    successMessage: null,
  }),

  actions: {
    async loadPaymentMethods() {
      this.paymentMethods = [];
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/api/payment-methods');
        if (response.status === 200) {
          this.paymentMethods = response.data;
        } else {
          console.error('Échec du chargement des paymentMethods avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors du chargement des paymentMethods';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async addPaymentMethod(paymentMethod) {
      if (!paymentMethod.name) {
        this.error = 'Le nom de la paymentMethod est requis.';
        return;
      }
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.post('http://localhost:3000/api/payment-methods', paymentMethod);
        if (response.status === 201) {
          this.paymentMethods.push(response.data);
          this.successMessage = 'PaymentMethod ajoutée avec succès !';
        } else {
          console.error('Échec de l\'ajout de paymentMethod avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la création de la méthode de paiement';
        console.error(this.error , error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    
    async updatePaymentMethod(paymentMethod) {
      if (!paymentMethod.name) {
        this.error = 'Le nom de la paymentMethod est requis.';
        return;
      }

      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.put(`http://localhost:3000/api/payment-methods/${paymentMethod.id}`, paymentMethod);
        if (response.status === 200) {
          const index = this.paymentMethods.findIndex(ec => ec.id === paymentMethod.id);
          if (index !== -1) {
            this.paymentMethods[index] = response.data;
            this.successMessage = 'paymentMethod mise à jour avec succès !';
          }
        } else {
          console.error('Échec de la mise à jour de la paymentMethods avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la mise à jour de paymentMethod';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async removePaymentMethod(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.delete(`http://localhost:3000/api/payment-methods/${id}`);
        if (response.status === 200) {
          this.paymentMethods = this.paymentMethods.filter(paymentMethod => paymentMethod.id !== id);
          this.successMessage = 'paymentMethod supprimée avec succès !';
        } else {
          console.error('Échec de la suppression de la paymentMethod avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la suppression de la paymentMethod';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },
    async getPaymentMethodById(id) {
      this.isLoading = true;
      this.error = null;                                                                                                                                      

      try {
        const response = await axios.get(`http://localhost:3000/api/payment-methods/${id}`);
        if (response.status === 200) {
          this.paymentMethod = response.data; 
        } else {
          console.error('Échec de la récupération de la paymentMethod avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la récupération de la paymentMethod';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

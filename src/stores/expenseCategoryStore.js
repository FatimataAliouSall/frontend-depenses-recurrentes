import { defineStore } from 'pinia';
import axios from 'axios';

export const useExpenseCategoryStore = defineStore('expenseCategoryStore', {
  state: () => ({
    expenseCategories: [],
    expenseCategory: {
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
    async loadExpenseCategories() {
      this.expenseCategories = [];
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/api/expense-categories');
        if (response.status === 200) {
          this.expenseCategories = response.data;
        } else {
          console.error('Échec du chargement des catégories de dépenses avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors du chargement des catégories de dépenses';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async addExpenseCategory(expenseCategory) {
      if (!expenseCategory.name) {
        this.error = 'Le nom de la catégorie est requis.';
        return;
      }

      this.isLoading = true;
      this.error = null;
      this.successMessage = null;

      try {
        const response = await axios.post('http://localhost:3000/api/expense-categories', expenseCategory);
        if (response.status === 201) {
          this.expenseCategories.push(response.data);
          this.successMessage = 'Catégorie ajoutée avec succès !';
        } else {
          console.error('Échec de l\'ajout de la catégorie de dépenses avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de l\'ajout de la catégorie de dépenses';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async removeExpenseCategory(id) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.delete(`http://localhost:3000/api/expense-categories/${id}`);
        if (response.status === 200) {
          this.expenseCategories = this.expenseCategories.filter(category => category.id !== id);
          this.successMessage = 'Catégorie supprimée avec succès !';
        } else {
          console.error('Échec de la suppression de la catégorie de dépenses avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la suppression de la catégorie de dépenses';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async updateExpenseCategory(expenseCategory) {
      if (!expenseCategory.name) {
        this.error = 'Le nom de la catégorie est requis.';
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.put(`http://localhost:3000/api/expense-categories/${expenseCategory.id}`, expenseCategory);
        if (response.status === 200) {
          const index = this.expenseCategories.findIndex(ec => ec.id === expenseCategory.id);
          if (index !== -1) {
            this.expenseCategories[index] = response.data;
            this.successMessage = 'Catégorie mise à jour avec succès !';
          }
        } else {
          console.error('Échec de la mise à jour de la catégorie de dépenses avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la mise à jour de la catégorie de dépenses';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async getExpenseCategoryById(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://localhost:3000/api/expense-categories/${id}`);
        if (response.status === 200) {
          this.expenseCategory = response.data; // Mettez à jour `this.expenseCategory`
        } else {
          console.error('Échec de la récupération de la catégorie de dépenses avec le statut :', response.status);
        }
      } catch (error) {
        this.error = 'Erreur lors de la récupération de la catégorie de dépenses';
        console.error(this.error, error.response?.data || error.message);
      } finally {
        this.isLoading = false;
      }
    },
    
    
  },
});

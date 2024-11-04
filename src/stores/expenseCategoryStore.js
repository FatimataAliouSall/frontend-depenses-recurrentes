import { defineStore } from 'pinia';
import axios from 'axios';

export const useExpenseCategoryStore = defineStore('expenseCategoryStore', {
  state: () => ({
    categories: [],
    isLoading: false,
    error: null,
    successMessage: null,
  }),

  actions: {
    async loadExpenseCategories() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/api/expense-categories');
        this.categories = response.data;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors du chargement des catégories de dépenses';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
    async createExpenseCategory(name, status, userId) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;

      try {
        const response = await axios.post('http://localhost:3000/api/expense-categories', {
          name,
          status,
          userId
        });
        this.categories.push(response.data.newCategory);
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la création de la catégorie de dépenses';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async updateExpenseCategory(id, name, status) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;

      try {
        const response = await axios.put(`http://localhost:3000/api/expense-categories/${id}`, {
          name,
          status
        });
        const index = this.categories.findIndex((category) => category.id === id);
        if (index !== -1) this.categories[index] = response.data.updatedCategory;
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la mise à jour de la catégorie de dépenses';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async deleteExpenseCategory(id) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;

      try {
        const response = await axios.delete(`http://localhost:3000/api/expense-categories/${id}`);
        this.categories = this.categories.filter((category) => category.id !== id);
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la suppression de la catégorie de dépenses';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
  }
});

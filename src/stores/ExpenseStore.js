// stores/ExpenseStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useExpenseStore = defineStore('expenseStore', {
  state: () => ({
    expenses: [],
    isLoading: false,
    error: null,
    successMessage: null,
  }),

  actions: {
    async loadExpenses() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/api/expenses');
        this.expenses = response.data;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors du chargement des dépenses';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async createExpense(title, amount, frequency, startDate, endDate, userId, categoryId) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.post('http://localhost:3000/api/expenses', { title, amount, frequency, startDate, endDate, userId, categoryId });
        this.expenses.push(response.data.newExpense);
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la création de la dépense';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async updateExpense(id, title, amount, frequency, startDate, endDate) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.put(`http://localhost:3000/api/expenses/${id}`, { title, amount, frequency, startDate, endDate });
        const index = this.expenses.findIndex((expense) => expense.id === id);
        if (index !== -1) this.expenses[index] = response.data.updatedExpense;
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la mise à jour de la dépense';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async deleteExpense(id) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.delete(`http://localhost:3000/api/expenses/${id}`);
        this.expenses = this.expenses.filter((expense) => expense.id !== id);
        this.successMessage = response.data.message;
      } catch (error) {
        this.error = error.response?.data.message || 'Erreur lors de la suppression de la dépense';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
  }
});

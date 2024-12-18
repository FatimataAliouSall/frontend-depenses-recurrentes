// // stores/ExpenseStore.js
// import { defineStore } from 'pinia';
// import axios from 'axios';

// export const useExpenseStore = defineStore('expenseStore', {
//   state: () => ({
//     expenses: [],
//     expenseCategories: [],
//     expense: {
//       id: null,
//       title: '',
//       amount: '',
//       frequency: '',
//       dateCreate: '',
//       startDate: '',
//       endDate: '',
//       userId: null,
//       expenseCategory: '',
//     },
//     isLoading: false,
//     error: null,
//     successMessage: null,
//   }),

//   actions: {
//     async loadExpenses() {
//       this.expenses = [];
//       this.isLoading = true;
//       this.error = null;
//       try {
//         const response = await axios.get('http://localhost:3000/api/expenses');
//         if (response.status === 200) {
//           this.expenses = response.data;
//         } else {
//           console.error('Échec du chargement des expenses avec le statut :', response.status);
//         }
//       } catch (error) {
//         this.error = 'Erreur lors du chargement des expenses';
//         console.error(this.error, error.response?.data || error.message);
//       } finally {
//         this.isLoading = false;
//       }
//     },

//     async addExpense(expense) {
//       if (!expense.title) {
//         this.error = 'Le titre de la dépense est requis.';
//         return;
//       }
//       this.isLoading = true;
//       this.error = null;
//       this.successMessage = null;
//       try {
//         const response = await axios.post('http://localhost:3000/api/expenses', expense);
//         if (response.status === 201) {
//           this.expenses.push(response.data); 
//           this.successMessage = 'Dépense ajoutée avec succès !';
//         } else {
//           console.error('Échec de l\'ajout de la dépense avec le statut :', response.status);
//         }
//       } catch (error) {
//         this.error = 'Erreur lors de la création de la dépense';
//         console.error(this.error, error.response?.data || error.message);
//       } finally {
//         this.isLoading = false;
//       }
//     },
    

//     async updateExpense(expense) {
//       if (!expense.title) {
//         this.error = 'Le title de la expense est requis.';
//         return;
//       }
//       this.isLoading = true;
//       this.error = null;
//       try {
//         const response = await axios.put(`http://localhost:3000/api/expenses/${expense.id}`, expense);
//         if (response.status === 200) {
//           const index = this.expenses.findIndex(ec => ec.id === expense.id);
//           if (index !== -1) {
//             this.expenses[index] = response.data;
//             this.successMessage = 'expense mise à jour avec succès !';
//           }
//         } else {
//           console.error('Échec de la mise à jour de la dépense avec le statut :', response.status);
//         }
//       } catch (error) {
//         this.error = 'Erreur lors de la mise à jour de dépense';
//         console.error(this.error, error.response?.data || error.message);
//       } finally {
//         this.isLoading = false;
//       }
//     },

//     async removeExpense(id) {
//       this.isLoading = true;
//       this.error = null;
//       try {
//         const response = await axios.delete(`http://localhost:3000/api/expenses/${id}`);
//         if (response.status === 200) {
//           this.expenses = this.expenses.filter(expense => expense.id !== id);
//           this.successMessage = 'expense supprimée avec succès !';
//         } else {
//           console.error('Échec de la suppression de la expense avec le statut :', response.status);
//         }
//       } catch (error) {
//         this.error = 'Erreur lors de la suppression de la expense';
//         console.error(this.error, error.response?.data || error.message);
//       } finally {
//         this.isLoading = false;
//       }
//     },
//     async getExpenseById(id) {
//       this.isLoading = true;
//       this.error = null;

//       try {
//         const response = await axios.get(`http://localhost:3000/api/expenses/${id}`);
//         if (response.status === 200) {
//           this.expense = response.data; 
//         } else {
//           console.error('Échec de la récupération de la  dépense avec le statut :', response.status);
//         }
//       } catch (error) {
//         this.error = 'Erreur lors de la récupération de la expense';
//         console.error(this.error, error.response?.data || error.message);
//       } finally {
//         this.isLoading = false;
//       }
//     },
//   }
// });


// stores/ExpenseStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useExpenseStore = defineStore('expenseStore', {
  state: () => ({
    expenses: [],
    expenseCategories: [],
    expense: {
      id: null,
      title: '',
      dateCreate: '',
      userId: null,
      expenseCategory: '',
    },
    isLoading: false,
    error: null,
    successMessage: null,
  }),

  actions: {
    // Ajoute un en-tête Authorization à chaque requête
    getAuthHeaders() {
      const token = localStorage.getItem('authToken');
      return token ? { Authorization: `Bearer ${token}` } : {};
    },

    async loadExpenses() {
      this.expenses = [];
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/api/expenses', {
          headers: this.getAuthHeaders(),
        });
        if (response.status === 200) {
          this.expenses = response.data;
        } else {
          this.error = `Erreur ${response.status}: Impossible de charger les dépenses.`;
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur réseau lors du chargement des dépenses.';
      } finally {
        this.isLoading = false;
      }
    },

    async addExpense(expense) {
      if (!expense.title) {
        this.error = 'Le titre de la dépense est requis.';
        return;
      }
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post('http://localhost:3000/api/expenses', expense, {
          headers: this.getAuthHeaders(),
        });
        if (response.status === 201) {
          this.expenses.push(response.data);
          this.successMessage = 'Dépense ajoutée avec succès !';
        } else {
          this.error = `Erreur ${response.status}: Impossible d’ajouter la dépense.`;
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur réseau lors de l’ajout de la dépense.';
      } finally {
        this.isLoading = false;
      }
    },

    async updateExpense(expense) {
      if (!expense.title) {
        this.error = 'Le titre de la dépense est requis.';
        return;
      }
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.put(`http://localhost:3000/api/expenses/${expense.id}`, expense, {
          headers: this.getAuthHeaders(),
        });
        if (response.status === 200) {
          const index = this.expenses.findIndex(ec => ec.id === expense.id);
          if (index !== -1) {
            this.expenses[index] = response.data;
            this.successMessage = 'Dépense mise à jour avec succès !';
          }
        } else {
          this.error = `Erreur ${response.status}: Impossible de mettre à jour la dépense.`;
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur réseau lors de la mise à jour de la dépense.';
      } finally {
        this.isLoading = false;
      }
    },

    async removeExpense(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.delete(`http://localhost:3000/api/expenses/${id}`, {
          headers: this.getAuthHeaders(),
        });
        if (response.status === 200) {
          this.expenses = this.expenses.filter(expense => expense.id !== id);
          this.successMessage = 'Dépense supprimée avec succès !';
        } else {
          this.error = `Erreur ${response.status}: Impossible de supprimer la dépense.`;
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur réseau lors de la suppression de la dépense.';
      } finally {
        this.isLoading = false;
      }
    },

    async getExpenseById(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://localhost:3000/api/expenses/${id}`, {
          headers: this.getAuthHeaders(),
        });
        if (response.status === 200) {
          this.expense = response.data;
        } else {
          this.error = `Erreur ${response.status}: Impossible de récupérer la dépense.`;
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur réseau lors de la récupération de la dépense.';
      } finally {
        this.isLoading = false;
      }
    },
  },
});

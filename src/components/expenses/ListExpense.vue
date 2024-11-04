<!-- <template>
  <div>
    <h2>Expenses List</h2>
    <button @click="fetchExpenses" class="btn btn-primary mb-3">Add Expenses</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Frequency</th>
          <th>DateCreate</th>
          <th>StartDate</th>
          <th>EndDate</th>
          <th>User</th>
          <th>expenseCategory</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense in expenses" :key="expense.id">
          <td>{{ expense.title }}</td>
          <td>{{ expense.amount }}</td>
          <td>{{ expense.frequency }}</td>
          <td>{{ new Date(expense.dateCreate).toLocaleDateString() }}</td>
          <td>{{ new Date(expense.StartDate).toLocaleDateString() }}</td>
          <td>{{ new Date(expense.EndDate).toLocaleDateString() }}</td>
          <td>{{ expense.user.username ? expense.user.username : 'Unassigned'  }}</td>
          <td>{{ expense.category.name ? expense.category.name : 'Unspecified' }}</td>
          <td>
            <button @click="editExpense(expense.id)" class="btn btn-warning btn-sm">Edit</button>
            <button @click="deleteExpense(expense.id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useExpenseStore } from '@/stores/ExpenseStore.js';
  
  const expenseStore = useExpenseStore();
  
  const fetchExpenses = async () => {
    await expenseStore.loadExpenses();
  };
  
  const editExpense = (expenseId) => {
    console.log("Édition de la dépense avec l'ID:", expenseId);
  };
  
  const deleteExpense = async (expenseId) => {
    await expenseStore.removeExpense(expenseId);
  };
  
  onMounted(fetchExpenses);
  
  const expenses = expenseStore.expenses;
  </script>
  
  <style scoped>
  h2 {
    color: #333;
    margin-bottom: 1rem;
  }
  </style>
   -->




   <script setup>
import { onMounted } from 'vue';
import { useExpenseStore } from '@/stores/ExpenseStore';

const expenseStore = useExpenseStore();
onMounted(() => {
  expenseStore.loadExpenses();
});
</script>

<template>
  <div>
    <h2>Liste des dépenses</h2>
    <button @click="expenseStore.loadExpenses" class="btn btn-primary mb-3">Ajouter dépenses</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Montant</th>
          <th>Fréquence</th>
          <th>Dated création</th>
          <th>Date début</th>
          <th>Date fin</th>
          <th>Utilisateur</th>
          <th>Catégorie</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense in expenseStore.expenses" :key="expense.id">
          <td>{{ expense.title }}</td>
          <td>{{ expense.amount }}</td>
          <td>{{ expense.frequency }}</td>
          <td>{{ new Date(expense.dateCreate).toLocaleDateString() }}</td>
          <td>{{ new Date(expense.startDate).toLocaleDateString() }}</td>
          <td>{{ new Date(expense.endDate).toLocaleDateString() }}</td>
          <td>{{ expense.user?.username || 'Non assigné' }}</td>
          <td>{{ expense.category?.name || 'Non spécifié' }}</td>
          <td>
            <button @click="editExpense(expense.id)" class="btn btn-warning btn-sm">Modifier</button>
            <button @click="deleteExpense(expense.id)" class="btn btn-danger btn-sm">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<template>
  <div>
    <h2>Liste des dépenses</h2>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <div class="mb-3">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher par titre"
        class="form-control w-50" 
      />
    </div>
    <button @click="addExpense" class="btn btn-primary mb-3">Ajouter </button>
  
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Date création</th>
          <th>Catégorie</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense in filteredExpenses" :key="expense.id">
          <td>{{ expense.title }}</td>
          <td>{{ new Date(expense.dateCreate).toLocaleDateString() }}</td>
          <td>{{ expense.category?.name || 'N/A' }}</td>
          <td>
            <button @click="editexpense(expense.id)" class="btn btn-warning btn-sm me-2"><i class="fas fa-edit"></i></button>
            <button @click="deleteexpense(expense.id)" class="btn btn-danger btn-sm me-2"><i class="fas fa-trash-alt"></i></button>
            <button @click="viewexpense(expense.id)" class="btn btn-info btn-sm me-2"><i class="fas fa-eye"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useExpenseStore } from '@/stores/ExpenseStore.js';

const expenseStore = useExpenseStore();
const router = useRouter();

const expenses = computed(() => expenseStore.expenses);
const searchQuery = ref('');  
const errorMessage = ref(''); // Ajout pour afficher les erreurs

const filteredExpenses = computed(() => {
  return expenses.value.filter(expense => 
    expense.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const fetchExpenses = async () => {
  await expenseStore.loadExpenses();
};

const addExpense = () => {
  router.push({ name: 'addExpense' });
};

const editexpense = (expenseId) => {
  router.push({ name: 'editExpense', params: { id: expenseId } });
};

const viewexpense = (expenseId) => {
  router.push({ name: 'viewExpense', params: { id: expenseId } });
};

const deleteexpense = async (expenseId) => {
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette dépense ?");
  
  if (confirmDelete) {
    try {
      console.log("Début de la suppression de la dépense avec ID:", expenseId);
      await expenseStore.removeExpense(expenseId);  
      console.log("Suppression réussie, actualisation de la liste...");
      await fetchExpenses();  
      alert("Dépense supprimée avec succès.");
      errorMessage.value = ''; 
    } catch (error) {
      console.error("Erreur lors de la suppression de la dépense :", error);
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage.value = error.response.data.message + " " + error.response.data.suggestion;
      } else {
        errorMessage.value = "Une erreur s'est produite lors de la suppression de la dépense. Veuillez réessayer.";
      }
    }
  }
};

onMounted(fetchExpenses);
</script>

<style scoped>
h2 {
  color: #333;
  margin-bottom: 1rem;
}
</style>

<template>
  <div>
    <h2>Liste des dépenses</h2>
    <button @click="addExpense" class="btn btn-primary mb-3">Ajouter </button>
  
    <!-- <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div> -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Montant</th>
          <th>Fréquence</th>
          <th>Date création</th>
          <th>Date debut</th>
          <th>Date fin</th>
          <!-- <th>Utilisateur</th> -->
          <th>Catégorie</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense in expenses" :key="expense.id">
          <td>{{ expense.title }}</td>
          <td>{{ expense.amount }}</td>
          <td>{{ expense.frequency }}</td>
          <td>{{ new Date(expense.dateCreate).toLocaleDateString() }}</td>
          <td>{{ new Date(expense.startDate).toLocaleDateString() }}</td>
          <td>{{ new Date(expense.endDate).toLocaleDateString() }}</td>
          <!-- <td>{{ expense.user?.username  }}</td> -->
          <td>{{ expense.category?.name }}</td>
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
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useExpenseStore } from '@/stores/ExpenseStore.js';

const expenseStore = useExpenseStore();
const router = useRouter();

const expenses = computed(() => expenseStore.expenses);

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

// const deleteexpense = async (expenseId) => {
//   const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette dépense ?");
  
//   if (confirmDelete) {
//     try {
//       await expenseStore.removeExpense(expenseId);
//       await fetchExpenses();
//       alert("Dépense supprimée avec succès.");
//     } catch (error) {
//       console.error("Erreur lors de la suppression de la dépense :", error);
      
//       // Vérifie si l'erreur provient de la contrainte de clé étrangère et affiche un message spécifique
//       if (error.response && error.response.data && error.response.data.message) {
//         alert(error.response.data.message + "\n" + error.response.data.suggestion);
//       } else {
//         // Autre type d'erreur
//         alert("Une erreur s'est produite lors de la suppression de la dépense. Veuillez réessayer.");
//       }
//     }
//   }
// };

const deleteexpense = async (expenseId) => {
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette dépense ?");
  
  if (confirmDelete) {
    try {
      console.log("Début de la suppression de la dépense avec ID:", expenseId);
      
      await expenseStore.removeExpense(expenseId);  
      
      console.log("Suppression réussie, actualisation de la liste...");
      
      await fetchExpenses();  
      alert("Dépense supprimée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression de la dépense :", error);
      
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message + "\n" + error.response.data.suggestion);
      } else {
        alert("Une erreur s'est produite lors de la suppression de la dépense. Veuillez réessayer.");
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

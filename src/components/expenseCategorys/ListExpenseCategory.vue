<template>
  <div>
    <h2>ExpenseCategory list</h2>
    <button @click="fetchExpenseCategories" class="btn btn-primary mb-3">Add ExpenseCategory</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>User</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in expenseCategories" :key="category.id">
          <td>{{ category.name }}</td>
          <td>{{ category.status ? 'Actif' : 'Inactif' }}</td>
          <td>{{ category.user?.username || 'Non attribué' }}</td>
          <td>
            <button @click="editCategory(category.id)" class="btn btn-warning btn-sm">Éditer</button>
            <button @click="deleteCategory(category.id)" class="btn btn-danger btn-sm">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useExpenseCategoryStore } from '@/stores/expenseCategoryStore.js';

const expenseCategoryStore = useExpenseCategoryStore();

// Utilisez computed pour que `expenseCategories` soit réactif
const expenseCategories = computed(() => expenseCategoryStore.categories);

// Méthode pour charger les catégories de dépenses
const fetchExpenseCategories = async () => {
  await expenseCategoryStore.loadExpenseCategories();
};

// Méthode pour éditer une catégorie (à personnaliser)
const editCategory = (categoryId) => {
  console.log("Édition de la catégorie avec l'ID:", categoryId);
};

// Méthode pour supprimer une catégorie
const deleteCategory = async (categoryId) => {
  await expenseCategoryStore.deleteExpenseCategory(categoryId);
};

// Charger les catégories de dépenses lors du montage du composant
onMounted(fetchExpenseCategories);
</script>

<style scoped>
h2 {
  color: #333;
  margin-bottom: 1rem;
}
</style>

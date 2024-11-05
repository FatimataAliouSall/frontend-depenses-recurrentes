<template>
  <div>
    <h2>Expense Category List</h2>
    <button @click="goToAddCategory" class="btn btn-primary mb-3">Add Expense Category</button>
    
    <!-- Messages d'alerte -->
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

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
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.name }}</td>
          <td>{{ category.status ? 'Actif' : 'Inactif' }}</td>
          <td>{{ category.user?.username || 'Non attribué' }}</td>
          <td>
            <button @click="editCategory(category.id)" class="btn btn-warning btn-sm">Éditer</button>
            <button @click="deleteCategory(category.id)" class="btn btn-danger btn-sm">Supprimer</button>
            <button @click="viewCategory(category.id)" class="btn btn-info btn-sm">Voir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useExpenseCategoryStore } from '@/stores/expenseCategoryStore.js';

const expenseCategoryStore = useExpenseCategoryStore();
const router = useRouter();

const categories = computed(() => expenseCategoryStore.categories);
const successMessage = computed(() => expenseCategoryStore.successMessage);
const error = computed(() => expenseCategoryStore.error);

const fetchExpenseCategories = async () => {
  await expenseCategoryStore.loadExpenseCategories();
};

const goToAddCategory = () => {
  router.push({ name: 'addExpenseCategory' });
};

const editCategory = (categoryId) => {
  router.push({ name: 'editExpenseCategory', params: { id: categoryId } });
};

const viewCategory = (categoryId) => {
  router.push({ name: 'viewExpenseCategory', params: { id: categoryId } });
};

const deleteCategory = async (categoryId) => {
  try {
    await expenseCategoryStore.deleteExpenseCategory(categoryId);
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie :", error);
  }
};

// Charger les catégories lors de l'initialisation du composant
onMounted(fetchExpenseCategories);
</script>

<style scoped>
h2 {
  color: #333;
  margin-bottom: 1rem;
}
</style>

<template>
  <div>
    <h2>Liste des catégories de dépenses</h2>
    <button @click="goToAddCategory" class="btn btn-primary mb-3">Ajouter</button>
    
    <p v-if="expenseCategoryStore.successMessage" class="alert alert-success">{{ expenseCategoryStore.successMessage }}</p>
    <p v-if="expenseCategoryStore.error" class="alert alert-danger">{{ expenseCategoryStore.error }}</p>
    
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Statut</th>
          <th>Utilisateur</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in expenseCategories" :key="category.id">
          <td>{{ category.name || 'Sans nom' }}</td>
          <td>{{ category.status ? 'Actif' : 'Inactif' }}</td>
          <td>{{ category.user?.username || 'Non attribué' }}</td>
          <td>
            <button @click="editCategory(category.id)" class="btn btn-warning btn-sm me-2"><i class="fas fa-edit"></i> </button>
            <button @click="deleteCategory(category.id)" class="btn btn-danger btn-sm me-2"><i class="fas fa-trash-alt"></i> </button>
            <button @click="viewCategory(category.id)" class="btn btn-info btn-sm me-2"><i class="fas fa-eye"></i> </button>
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

// Accès à la propriété `expenseCategories` dans le store
const expenseCategories = computed(() => expenseCategoryStore.expenseCategories);

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
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?");
  
  if (confirmDelete) {
    try {
      await expenseCategoryStore.removeExpenseCategory(categoryId);
      await fetchExpenseCategories();
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);
    }
  }
};

onMounted(fetchExpenseCategories);
</script>

<style scoped>
h2 {
  color: #333;
  margin-bottom: 1rem;
}
.alert {
  margin-top: 1rem;
}
</style>

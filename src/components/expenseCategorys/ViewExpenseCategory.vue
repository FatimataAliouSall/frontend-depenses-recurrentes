<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow-sm p-4" style="width: 100%; max-width: 480px;">
        <h2 class="text-center mb-4">Détails catégorie de dépense</h2>
        <p><strong>Nom de la catégorie :</strong> {{ category?.name || 'N/A' }}</p>
        <p><strong>Statut :</strong> {{ category?.status ? 'Actif' : 'Inactif' }}</p>
        <p><strong>Utilisateur :</strong> {{ category?.user?.username || 'Non attribué' }}</p>
        <button @click="goBack" class="btn btn-secondary w-100 mt-3">
          <i class="fas fa-arrow-left me-2"></i> Retour à la liste
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useExpenseCategoryStore } from '@/stores/expenseCategoryStore.js';
  import { useRoute, useRouter } from 'vue-router';
  
  const expenseCategoryStore = useExpenseCategoryStore();
  const route = useRoute();
  const router = useRouter();
  
  const category = ref(null);
  
  const loadCategory = async () => {
    category.value = await expenseCategoryStore.getExpenseCategoryById(route.params.id);
  };
  
  const goBack = () => {
    router.push({ name: 'expenseCategory' });
  };
  
  onMounted(loadCategory);
  </script>
  
  <style scoped>
  h2 {
    color: #333;
  }
  
  .card {
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  p {
    font-size: 1.1rem;
  }
  </style>
  
<template>
  <div v-if="isLoading" class="loading">
    Chargement...
  </div>
  <div v-else>
    <div class="card shadow-sm p-4">
      <h2 class="text-center mb-4">Détails de la catégorie de dépense</h2>

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <div v-if="category">
        <p><strong>Nom de la catégorie :</strong> {{ category.name || 'N/A' }}</p>
        <p><strong>Statut :</strong> {{ category.status ? 'Actif' : 'Inactif' }}</p>
        <p><strong>Utilisateur :</strong> {{ category.user?.username || 'Non attribué' }}</p>
        
        <button @click="goBack" class="btn btn-secondary w-100 mt-3">
          <i class="fas fa-arrow-left me-2"></i> Retour à la liste
        </button>
      </div>

      <div v-else class="no-data">
        Aucune catégorie trouvée.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useExpenseCategoryStore } from '@/stores/expenseCategoryStore.js';

const route = useRoute();
const router = useRouter();
const categoryId = route.params.id;

// const category = ref()
const expenseCategoryStore = useExpenseCategoryStore();
onMounted( async() => {
 category.value = await expenseCategoryStore.getExpenseCategoryById(categoryId);
 console.log(category.value);
 
});

const goBack = () => {
  router.push({ name: 'expenseCategory' });
};

const isLoading = computed(() => expenseCategoryStore.isLoading);
const error = computed(() => expenseCategoryStore.error);
const category = computed(() =>  expenseCategoryStore.expenseCategory);
// console.log(category.value);

</script>

<style scoped>
.loading {
  font-size: 18px;
  color: #007bff;
  text-align: center;
}

.error {
  color: #ff0000;
  font-weight: bold;
  text-align: center;
}

.no-data {
  color: #666;
  text-align: center;
}

.card {
  background-color: #f8f9fa;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}
</style>

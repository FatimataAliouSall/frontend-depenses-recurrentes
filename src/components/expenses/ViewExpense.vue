<template>
  <div v-if="isLoading" class="loading">
    Chargement...
  </div>
  <div v-else>
    <div class="card shadow-sm p-4">
      <h2 class="text-center mb-4">Détails de la dépense</h2>

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <div v-if="expense">
        <div class="details-grid">
          <div class="detail-item">
            <strong>Titre :</strong> {{ expense.title }}
          </div>
          <div class="detail-item">
            <strong>Montant :</strong> {{ expense.amount }}
          </div>
          <div class="detail-item">
            <strong>Fréquence :</strong> {{ expense.frequency }}
          </div>
          <div class="detail-item">
            <strong>Date de création :</strong> {{ expense.dateCreate }}
          </div>
          <div class="detail-item">
            <strong>Date de début :</strong> {{ expense.startDate }}
          </div>
          <div class="detail-item">
            <strong>Date de fin :</strong> {{ expense.endDate }}
          </div>
          <div class="detail-item">
            <strong>Catégorie de dépense :</strong> {{ expense.category.name }}
          </div>
        </div>
        
        <button @click="goBack" class="btn btn-secondary w-10 mt-3">
          <i class="fas fa-arrow-left me-2"></i> 
        </button>
      </div>

      <div v-else class="no-data">
        Aucune dépense trouvée.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useExpenseStore } from '@/stores/ExpenseStore';

const route = useRoute();
const router = useRouter();
const expenseId = route.params.id;

const expenseStore = useExpenseStore();
onMounted(() => {
  expenseStore.getExpenseById(expenseId);
});

const goBack = () => {
  router.push({ name: 'expenses' });
};

const isLoading = computed(() => expenseStore.isLoading);
const error = computed(() => expenseStore.error);
const expense = computed(() => expenseStore.expense);
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

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.detail-item {
  font-size: 1.1rem;
  color: #333;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>

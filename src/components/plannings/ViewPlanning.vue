<template>
    <div v-if="isLoading" class="loading">
      Chargement...
    </div>
    <div v-else>
      <div class="card shadow-sm p-4">
        <h2 class="text-center mb-4">Détails de la Planification</h2>
  
        <div v-if="error" class="error">
          {{ error }}
        </div>
  
        <div v-if="planning">
          <div class="details-grid">
            <div class="detail-item">
              <strong>Nom :</strong> {{ planning.name }}
            </div>
            <div class="detail-item">
              <strong>Montant :</strong> {{ planning.amount }}
            </div>
            <div class="detail-item">
              <strong>Date de début :</strong> {{ planning.startDate }}
            </div>
            <div class="detail-item">
              <strong>Date de fin :</strong> {{ planning.endDate }}
            </div>
            <div class="detail-item">
              <strong>Dépense :</strong> {{ planning.expense?.title }}
            </div>
          </div>
          
          <button @click="goBack" class="btn btn-secondary w-10 mt-3">
            <i class="fas fa-arrow-left me-2"></i> Retour
          </button>
        </div>
  
        <div v-else class="no-data">
          Aucune planification trouvée.
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { usePlanningStore } from '@/stores/PlanningStore.js';
  
  const router = useRouter();
  const route = useRoute();
  const planningId = route.params.id;
  
  const planningStore = usePlanningStore();
  onMounted(() => {
    planningStore.getPlanningById(planningId);
  });
  
  const goBack = () => {
    router.push({ name: 'planning' });
  };
  
  const isLoading = computed(() => planningStore.isLoading);
  const error = computed(() => planningStore.error);
  const planning = computed(() => planningStore.planning);
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
  
  .btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
    color: #fff;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
    border-color: #5a6268;
  }
  </style>
  
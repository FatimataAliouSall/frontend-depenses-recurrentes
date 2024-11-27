<template>
    <div v-if="isLoading" class="loading">
      Chargement...
    </div>
    <div v-else>
      <div class="card shadow-sm p-4">
        <h2 class="text-center mb-4">Détails du Paiement</h2>
  
        <div v-if="error" class="error">
          {{ error }}
        </div>
  
        <div v-if="payment">
          <div class="details-grid">
            <div class="detail-item">
              <strong>Montant :</strong> {{ payment.amount }}
            </div>
            <div class="detail-item">
              <strong>Devise :</strong> {{ payment.unit }}
            </div>
            <div class="detail-item">
              <strong>Date de Paiement :</strong> {{ payment.paymentDate }}
            </div>
            <div class="detail-item">
              <strong>Référence :</strong> {{ payment.reference  }}
            </div>
            <div class="detail-item">
              <strong>Planification :</strong> {{ payment.planning?.name }}
            </div>
            <div class="detail-item">
              <strong>Méthode de Paiement :</strong> {{ payment.paymentMethod?.name }}
            </div>
          </div>
  
          <button @click="goBack" class="btn btn-secondary w-10 mt-3">
            <i class="fas fa-arrow-left me-2"></i> Retour
          </button>
        </div>
  
        <div v-else class="no-data">
          Aucun paiement trouvé.
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { usePaymentStore } from '@/stores/PaymentStore.js';
  
  const router = useRouter();
  const route = useRoute();
  const paymentId = route.params.id;
  
  const paymentStore = usePaymentStore();
  onMounted(() => {
    paymentStore.getPaymentById(paymentId);
  });
  
  const goBack = () => {
    router.push({ name: 'payments' });
  };
  
  const isLoading = computed(() => paymentStore.isLoading);
  const error = computed(() => paymentStore.error);
  const payment = computed(() => paymentStore.payment);
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
  
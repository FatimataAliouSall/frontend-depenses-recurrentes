<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow-sm p-4" style="width: 100%; max-width: 480px;">
        <h2 class="text-center mb-4">Détails  paiement methode</h2>
        <p><strong>Nom paiement :</strong> {{ method?.name || 'N/A' }}</p>
        <p><strong>Statut :</strong> {{ method?.status ? 'Actif' : 'Inactif' }}</p>
        <p><strong>Utilisateur :</strong> {{ method?.user?.username || 'Non attribué' }}</p>
        <button @click="goBack" class="btn btn-secondary w-100 mt-3">
          <i class="fas fa-arrow-left me-2"></i> Retour à la liste
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { usePaymentMethodStore } from '@/stores/PaymentMethodStore.js';
  import { useRoute, useRouter } from 'vue-router';
  
  const PaymentMethodStore = usePaymentMethodStore();
  const route = useRoute();
  const router = useRouter();
  
  const paymentMethod = ref(null);
  
  const loadPaymentMethods = async () => {
    paymentMethod.value = await PaymentMethodStore.getPaymentMethodById(route.params.id);
  };
  
  const goBack = () => {
    router.push({ name: 'paymentMethods' });
  };
  
  onMounted(loadPaymentMethods);
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
  
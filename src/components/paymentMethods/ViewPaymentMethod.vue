<template>
  <div v-if="isLoading" class="loading">
    Chargement...
  </div>
  <div v-else>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow-sm p-4" style="width: 100%; max-width: 480px;">
        <h2 class="text-center mb-4">Détails de la méthode de paiement</h2>

        <div v-if="error" class="error">
          {{ error }}
        </div>

        <div v-if="paymentMethod">
          <p><strong>Nom du paiement :</strong> {{ paymentMethod.name || 'N/A' }}</p>
          <p><strong>Statut :</strong> {{ paymentMethod.status ? 'Actif' : 'Inactif' }}</p>
          <p><strong>Utilisateur :</strong> {{ paymentMethod.user?.username || 'Non attribué' }}</p>
          
          <button @click="goBack" class="btn btn-secondary w-100 mt-3">
            <i class="fas fa-arrow-left me-2"></i> Retour à la liste
          </button>
        </div>

        <div v-else class="no-data">
          Aucune méthode de paiement trouvée.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePaymentMethodStore } from '@/stores/PaymentMethodStore.js';

const route = useRoute();
const router = useRouter();
const methodId = route.params.id;

// const paymentMethod = ref();
const paymentMethodStore = usePaymentMethodStore();
onMounted(async () => {
  // paymentMethod.value = await paymentMethodStore.getPaymentMethodById(methodId);
  await paymentMethodStore.getPaymentMethodById(methodId);
});

const goBack = () => {
  router.push({ name: 'paymentMethods' });
};

const isLoading = computed(() => paymentMethodStore.isLoading);
const error = computed(() => paymentMethodStore.error);

const paymentMethod = computed(() => paymentMethodStore.paymentMethod)
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
}

h2 {
  color: #333;
}

p {
  font-size: 1.1rem;
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

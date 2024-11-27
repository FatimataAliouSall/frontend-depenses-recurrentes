<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-3" style="width: 100%; max-width: 480px;">
      <h2 class="text-center mb-3">Modifier le paiement</h2>
      <form @submit.prevent="submitForm">
        <div class="row g-2">
          <div class="col-md-6">
            <label for="amount" class="form-label">Montant</label>
            <input
              type="number"
              v-model="payment.amount"
              class="form-control"
              id="amount"
              @input="validateAmount"
              :max="maxAmount"
              required
            />
            <small v-if="error" class="text-danger">{{ error }}</small>
            <select
                v-model="payment.unit"
                class="form-select"
                required
              >
                <option value="" disabled>Unité</option>
                <option value="euro">Euro</option>
                <option value="MRU">Ouguiya</option>
                <option value="CFA">Franc CFA</option>
                <option value="dinar">Dinar</option>
              </select>
          </div>

          <div class="col-md-6">
            <label for="paymentDate" class="form-label">Date de paiement :</label>
            <input
              type="date"
              id="paymentDate"
              v-model="payment.paymentDate"
              class="form-control"
              required
            />
          </div>

          <div class="col-md-6">
            <label for="reference" class="form-label">Référence</label>
            <input
              type="text"
              v-model="payment.reference"
              class="form-control"
              id="reference"
            />
          </div>

          <div class="col-md-6">
            <label for="planningId" class="form-label">Planification</label>
            <select
              id="planningId"
              v-model="payment.planningId"
              class="form-select"
              @change="updateMaxAmount"
              required
            >
              <option value="" disabled>Choisir une planification</option>
              <option v-for="planning in paymentStore.plannings" :key="planning.id" :value="planning.id">
                {{ planning.name }}
              </option>
            </select>
          </div>

          <div class="col-md-6">
            <label for="paymentMethodId" class="form-label">Méthode de paiement :</label>
            <select
              v-model="payment.paymentMethodId"
              class="form-select"
              id="paymentMethodId"
              required
            >
              <option value="" disabled>Choisir une méthode</option>
              <option v-for="method in paymentStore.paymentMethods" :key="method.id" :value="method.id">
                {{ method.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="d-flex justify-content-between mt-3">
          <button type="submit" class="btn btn-primary w-100 me-1"><i class="fas fa-save me-2"></i> Enregistrer</button>
          <button @click="goBack" class="btn btn-secondary w-100 ms-1"><i class="fas fa-arrow-left me-2"></i> Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePaymentStore } from '@/stores/PaymentStore.js';
import Swal from 'sweetalert2';

const paymentStore = usePaymentStore();
const router = useRouter();
const route = useRoute();

const payment = ref({
  amount: 0,
  unit: '', 
  paymentDate: '',
  reference: '',
  planningId: '',
  paymentMethodId: '',
});

const maxAmount = ref(0); // Montant maximum autorisé
const error = ref(''); // Message d'erreur

// Met à jour le montant maximum autorisé lors du changement de planification
const updateMaxAmount = () => {
  const selectedPlanning = paymentStore.plannings.find(
    (planning) => planning.id === payment.value.planningId
  );
  if (selectedPlanning) {
    maxAmount.value = selectedPlanning.amount;
  } else {
    maxAmount.value = 0;
  }
};

// Vérifie si le montant est valide (pas supérieur au montant planifié)
const validateAmount = () => {
  if (payment.value.amount > maxAmount.value) {
    error.value = `Le montant ne peut pas dépasser ${maxAmount.value}.`;
  } else {
    error.value = '';
  }
};

onMounted(async () => {
  try {
    await paymentStore.getRequirements();
    await paymentStore.getPaymentById(route.params.id);
    const data = paymentStore.payment;
    if (data) {
      payment.value = {
        id: data.id,
        amount: data.amount || 0,
        unit: data.unit || '',
        paymentDate: data.paymentDate ? data.paymentDate.split('T')[0] : '',
        reference: data.reference || '',
        planningId: data.planningId || '',
        paymentMethodId: data.paymentMethodId || '',
      };
      updateMaxAmount(); // Mettez à jour le montant max après avoir chargé les données
    }
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
});

const submitForm = async () => {
  if (payment.value.amount > maxAmount.value) {
    Swal.fire({
      title: 'Erreur',
      text: `Le montant ne peut pas dépasser ${maxAmount.value}.`,
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }

  try {
    await paymentStore.updatePayment({
      id: route.params.id,
      ...payment.value,
    });
    Swal.fire({
      title: 'Succès',
      text: 'Le paiement a été mis à jour avec succès!',
      icon: 'success',
      confirmButtonText: 'OK',
    });

    router.push({ name: 'payments' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du paiement:', error);

    Swal.fire({
      title: 'Erreur',
      text: "Une erreur s'est produite lors de la mise à jour du paiement.",
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
};

const goBack = () => {
  router.push({ name: 'payments' });
};
</script>

<style scoped>
h2 {
  color: #333;
  margin-bottom: 1rem;
}

.card {
  background-color: #f8f9fa;
  border-radius: 8px;
}

.form-label {
  font-weight: bold;
}

.btn {
  font-size: 1rem;
}
</style>

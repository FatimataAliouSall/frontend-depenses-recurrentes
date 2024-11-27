<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-3" style="width: 100%; max-width: 480px;">
      <div class="d-flex align-items-center mb-3">
        <button 
          type="button" 
          @click="goBack" 
          class="btn btn-secondary d-flex align-items-center me-2"
        >
          <i class="fas fa-arrow-left me-2"></i> Retour
        </button>
      </div>
      <h2 class="text-center mb-3">Ajouter un Paiement</h2>
      <form @submit.prevent="submitPayment">
        <div class="row g-2">
          <div class="col-md-6">
            <label for="amount" class="form-label">Montant</label>
            <input 
              type="number" 
              v-model.number="form.amount" 
              id="amount" 
              class="form-control" 
              @input="validateAmount" 
              :max="maxAmount" 
              required
            />
            <small v-if="error" class="text-danger">{{ error }}</small>
            <select v-model="form.unit" class="form-select" id="unit" required>
                <option value="" disabled>Devise</option>
                <option value="EUR">Euro (€)</option>
                <option value="MRU">Ouguiya (UM)</option>
                <option value="CFA">Franc CFA (CFA)</option>
                <option value="DZD">Dinar (DZD)</option>
              </select>
          </div>
          <div class="col-md-6">
            <label for="paymentDate" class="form-label">Date de paiement</label>
            <input 
              type="date" 
              v-model="form.paymentDate" 
              id="paymentDate" 
              class="form-control" 
              required
            />
          </div>
          <div class="col-md-12">
            <label for="reference" class="form-label">Référence</label>
            <input 
              type="text" 
              v-model="form.reference" 
              id="reference" 
              class="form-control" 
            />
          </div>
          <div class="col-md-12">
            <label for="planning" class="form-label">Planification</label>
            <select 
              v-model="form.planningId" 
              id="planning" 
              class="form-select" 
              @change="fetchPlanningAmount" 
              required
            >
              <option value="" disabled>Choisir une planification</option>
              <option 
                v-for="planning in paymentStore.plannings" 
                :key="planning.id" 
                :value="planning.id"
              >
                {{ planning.name }}
              </option>
            </select>
          </div>
          <div class="col-md-12">
            <label for="paymentMethod" class="form-label">Méthode de paiement</label>
            <select 
              v-model="form.paymentMethodId" 
              id="paymentMethod" 
              class="form-select" 
              required
            >
              <option value="" disabled>Choisir une méthode de paiement</option>
              <option 
                v-for="method in paymentStore.paymentMethods" 
                :key="method.id" 
                :value="method.id"
              >
                {{ method.name }}
              </option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-primary mt-3 w-100">Ajouter </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePaymentStore } from '@/stores/PaymentStore';
import Swal from 'sweetalert2';

const router = useRouter();
const paymentStore = usePaymentStore();

const form = ref({
  amount: 0,
  unit: '',
  paymentDate: '',
  reference: '',
  planningId: '',
  paymentMethodId: '',
});

const maxAmount = ref(0); // Montant maximum autorisé
const error = ref('');

// Récupère le montant planifié lorsqu'une planification est sélectionnée
const fetchPlanningAmount = () => {
  const selectedPlanning = paymentStore.plannings.find(
    (planning) => planning.id === form.value.planningId
  );
  if (selectedPlanning) {
    maxAmount.value = selectedPlanning.amount;
  } else {
    maxAmount.value = 0;
  }
};

// Vérifie que le montant n'excède pas le montant planifié
const validateAmount = () => {
  if (form.value.amount > maxAmount.value) {
    error.value = `Le montant ne peut pas dépasser ${maxAmount.value}.`;
  } else {
    error.value = '';
  }
};

const submitPayment = async () => {
  if (form.value.amount > maxAmount.value) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: `Le montant ne peut pas dépasser ${maxAmount.value}.`,
    });
    return;
  }

  try {
    await paymentStore.addPayment({
      amount: form.value.amount,
      unit: form.value.unit,
      paymentDate: form.value.paymentDate,
      reference: form.value.reference,
      planningId: form.value.planningId,
      paymentMethodId: form.value.paymentMethodId,
    });

    await paymentStore.loadPayments();
    router.push({ name: 'payments' });

    Swal.fire({
      icon: 'success',
      title: 'Paiement ajouté avec succès',
      text: 'Le paiement a été ajouté avec succès!',
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du paiement:", error);

    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: "Une erreur s'est produite lors de l'ajout du paiement.",
    });
  }
};

const goBack = () => {
  router.push({ name: 'payments' });
};

onMounted(async () => {
  await paymentStore.getRequirements();
});
</script>

<style scoped>
h2 {
  color: #333;
  margin-bottom: 1rem;
}

button {
  width: 20%;
}

form .form-label {
  font-weight: bold;
}

.card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>

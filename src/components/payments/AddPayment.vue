<template>
  <div>
    <button 
      type="button" 
      @click="goBack" 
      class="btn btn-secondary d-flex align-items-center me-2"
    >
      <i class="fas fa-arrow-left me-2"></i> Retour 
    </button>
    <h2>Ajouter un paiement</h2>
    <form @submit.prevent="submitPayment">
      <div class="mb-3">
        <label for="amount" class="form-label">Montant</label>
        <input
          v-model="form.amount"
          type="number"
          id="amount"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="paymentDate" class="form-label">Date de paiement</label>
        <input
          v-model="form.paymentDate"
          type="date"
          id="paymentDate"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="reference" class="form-label">Référence</label>
        <input
          v-model="form.reference"
          type="text"
          id="reference"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label for="planning" class="form-label">Planification</label>
        <select v-model="form.planningId" id="planning" class="form-select" required>
          <option value="" disabled>Choisir une planification</option>
          <option v-for="planning in paymentStore.plannings" :key="planning.id" :value="planning.id">
            {{ planning.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="paymentMethod" class="form-label">Méthode de paiement</label>
        <select v-model="form.paymentMethodId" id="paymentMethod" class="form-select" required>
          <option value="" disabled>Choisir une méthode de paiement</option>
          <option v-for="method in paymentStore.paymentMethods" :key="method.id" :value="method.id">
            {{ method.name }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Ajouter le paiement</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePaymentStore } from '@/stores/PaymentStore';
// import { useExpenseStore } from '@/stores/ExpenseStore';
// import { usePaymentMethodStore } from '@/stores/PaymentMethodStore';
// import { usePlanningStore } from '@/stores/PlanningStore';

const router = useRouter();
const paymentStore = usePaymentStore();
// const expenseStore = useExpenseStore();
// const planningStore = usePlanningStore();
// const paymentMethodStore = usePaymentMethodStore();

const form = ref({
  amount: '',
  paymentDate: '',
  reference: '',
  planningId: '',
  paymentMethodId: '',
  // expenseId: '',
});

// const plannings = ref([]);
// const paymentMethods = ref([]);
// const expenses = ref([]);

onMounted(async () => {
  //plannings.value = await planningStore.loadPlannings();
  //paymentMethods.value = await paymentMethodStore.loadPaymentMethods();
  //expenses.value = await expenseStore.loadExpenses();

  await paymentStore.getRequirements();
});

const submitPayment = async () => {
  try {
    await paymentStore.addPayment({
      amount: form.value.amount,
      paymentDate: form.value.paymentDate,
      reference: form.value.reference,
      planningId: form.value.planningId,
      paymentMethodId: form.value.paymentMethodId,
      // expenseId: form.value.expenseId,
    });
    await paymentStore.loadPayments();
    router.push({ name: 'payments' });
  } catch (error) {
    console.error("Erreur lors de l'ajout du paiement:", error);
    alert("Une erreur s'est produite lors de l'ajout du paiement.");
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
</style>

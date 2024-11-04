<!-- <template>
  <div>
    <h2>Payments List</h2>
    <button @click="fetchPayments" class="btn btn-primary mb-3">Add Payment</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Payment Date</th>
          <th>Reference</th>
          <th>User</th>
          <th>Planning</th>
          <th>Payment Method</th>
          <th>Expense</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in payments" :key="payment.id">
          <td>{{ payment.amount }}</td>
          <td>{{ new Date(payment.paymentDate).toLocaleDateString() }}</td>
          <td>{{ payment.reference }}</td>
          <td>{{ payment.user.username }}</td>
          <td>{{ payment.planning.name }}</td>
          <td>{{ payment.paymentMethod.name }}</td>
          <td>{{ payment.expense.title }}</td>
          <td>
            <button @click="editPayment(payment.id)" class="btn btn-warning btn-sm">Éditer</button>
            <button @click="deletePayment(payment.id)" class="btn btn-danger btn-sm">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { usePaymentStore } from '@/stores/PaymentStore.js';

// Initialiser le store de paiement
const paymentStore = usePaymentStore();

// Fonction pour charger les paiements
const fetchPayments = async () => {
  await paymentStore.loadPayments();
};

// Propriété calculée pour obtenir les paiements depuis le store
const payments = computed(() => paymentStore.payments);

// Fonction pour l'édition d'un paiement (à compléter selon vos besoins)
const editPayment = (paymentId) => {
  console.log("Édition du paiement avec l'ID:", paymentId);
};

// Fonction pour supprimer un paiement
const deletePayment = async (paymentId) => {
  await paymentStore.deletePayment(paymentId);
};

// Charger les paiements au montage du composant
onMounted(fetchPayments);
</script>

<style scoped>
h2 {
  color: #333;
  margin-bottom: 1rem;
}
</style> -->


<template>
  <div>
    <h2>Payments List</h2>
    <button @click="fetchPayments" class="btn btn-primary mb-3">Add Payment</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Payment Date</th>
          <th>Reference</th>
          <th>User</th>
          <th>Planning</th>
          <th>Payment Method</th>
          <th>Expense</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in payments" :key="payment.id">
          <td>{{ payment.amount }}</td>
          <td>{{ new Date(payment.paymentDate).toLocaleDateString() }}</td>
          <td>{{ payment.reference || 'N/A' }}</td>
          <td>{{ payment.user?.username || 'N/A' }}</td>
          <td>{{ payment.planning?.name || 'N/A' }}</td>
          <td>{{ payment.paymentMethod?.name || 'N/A' }}</td>
          <td>{{ payment.expense?.title || 'N/A' }}</td>
          <td>
            <button @click="editPayment(payment.id)" class="btn btn-warning btn-sm">Éditer</button>
            <button @click="deletePayment(payment.id)" class="btn btn-danger btn-sm">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { usePaymentStore } from '@/stores/PaymentStore.js';

const paymentStore = usePaymentStore();

const fetchPayments = async () => {
  await paymentStore.loadPayments();
};

const payments = computed(() => paymentStore.payments);

const editPayment = (paymentId) => {
  console.log("Édition du paiement avec l'ID:", paymentId);
};

const deletePayment = async (paymentId) => {
  await paymentStore.deletePayment(paymentId);
};

onMounted(fetchPayments);
</script>

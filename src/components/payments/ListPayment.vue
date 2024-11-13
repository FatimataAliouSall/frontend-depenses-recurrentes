<template>
  <div>
    <h2>Liste des paiements</h2>
    <button @click="addPayment" class="btn btn-primary mb-3">Ajouter</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Montant</th>
          <th>Date paiement</th>
          <th>Reference</th>
          <!-- <th>User</th> -->
          <th>Planification</th>
          <th>Methode paiement</th>
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
          <td>

            <button @click="editPayment(payment.id)" class="btn btn-warning btn-sm me-2"><i class="fas fa-edit"></i></button>
            <button @click="deletePayment(payment.id)" class="btn btn-danger btn-sm me-2"><i class="fas fa-trash-alt"></i></button>
            <button @click="viewPayment(payment.id)" class="btn btn-info btn-sm me-2"><i class="fas fa-eye"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePaymentStore } from '@/stores/PaymentStore.js';

const paymentStore = usePaymentStore();
const router = useRouter();

const fetchPayments = async () => {
  await paymentStore.loadPayments();
};

const payments = computed(() => paymentStore.payments);
const addPayment = () => {
  router.push({ name: 'addPayment' });
};

const editPayment = (paymentId) => {
  router.push({ name: 'editPayment', params: { id: paymentId } });
};

const viewPayment = (paymentId) => {
  router.push({ name: '', params: { id: paymentId } });
};

const deletePayment = async (paymentId) => {
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce paiement ?");
  
  if (confirmDelete) {
    try {
      console.log("Début de la suppression de paiement avec ID:", paymentId);
      
      await paymentStore.removeExpense(paymentId); 
      
      console.log("Suppression réussie, actualisation de la liste...");
      
      await fetchPayments();  
      alert("Paiement supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression de paiement :", error);
      
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message + "\n" + error.response.data.suggestion);
      } else {
        alert("Une erreur s'est produite lors de la suppression de la dépense. Veuillez réessayer.");
      }
    }
  }
};

onMounted(fetchPayments);
</script>

<template>
  <div>
    <h2>Listed des paymentMethods</h2>
    <button @click="addPaymentMethod" class="btn btn-primary mb-3">Ajouter un paymentMethod</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Utilisateur</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="method in paymentMethods" :key="method.id">
          <td>{{ method.name }}</td>
          <td>{{ method.status ? 'Active' : 'Inactive' }}</td>
          <td>{{ method.user?.username || 'Not assigned' }}</td>
          <td>
            <button @click="editmethod(method.id)" class="btn btn-warning btn-sm me-2"><i class="fas fa-edit"></i> </button>
            <button @click="deletemethod(method.id)" class="btn btn-danger btn-sm me-2"><i class="fas fa-trash-alt"></i> </button>
            <button @click="viewmethod(method.id)" class="btn btn-info btn-sm me-2"><i class="fas fa-eye"></i> </button> 
           </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePaymentMethodStore } from '@/stores/PaymentMethodStore.js';

const paymentMethodStore = usePaymentMethodStore();
const router = useRouter();

const fetchPaymentMethods = async () => {
  await paymentMethodStore.loadPaymentMethods();
};

const addPaymentMethod = () => {
  router.push({ name: 'addPaymentMethod' });
};

const editmethod = (methodId) => {
  router.push({ name: 'editPaymentMethod', params: { id: methodId } });
};

const viewmethod = (methodId) => {
  router.push({ name: 'viewPaymentMethod', params: { id: methodId } });
};

const deletemethod = async (methodId) => {
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette méthode de paiement ?");
  
  if (confirmDelete) {
    try {
      await paymentMethodStore.removePaymentMethod(methodId);
      await fetchPaymentMethods();
    } catch (error) {
      console.error("Erreur lors de la suppression de la méthode de paiement :", error);
    }
  }
};

onMounted(fetchPaymentMethods);

const paymentMethods = computed(() => paymentMethodStore.paymentMethods); 
</script>

<style scoped>
h2 {
  color: #333;
  margin-bottom: 1rem;
}
</style>

<template>
  <div>
    <h2>PaymentMethods List</h2>
    <button @click="fetchPaymentMethods" class="btn btn-primary mb-3">Add PaymentMethods</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>User</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="method in paymentMethods" :key="method.id">
          <td>{{ method.name }}</td>
          <td>{{ method.status ? 'Active' : 'Inactive' }}</td>
          <td>{{ method.user?.username || 'Not assigned' }}</td>
          <td>
            <button @click="editMethod(method.id)" class="btn btn-warning btn-sm">Edit</button>
            <button @click="deleteMethod(method.id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { usePaymentMethodStore } from '@/stores/PaymentMethodStore.js';

const paymentMethodStore = usePaymentMethodStore();

const fetchPaymentMethods = async () => {
  await paymentMethodStore.loadPaymentMethods();
};

const editMethod = (methodId) => {
  console.log("Édition de la méthode avec l'ID:", methodId);
};

const deleteMethod = async (methodId) => {
  await paymentMethodStore.deletePaymentMethod(methodId); 
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

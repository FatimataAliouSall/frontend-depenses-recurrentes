<template>
    <div>
      <h2>Détails de la dépense</h2>
      <div v-if="expense">
        <p><strong>Titre :</strong> {{ expense.title }}</p>
        <p><strong>Montant :</strong> {{ expense.amount }}</p>
        <p><strong>Fréquence :</strong> {{ expense.frequency }}</p>
        <p><strong>Catégorie :</strong> {{ expense.category }}</p>
        <p><strong>Date de création :</strong> {{ new Date(expense.dateCreate).toLocaleDateString() }}</p>
      </div>
      <button @click="goBack" class="btn btn-secondary mt-3">Retour à la liste</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useExpenseStore } from '@/stores/ExpenseStore';
  
  const router = useRouter();
  const route = useRoute();
  const expenseStore = useExpenseStore();
  
  const expense = ref(null);
  
  onMounted(async () => {
    const id = route.params.id;
    expense.value = await expenseStore.getExpenseById(id);
  });
  
  const goBack = () => {
    router.push({ name: 'expenses' });
  };
  </script>
  
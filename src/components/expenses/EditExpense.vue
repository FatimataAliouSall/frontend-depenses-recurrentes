<template>
    <div>
      <h2>Modifier la dépense</h2>
      <form @submit.prevent="submitEdit">
        <div class="form-group">
          <label for="title">Titre</label>
          <input type="text" id="title" v-model="expense.title" class="form-control" required />
        </div>
  
        <div class="form-group">
          <label for="amount">Montant</label>
          <input type="number" id="amount" v-model="expense.amount" class="form-control" required />
        </div>
  
        <div class="form-group">
          <label for="frequency">Fréquence</label>
          <input type="text" id="frequency" v-model="expense.frequency" class="form-control" />
        </div>
  
        <div class="form-group">
          <label for="category">Catégorie</label>
          <input type="text" id="category" v-model="expense.category" class="form-control" />
        </div>
  
        <button type="submit" class="btn btn-success mt-3">Enregistrer les modifications</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useExpenseStore } from '@/stores/ExpenseStore';
  
  const router = useRouter();
  const route = useRoute();
  const expenseStore = useExpenseStore();
  
  const expense = ref({
    title: '',
    amount: 0,
    frequency: '',
    category: ''
  });
  
  onMounted(async () => {
    const id = route.params.id;
    const fetchedExpense = await expenseStore.getExpenseById(id);
    expense.value = fetchedExpense || expense.value;
  });
  
  const submitEdit = async () => {
    await expenseStore.updateExpense(route.params.id, expense.value);
    router.push({ name: 'expenses' });
  };
  </script>
  
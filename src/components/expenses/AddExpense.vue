<template>
    <div>
      <h2>Ajouter une dépense</h2>
      <form @submit.prevent="submitExpense">
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
          <label for="startDate">Date de début</label>
          <input type="date" id="startDate" v-model="expense.startDate" class="form-control" required />
        </div>
  
        <div class="form-group">
          <label for="endDate">Date de fin</label>
          <input type="date" id="endDate" v-model="expense.endDate" class="form-control" />
        </div>
  
        <div class="form-group">
          <label for="user">Utilisateur</label>
          <input type="text" id="user" v-model="expense.user" class="form-control" placeholder="Nom de l'utilisateur" />
        </div>
  
        <div class="form-group">
          <label for="category">Catégorie</label>
          <input type="text" id="category" v-model="expense.category" class="form-control" placeholder="Nom de la catégorie" />
        </div>
  
        <button type="submit" class="btn btn-primary mt-3">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useExpenseStore } from '@/stores/ExpenseStore';
  
  const router = useRouter();
  const expenseStore = useExpenseStore();
  
  const expense = ref({
    title: '',
    amount: 0,
    frequency: '',
    startDate: '',
    endDate: '',
    user: '',       // Champ texte pour l'utilisateur
    category: ''    // Champ texte pour la catégorie
  });
  
  const submitExpense = async () => {
    try {
      await expenseStore.createExpense(
        expense.value.title,
        expense.value.amount,
        expense.value.frequency,
        expense.value.startDate,
        expense.value.endDate,
        expense.value.user,
        expense.value.category
      );
      router.push({ name: 'expenses' });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la dépense:", error);
    }
  };
  </script>
  
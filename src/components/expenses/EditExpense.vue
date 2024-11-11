<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-3" style="width: 100%; max-width: 480px;">
      <h2 class="text-center mb-3">Modifier la dépense</h2>
      <form @submit.prevent="submitForm">
        <div class="row g-2">
          <div class="col-md-6">
            <label for="title" class="form-label">Titre</label>
            <input
              type="text"
              id="title"
              v-model="expense.title"
              class="form-control"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="amount" class="form-label">Montant</label>
            <input
              type="number"
              id="amount"
              v-model="expense.amount"
              class="form-control"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="frequency" class="form-label">Fréquence</label>
            <select id="frequency" v-model="expense.frequency" class="form-select">
              <option value="Mensuel">Mensuel</option>
              <option value="Annuel">Annuel</option>
              <option value="Hebdomadaire">Hebdomadaire</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="categoryId" class="form-label">Catégorie</label>
            <select id="categoryId" v-model="expense.categoryId" class="form-select">
              <option value="" disabled>Choisir une catégorie</option>
              <option v-for="category in categoryStore.expenseCategories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="startDate" class="form-label">Date de début</label>
            <input
              type="date"
              id="startDate"
              v-model="expense.startDate"
              class="form-control"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="endDate" class="form-label">Date de fin</label>
            <input
              type="date"
              id="endDate"
              v-model="expense.endDate"
              class="form-control"
            />
          </div>
        </div>
        <div class="d-flex justify-content-between mt-3">
          <button type="submit" class="btn btn-primary w-100 me-1">
            <i class="fas fa-save me-2"></i> Enregistrer
          </button>
          <button type="button" @click="goBack" class="btn btn-secondary w-100 ms-1">
            <i class="fas fa-arrow-left me-2"></i> Retour
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useExpenseStore } from '@/stores/ExpenseStore';
import { useExpenseCategoryStore } from '@/stores/expenseCategoryStore';

const router = useRouter();
const route = useRoute();
const expenseStore = useExpenseStore();
const categoryStore = useExpenseCategoryStore();

const expense = ref({
  title: '',
  amount: 0,
  frequency: '',
  startDate: '',
  endDate: '',
  categoryId: null
});

onMounted(async () => {
  // Chargement des catégories
  await categoryStore.loadExpenseCategories();

  // Chargement de la dépense actuelle à partir de l'ID
  await expenseStore.getExpenseById(route.params.id);
  const data = expenseStore.expense;

  if (data) {
    expense.value = {
      ...data,
      startDate: data.startDate.split('T')[0], // Formatage de la date si nécessaire
      endDate: data.endDate ? data.endDate.split('T')[0] : ''
    };
  }
});

const submitForm = async () => {
  try {
    await expenseStore.updateExpense({
      id: route.params.id,
      ...expense.value,
    });
    router.push({ name: 'expenses' });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la dépense:", error);
  }
};

const goBack = () => {
  router.push({ name: 'expenses' });
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
</style>

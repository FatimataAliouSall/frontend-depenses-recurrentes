<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-3" style="width: 100%; max-width: 480px;">
      <h2 class="text-center mb-3">Modifier la dépense</h2>
      <form @submit.prevent="submitForm">
        <div class="row g-2">
          <div class="col-md-6">
            <label for="title" class="form-label">Titre :</label>
            <input
              type="text"
              id="title"
              v-model="expense.title"
              class="form-control"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="categoryId" class="form-label">Catégorie</label>
            <select id="categoryId" v-model="expense.expenseCategoryId" class="form-select" required>
              <option value="" disabled>Choisir une catégorie</option>
              <option v-for="category in categoryStore.expenseCategories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
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
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();
const expenseStore = useExpenseStore();
const categoryStore = useExpenseCategoryStore();

const expense = ref({
  title: '',
  categoryId: ''
});

onMounted(async () => {
  await categoryStore.loadExpenseCategories();
  await expenseStore.getExpenseById(route.params.id);
  const data = expenseStore.expense;

  if (data) {
    expense.value = {
      ...data,
      // title: data.title || '',
      // categoryId: data.categoryId || '',
      // ...data,
      // startDate: data.startDate.split('T')[0], // Formatage de la date si nécessaire
      // endDate: data.endDate ? data.endDate.split('T')[0] : ''
    };
  }
});

const submitForm = async () => {
  try {
    await expenseStore.updateExpense({
      id: route.params.id,
      ...expense.value,
    });

    Swal.fire({
      icon: 'success',
      title: 'Dépense mise à jour',
      text: 'La dépense a été mise à jour avec succès.',
      confirmButtonText: 'OK'
    });
    router.push({ name: 'expenses' });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la dépense:", error);

    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Une erreur est survenue lors de la mise à jour de la dépense.',
      confirmButtonText: 'OK'
    });
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

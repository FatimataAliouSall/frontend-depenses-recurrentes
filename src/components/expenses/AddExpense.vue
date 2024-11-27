<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-3" style="width: 100%; max-width: 480px;">
      <div class="d-flex align-items-center mb-3">
        <button 
          type="button" 
          @click="goBack" 
          class="btn btn-secondary d-flex align-items-center me-2"
        >
          <i class="fas fa-arrow-left me-2"></i> Retour
        </button>
      </div>
      <h2 class="text-center mb-3">Ajouter une dépense</h2>
      <form @submit.prevent="submitExpense">
        <div class="row g-2">
          <div class="col-md-6">
            <label for="title" class="form-label">Titre</label>
            <input type="text" id="title" v-model="expense.title" class="form-control" 
            placeholder="Entrez le titre"
            required :class="{ 'is-invalid': errors.title }" />
            <small v-if="errors.title" class="text-danger">
            {{ errors.title }}
          </small>
          </div>
          <div class="col-md-6">
            <label for="category" class="form-label">Catégorie</label>
            <select id="category" v-model="expense.categoryId" class="form-control">
              <option value="" disabled>Choisir une catégorie</option>
              <option v-for="category in categoryStore.expenseCategories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-primary mt-3 w-100">Ajouter</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted , watch } from 'vue';
import { useRouter } from 'vue-router';
import { useExpenseStore } from '@/stores/ExpenseStore';
import { useExpenseCategoryStore } from '@/stores/expenseCategoryStore';
import Swal from 'sweetalert2';

const router = useRouter();
const ExpenseStore = useExpenseStore();
const categoryStore = useExpenseCategoryStore();

onMounted(() => {
  categoryStore.loadExpenseCategories();
});

const expense = ref({
  title: '',
  categoryId: 0 
});
const title = ref('');
const errors = ref({});
const serverErrors = ref([]); 

watch(serverErrors, (newErrors) => {
  errors.value = {}; // Réinitialiser les erreurs
  newErrors.forEach((err) => {
    if (err.path === 'title') {
      errors.value.username = err.msg;
    }
   
  });
});

const submitExpense = async () => {
  serverErrors.value = []; 
  try {
    
    await ExpenseStore.addExpense({
      title: expense.value.title,
      expenseCategoryId: expense.value.categoryId 
    });
    await ExpenseStore.loadExpenses();
    Swal.fire({
      icon: 'success',
      title: 'Dépense ajoutée',
      text: `dépense a été ajoutée avec succès.`,
      confirmButtonText: 'OK'
    }) .then(() => {
      router.push({ name: 'expenses' });
    });
  }  catch (error) {
    if (error.response && error.response.status === 422) {
      // En cas d'erreur de validation, stocker les erreurs dans serverErrors
      serverErrors.value = error.response.data.errors;
    } else {
      console.error('Erreur lors de l\'ajout de dépense :', error);

      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de dépense.',
        confirmButtonText: 'OK',
      });
    }
  }
};

const goBack = () => {
  router.push({ name: 'expenses' });
};
</script>

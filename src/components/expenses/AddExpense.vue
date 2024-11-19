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
      <h2 class="text-center mb-3">Ajouter</h2>
      <form @submit.prevent="submitExpense">
        <div class="row g-2">
          <!-- Formulaire en grille de 2 colonnes et 3 lignes -->
          <div class="col-md-6">
            <label for="title" class="form-label">Titre</label>
            <input type="text" id="title" v-model="expense.title" class="form-control" required />
          </div>
          <div class="col-md-6">
            <label for="amount" class="form-label">Montant</label>
            <input type="number" id="amount" v-model="expense.amount" class="form-control" required />
          </div>
          <div class="col-md-6">
            <label for="frequency" class="form-label">Fréquence</label>
            <select id="frequency" v-model="expense.frequency" class="form-control">
              <option value="Mensuel">Mensuel</option>
              <option value="Annuel">Annuel</option>
              <option value="Hebdomadaire">Hebdomadaire</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="startDate" class="form-label">Date début</label>
            <input type="date" id="startDate" v-model="expense.startDate" class="form-control" required />
          </div>
          <div class="col-md-6">
            <label for="endDate" class="form-label">Date fin</label>
            <input type="date" id="endDate" v-model="expense.endDate" class="form-control" />
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
import { ref, onMounted } from 'vue';
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
  amount: 0,
  frequency: '',
  startDate: '',
  endDate: '',
  categoryId: 0 
});

const submitExpense = async () => {
  try {
    await ExpenseStore.addExpense({
      title: expense.value.title,
      amount: expense.value.amount,
      frequency: expense.value.frequency,
      startDate: expense.value.startDate,
      endDate: expense.value.endDate,
      expenseCategoryId: expense.value.categoryId 
    });

    // Recharger les dépenses après l'ajout
    await ExpenseStore.loadExpenses();

    // Afficher une alerte de succès
    Swal.fire({
      icon: 'success',
      title: 'Dépense ajoutée',
      text: 'La dépense a été ajoutée avec succès.',
      confirmButtonText: 'OK'
    });

    // Rediriger vers la page des dépenses
    router.push({ name: 'expenses' });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la dépense:", error);

    // Afficher une alerte d'erreur
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Une erreur est survenue lors de l\'ajout de la dépense.',
      confirmButtonText: 'OK'
    });
  }
};

const goBack = () => {
  router.push({ name: 'expenses' });
};
</script>

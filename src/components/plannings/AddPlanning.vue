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
      <h2 class="text-center mb-3">Ajouter une Planification</h2>
      <form @submit.prevent="submitForm">
        <div class="row g-2">
          <div class="col-md-6">
            <label for="name" class="form-label">Nom</label>
            <input type="text" v-model="planning.name" class="form-control" id="name" required />
          </div>
          <div class="col-md-6">
            <label for="amount" class="form-label">Montant</label>
            <div class="d-flex">
              <input 
                type="number" 
                v-model="planning.amount" 
                class="form-control me-2" 
                id="amount" 
                required 
              />
              <select v-model="planning.unit" class="form-select" id="unit" required>
                <option value="" disabled>Devise</option>
                <option value="EUR">Euro (€)</option>
                <option value="MRU">Ouguiya (UM)</option>
                <option value="CFA">Franc CFA (CFA)</option>
                <option value="DZD">Dinar (DZD)</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <label for="startDate" class="form-label">Date de début</label>
            <input type="date" v-model="planning.startDate" class="form-control" id="startDate" required />
          </div>
          <div class="col-md-6">
            <label for="endDate" class="form-label">Date de fin</label>
            <input type="date" v-model="planning.endDate" class="form-control" id="endDate" required />
          </div>
          <div class="col-md-6">
            <label for="dueDate" class="form-label">Date d'échéance</label>
            <input type="date" v-model="planning.dueDate" class="form-control" id="dueDate" required />
          </div>
          <div class="col-md-12">
            <label for="expenseId" class="form-label">Dépense</label>
            <select v-model="planning.expenseId" class="form-control" id="expenseId" required>
              <option value="" disabled>Choisir une dépense</option>
              <option v-for="expense in ExpenseStore.expenses" :key="expense.id" :value="expense.id">
                {{ expense.title }}
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
import { usePlanningStore } from '@/stores/PlanningStore.js';
import Swal from 'sweetalert2';

const planningStore = usePlanningStore();
const router = useRouter();
const ExpenseStore = useExpenseStore();

onMounted(() => {
  ExpenseStore.loadExpenses();
});

const planning = ref({
  name: '',
  startDate: '',
  endDate: '',
  dueDate: '',
  amount: 0,
  unit: '',
  expenseId: ''
});

const validateDates = () => {
  const { startDate, endDate, dueDate } = planning.value;

  if (new Date(endDate) < new Date(startDate)) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'La date de fin ne peut pas être antérieure à la date de début.',
      confirmButtonText: 'OK'
    });
    return false;
  }

  if (new Date(dueDate) < new Date(startDate) || new Date(dueDate) > new Date(endDate)) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'La date d\'échéance doit être comprise entre la date de début et la date de fin.',
      confirmButtonText: 'OK'
    });
    return false;
  }

  return true;
};

const submitForm = async () => {
  if (!validateDates()) return;

  try {
    await planningStore.addPlanning({
      name: planning.value.name,
      startDate: planning.value.startDate,
      endDate: planning.value.endDate,
      dueDate: planning.value.dueDate,
      amount: planning.value.amount,
      unit: planning.value.unit,
      expenseId: planning.value.expenseId
    });

    Swal.fire({
      icon: 'success',
      title: 'Planification ajoutée',
      text: 'La planification a été ajoutée avec succès.',
      confirmButtonText: 'OK'
    });

    await planningStore.loadPlannings();
    router.push({ name: 'planning' });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Une erreur est survenue lors de l\'ajout de la planification.',
      confirmButtonText: 'OK'
    });
  }
};

const goBack = () => {
  router.push({ name: 'planning' });
};
</script>

<style scoped>
h2 {
  color: #333;
  margin-bottom: 1rem;
}
</style>

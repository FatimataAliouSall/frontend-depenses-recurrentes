<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-3" style="width: 100%; max-width: 480px;">
      <h2 class="text-center mb-3">Modifier la Planification</h2>
      <form @submit.prevent="submitForm">
        <div class="row g-2">
          <div class="col-md-6">
            <label for="name" class="form-label">Nom :</label>
            <input
              type="text"
              id="name"
              v-model="planning.name"
              class="form-control"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="amount" class="form-label">Montant :</label>
            <div class="input-group">
              <input
                type="number"
                id="amount"
                v-model="planning.amount"
                class="form-control"
                :disabled="planning.isPaid"
                required
              />
              <select
                v-model="planning.unit"
                class="form-select"
                :disabled="planning.isPaid"
                required
              >
                <option value="" disabled>Device</option>
                <option value="euro">Euro</option>
                <option value="MRU">Ouguiya</option>
                <option value="CFA">Franc CFA</option>
                <option value="dinar">Dinar</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <label for="startDate" class="form-label">Date de début :</label>
            <input
              type="date"
              id="startDate"
              v-model="planning.startDate"
              class="form-control"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="endDate" class="form-label">Date de fin :</label>
            <input
              type="date"
              id="endDate"
              v-model="planning.endDate"
              class="form-control"
            />
          </div>
          <div class="col-md-6">
            <label for="dueDate" class="form-label">Date d'échéance :</label>
            <input
              type="date"
              id="dueDate"
              v-model="planning.dueDate"
              class="form-control"
            />
          </div>
          <div class="col-md-12">
            <label for="expenseId" class="form-label">Dépense :</label>
            <select
              id="expenseId"
              v-model="planning.expenseId"
              class="form-select"
              required
            >
              <option value="" disabled>Choisir une dépense</option>
              <option
                v-for="expense in expenseStore.expenses"
                :key="expense.id"
                :value="expense.id"
              >
                {{ expense.title }}
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
import { usePlanningStore } from '@/stores/PlanningStore';
import { useExpenseStore } from '@/stores/ExpenseStore';
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();
const planningStore = usePlanningStore();
const expenseStore = useExpenseStore();

const planning = ref({
  name: '',
  startDate: '',
  endDate: '',
  dueDate: '',
  amount: 0,
  unit: '',
  expenseId: '',
  isPaid: false // Indique si la planification est payée
});

onMounted(async () => {
  await expenseStore.loadExpenses();
  await planningStore.getPlanningById(route.params.id);
  const data = planningStore.planning;

  if (data) {
    planning.value = {
      ...data,
      startDate: data.startDate.split('T')[0],
      endDate: data.endDate ? data.endDate.split('T')[0] : '',
      dueDate: data.dueDate ? data.dueDate.split('T')[0] : '',
      isPaid: data.isPaid || false // Si déjà payé, désactiver la modification du montant
    };
  }
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
    await planningStore.updatePlanning({
      id: route.params.id,
      ...planning.value
    });
    Swal.fire({
      title: 'Succès!',
      text: 'Planification mise à jour avec succès.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      router.push({ name: 'planning' });
    });
  } catch (error) {
    Swal.fire({
      title: 'Erreur!',
      text: 'Erreur lors de la mise à jour de la planification.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    console.error('Erreur lors de la mise à jour de la planification:', error);
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

.card {
  background-color: #f8f9fa;
  border-radius: 8px;
}

.form-label {
  font-weight: bold;
}

.input-group .form-control {
  flex: 2;
}

.input-group .form-select {
  flex: 1;
}
</style>

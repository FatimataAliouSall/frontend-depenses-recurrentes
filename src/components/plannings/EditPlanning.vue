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
              <input
                type="number"
                id="amount"
                v-model="planning.amount"
                class="form-control"
                required
              />
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
  
  const router = useRouter();
  const route = useRoute();
  const planningStore = usePlanningStore();
  const expenseStore = useExpenseStore();
  
  const planning = ref({
    name: '',
    startDate: '',
    endDate: '',
    amount: 0,
    expenseId: ''
  });
  
  onMounted(async () => {
    await expenseStore.loadExpenses();
    await planningStore.getPlanningById(route.params.id);
    const data = planningStore.planning;
  
    if (data) {
      planning.value = {
        ...data,
        startDate: data.startDate.split('T')[0], // Formatage de la date si nécessaire
        endDate: data.endDate ? data.endDate.split('T')[0] : ''
      };
    }
  });
  
  const submitForm = async () => {
    try {
      await planningStore.updatePlanning({
        id: route.params.id,
        ...planning.value,
      });
      router.push({ name: 'planning' });
    } catch (error) {
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
  </style>
  
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
              <input type="number" v-model="planning.amount" class="form-control" id="amount" required />
            </div>
            <div class="col-md-6">
              <label for="startDate" class="form-label">Date de début</label>
              <input type="date" v-model="planning.startDate" class="form-control" id="startDate" required />
            </div>
            <div class="col-md-6">
              <label for="endDate" class="form-label">Date de fin</label>
              <input type="date" v-model="planning.endDate" class="form-control" id="endDate" required />
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
    amount: 0,
    expenseId: ''
  });
  
  const submitForm = async () => {
    try {
      await planningStore.addPlanning({
        name: planning.value.name,
        startDate: planning.value.startDate,
        endDate: planning.value.endDate,
        amount: planning.value.amount,
        expenseId: planning.value.expenseId
      });
      await planningStore.loadPlannings();
      router.push({ name: 'planning' });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la planification:", error);
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
  
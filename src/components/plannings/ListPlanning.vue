<template>
  <div>
    <h2>Planning lists</h2>
    <button @click="fetchPlannings" class="btn btn-primary mb-3">Add plannings</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>StartDate</th>
          <th>EndDate</th>
          <th>Amount</th>
          <th>Expense</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="planning in plannings" :key="planning.id">
          <td>{{ planning.name }}</td>
          <td>{{ new Date(planning.startDate).toLocaleDateString() }}</td>
          <td>{{ new Date(planning.endDate).toLocaleDateString() }}</td>
          <td>{{ planning.amount }}</td>
          <td>{{ planning.expense?.title }}</td>
          <td>
            <button @click="editPlanning(planning.id)" class="btn btn-warning btn-sm">Éditer</button>
            <button @click="deletePlanning(planning.id)" class="btn btn-danger btn-sm">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { usePlanningStore } from '@/stores/PlanningStore.js';

const planningStore = usePlanningStore();

const fetchPlannings = async () => {
  await planningStore.loadPlannings();
};

const editPlanning = (planningId) => {
  console.log("Édition du planning avec l'ID:", planningId);
};

const deletePlanning = async (planningId) => {
  await planningStore.deletePlanning(planningId);
};

onMounted(fetchPlannings);

// Utiliser computed pour assurer la réactivité
const plannings = computed(() => planningStore.plannings);
</script>

<style scoped>
h2 {
  color: #333;
  margin-bottom: 1rem;
}
</style>

<template>
  <div>
    <h2>Liste des planifications</h2>
    <div class="mb-3">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher par nom de planification"
        class="form-control w-50"
      />
    </div>

    <button @click="addPlanning" class="btn btn-primary mb-3">Ajouter</button>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Date début</th>
          <th>Date fin</th>
          <th>Date d'échéance</th>
          <th>Montant</th>
          <th>Devise</th>
          <th>Dépense</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="planning in filteredPlannings" :key="planning.id">
          <td>{{ planning.name }}</td>
          <td>{{ new Date(planning.startDate).toLocaleDateString() }}</td>
          <td>{{ new Date(planning.endDate).toLocaleDateString() }}</td>
          <td>{{ new Date(planning.dueDate).toLocaleDateString() }}</td>
          <td>{{ planning.amount }}</td>
          <td>{{ planning.unit || 'N/A' }}</td> 
          <td>{{ planning.expense?.title }}</td>
          <td>
            <button @click="editPlanning(planning.id)" class="btn btn-warning btn-sm me-2"><i class="fas fa-edit"></i></button>
            <button @click="deletePlanning(planning.id)" class="btn btn-danger btn-sm me-2"><i class="fas fa-trash-alt"></i></button>
            <button @click="viewPlanning(planning.id)" class="btn btn-info btn-sm me-2"><i class="fas fa-eye"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePlanningStore } from '@/stores/PlanningStore.js';

const planningStore = usePlanningStore();
const router = useRouter();

const searchQuery = ref(''); 

const fetchPlannings = async () => {
  await planningStore.loadPlannings();
};

const addPlanning = () => {
  router.push({ name: 'addPlanning' });
};

const editPlanning = (planningId) => {
  router.push({ name: 'editPlanning', params: { id: planningId } });
};

const viewPlanning = (planningId) => {
  router.push({ name: 'viewPlanning', params: { id: planningId } });
};

const deletePlanning = async (planningId) => {
  const confirmDelete = window.confirm(
    "Êtes-vous sûr de vouloir supprimer cette planification ?"
  );

  if (confirmDelete) {
    try {
      console.log("Début de la suppression de la planification avec ID:", planningId);
      await planningStore.removePlanning(planningId);
      console.log("Suppression réussie, actualisation de la liste...");
      await fetchPlannings();
      alert("Planification supprimée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression de la planification :", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message + "\n" + error.response.data.suggestion);
      } else {
        alert("Une erreur s'est produite lors de la suppression de la planification. Veuillez réessayer.");
      }
    }
  }
};

onMounted(fetchPlannings);

const plannings = computed(() => planningStore.plannings);
const filteredPlannings = computed(() => {
  return plannings.value.filter((planning) =>
    planning.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
h2 {
  color: #333;
  margin-bottom: 1rem;
}
</style>

<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow-sm p-3" style="width: 100%; max-width: 480px;">
        <h2 class="text-center mb-3">Ajouter Catégorie de Dépense</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-2">
            <label for="name" class="form-label">Nom de la catégorie</label>
            <input 
              v-model="name" 
              type="text" 
              class="form-control" 
              id="name" 
              placeholder="Entrez le nom de la catégorie" 
              required
            />
          </div>
          
          <div class="mb-2">
            <label class="form-label">Statut</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input 
                  v-model="status" 
                  type="radio" 
                  class="form-check-input" 
                  id="status-actif" 
                  :value="true" 
                />
                <label class="form-check-label" for="status-actif">Actif</label>
              </div>
              <div class="form-check">
                <input 
                  v-model="status" 
                  type="radio" 
                  class="form-check-input" 
                  id="status-inactif" 
                  :value="false" 
                />
                <label class="form-check-label" for="status-inactif">Inactif</label>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-between mt-3">
            <button type="submit" class="btn btn-primary w-100 me-1">
              <i class="fas fa-plus me-2"></i> Ajouter
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
import { ref } from 'vue';
import { useExpenseCategoryStore } from '@/stores/expenseCategoryStore.js';
import { useRouter } from 'vue-router';

const expenseCategoryStore = useExpenseCategoryStore();
const router = useRouter();

const name = ref('');
const status = ref(true);

const submitForm = async () => {
  await expenseCategoryStore.addExpenseCategory({ name: name.value, status: status.value });
  router.push({ name: 'expenseCategory' });
};

const goBack = () => {
  router.push({ name: 'expenseCategory' });
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

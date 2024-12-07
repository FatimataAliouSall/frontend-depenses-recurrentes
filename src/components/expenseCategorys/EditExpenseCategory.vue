<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow-sm p-3" style="width: 100%; max-width: 480px;">
        <h2 class="text-center mb-3">Modifier la catégorie de dépense</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-2">
            <label for="name" class="form-label">Nom de la catégorie</label>
            <input
              v-model="name"
              type="text"
              class="form-control"
              id="name"
              placeholder="Entrez le nom "
              required
            />
          </div>
  
          <div class="mb-2">
            <label for="status" class="form-label">Statut</label>
            <select v-model="status" class="form-select" id="status">
              <option :value="true">Actif</option>
              <option :value="false">Inactif</option>
            </select>
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
  import { useExpenseCategoryStore } from '@/stores/expenseCategoryStore';
  import { useRoute, useRouter } from 'vue-router';
  import Swal from 'sweetalert2';
  
  const expenseCategoryStore = useExpenseCategoryStore();
  const route = useRoute();
  const router = useRouter();
  
  const name = ref('');
  const status = ref(true);
  
  const loadExpenseCategories = async () => {
    await expenseCategoryStore.getExpenseCategoryById(route.params.id);
    const category = expenseCategoryStore.expenseCategory;
    if (category) {
      name.value = category.name;
      status.value = category.status;
    }
  };
  
  const submitForm = async () => {
    try {
      await expenseCategoryStore.updateExpenseCategory({
        id: route.params.id,
        name: name.value,
        status: status.value,
      });

      // Afficher une alerte de succès
      Swal.fire({
        icon: 'success',
        title: 'Catégorie mise à jour',
        text: `La catégorie "${name.value}" a été mise à jour avec succès.`,
        confirmButtonText: 'OK',
      }).then(() => {
        router.push({ name: 'expenseCategory' });
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie :', error);

      // Afficher une alerte d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la mise à jour de la catégorie.',
        confirmButtonText: 'OK',
      });
    }
  };
  
  const goBack = () => {
    router.push({ name: 'expenseCategory' });
  };
  
  onMounted(loadExpenseCategories);
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
  
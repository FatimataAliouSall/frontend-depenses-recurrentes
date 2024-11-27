<template>
  <div>
    <h2>Liste des catégories de dépenses</h2>
    <button @click="goToAddCategory" class="btn btn-primary mb-3">Ajouter</button>
    
    <p v-if="expenseCategoryStore.successMessage" class="alert alert-success">{{ expenseCategoryStore.successMessage }}</p>
    <p v-if="expenseCategoryStore.error" class="alert alert-danger">{{ expenseCategoryStore.error }}</p>
    
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Statut</th>
          <th>Utilisateur</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in expenseCategories" :key="category.id">
          <td>{{ category.name || 'Sans nom' }}</td>
          <td>{{ category.status ? 'Actif' : 'Inactif' }}</td>
          <td>{{ category.user?.username || 'Non attribué' }}</td>
          <td>
            <button @click="editCategory(category.id)" class="btn btn-warning btn-sm me-2"><i class="fas fa-edit"></i> </button>
            <button @click="deleteCategory(category.id)" class="btn btn-danger btn-sm me-2"><i class="fas fa-trash-alt"></i> </button>
            <button @click="viewCategory(category.id)" class="btn btn-info btn-sm me-2"><i class="fas fa-eye"></i> </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useExpenseCategoryStore } from '@/stores/expenseCategoryStore.js';
import { useToast } from 'vue-toastification'; 
import Swal from 'sweetalert2';

const expenseCategoryStore = useExpenseCategoryStore();
const router = useRouter();
const toast = useToast(); 

// Accès à la propriété `expenseCategories` dans le store
const expenseCategories = computed(() => expenseCategoryStore.expenseCategories);

const fetchExpenseCategories = async () => {
  await expenseCategoryStore.loadExpenseCategories();
};

const goToAddCategory = () => {
  router.push({ name: 'addExpenseCategory' });
};

const editCategory = (categoryId) => {
  router.push({ name: 'editExpenseCategory', params: { id: categoryId } });
};

const viewCategory = (categoryId) => {
  router.push({ name: 'viewExpenseCategory', params: { id: categoryId } });
};

const deleteCategory = async (categoryId) => {
  // Afficher une alerte de confirmation avant la suppression
  const result = await Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: "Cette action est irréversible.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
  });

  if (result.isConfirmed) {
    try {
      const expenseCategoryStore = useExpenseCategoryStore(); // Accéder au store
      await expenseCategoryStore.removeExpenseCategory(categoryId);
      await expenseCategoryStore.loadExpenseCategories(); // Recharger les catégories
      
      // Afficher une alerte de succès avec Swal
      Swal.fire({
        icon: 'success',
        title: 'Catégorie supprimée',
        text: 'La catégorie a été supprimée avec succès.',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);

      // Ajouter un log pour inspecter l'erreur
      console.log(error); // Vérifier la structure de l'objet error

      // Vérifier si l'erreur contient un message et s'il inclut une information sur la contrainte de clé étrangère
      if (error?.response?.data?.message?.includes('associée à')) {
        // Extraire le message d'erreur
        const errorMessage = error?.response?.data?.message || 'Impossible de supprimer la catégorie.';
        
        // Afficher une notification toast
        toast.warning(errorMessage, {
          position: 'top-right',
          timeout: 5000,
        });

        // Afficher une alerte SweetAlert avec le message d'erreur spécifique
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: errorMessage,
          confirmButtonText: 'OK',
        });
      } else {
        // Si l'erreur n'est pas liée à la contrainte de clé étrangère
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la suppression de la catégorie.',
          confirmButtonText: 'OK',
        });
      }
    }
  }
};



onMounted(fetchExpenseCategories);
</script>


<style scoped>
h2 {
  color: #333;
  margin-bottom: 1rem;
}
.alert {
  margin-top: 1rem;
}
</style>

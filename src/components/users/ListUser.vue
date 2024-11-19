<template>
  <div>
    <h2>Liste des Utilisateurs</h2>
    <button @click="addUser" class="btn btn-primary mb-3">
  <i class=" me-2"></i> Ajouter
  <!-- <i class="bi bi-plus-lg"></i> -->
</button>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.status ? 'Actif' : 'Inactif' }}</td>
          <td>
            <button @click="viewUser(user.id)" class="btn btn-info btn-sm btn-sm me-2">
              <i class="fas fa-eye"></i> 
            </button>
            <button @click="editUser(user.id)" class="btn btn-warning btn-sm btn-sm me-2">
              <i class="fas fa-edit"></i> 
            </button>
            <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm btn-sm me-2">
              <i class="fas fa-trash-alt"></i> 
            </button>

          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const userStore = useUserStore();
const router = useRouter();

const users = computed(() => userStore.users);

const fetchUsers = async () => {
  await userStore.loadUserData();
};

const addUser = () => {
  router.push({ name: 'addUser' });
};

const editUser = (userId) => {
  router.push({ name: 'editUser', params: { id: userId } });
};

const viewUser = (userId) => {
  router.push({ name: 'viewUser', params: { id: userId } });
};

const deleteUser = async (userId) => {
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
      await userStore.removeUser(userId);
      await fetchUsers();
      
      // Afficher une alerte de succès
      Swal.fire({
        icon: 'success',
        title: 'Utilisateur supprimé',
        text: 'L\'utilisateur a été supprimé avec succès.',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      
      // Afficher une alerte d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la suppression de l\'utilisateur.',
        confirmButtonText: 'OK',
      });
    }
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
h2 {
  color: #333;
  margin-bottom: 1rem;
}
</style>

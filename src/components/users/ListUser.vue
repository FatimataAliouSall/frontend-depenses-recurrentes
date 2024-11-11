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
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
  
  if (confirmDelete) {
    await userStore.removeUser(userId);
    await fetchUsers();
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

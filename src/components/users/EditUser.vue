<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow-sm p-3" style="width: 100%; max-width: 480px;">
        <h2 class="text-center mb-3">Modifier l'utilisateur</h2>
        <form @submit.prevent="updateUser">
          <div class="mb-2">
            <label for="username" class="form-label">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              class="form-control"
              v-model="user.username"
              placeholder="Entrez le nom d'utilisateur"
              required
            />
          </div>
          
          <div class="mb-2">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              class="form-control"
              v-model="user.email"
              placeholder="Entrez l'email"
              required
            />
          </div>
          
          <div class="mb-2">
            <label for="role" class="form-label">Rôle</label>
            <select id="role" class="form-select" v-model="user.role">
              <option value="admin">Administrateur</option>
              <option value="user">Utilisateur</option>
            </select>
          </div>
          
          <div class="mb-2">
            <label for="status" class="form-label">Statut</label>
            <select id="status" class="form-select" v-model="user.status">
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
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/UserStore';
  
  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();
  const user = ref({});
  
  const fetchUser = async () => {
    const userId = parseInt(route.params.id);
    await userStore.getUserById(userId);
    user.value = { ...userStore.user };
  };
  
  const updateUser = async () => {
    await userStore.updateUser({ ...user.value, id: parseInt(route.params.id) });
    router.push({ name: 'user' });
  };
  
  const goBack = () => {
    router.push({ name: 'user' });
  };
  
  onMounted(fetchUser);
  </script>
  
  <style scoped>
  h2 {
    color: #333;
  }
  
  .card {
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  .form-label {
    font-weight: bold;
  }
  </style>
  
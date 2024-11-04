<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow-sm p-4" style="width: 100%; max-width: 480px;">
        <h2 class="text-center mb-4">Détails de l'utilisateur</h2>
        <div v-if="user">
          <p><strong>Nom d'utilisateur:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Rôle:</strong> {{ user.role }}</p>
          <p><strong>Statut:</strong> {{ user.status ? 'Actif' : 'Inactif' }}</p>
        </div>
        <button @click="goBack" class="btn btn-secondary w-100 mt-3">
          <i class="fas fa-arrow-left me-2"></i> Retour
        </button>
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
  const user = ref(null);
  
  const fetchUser = async () => {
    const userId = parseInt(route.params.id);
    await userStore.getUserById(userId);
    user.value = { ...userStore.user };
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
  
  p {
    font-size: 1.1rem;
  }
  </style>
  
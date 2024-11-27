<template>
  <div v-if="isLoading">Chargement...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <h2>Profil Utilisateur</h2>
    <p>Nom d'utilisateur: {{ user.username }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Rôle: {{ user.role }}</p>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore.js';
import { onMounted } from 'vue';

// Récupération du store
const userStore = useUserStore();

// Charger le profil de l'utilisateur lorsque le composant est monté
onMounted(() => {
  userStore.getProfil();
});
</script>

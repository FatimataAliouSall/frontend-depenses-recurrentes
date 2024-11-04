<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="login-container shadow p-4 rounded">
      <h2 class="text-center mb-4">Connexion</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group mb-3">
          <label for="usernameOrEmail" class="form-label">Nom d'utilisateur ou Email</label>
          <input
            type="text"
            id="usernameOrEmail"
            v-model="credentials.usernameOrEmail"
            required
            placeholder="Nom d'utilisateur ou Email"
            class="form-control"
          />
        </div>
        <div class="form-group mb-3">
          <label for="password" class="form-label">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="credentials.password"
            required
            placeholder="Mot de passe"
            class="form-control"
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Se connecter</button>
        <router-link to="/dashboard">fggggg</router-link>
        <p v-if="errorMessage" class="error text-center mt-3">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const credentials = ref({ usernameOrEmail: '', password: '' });
const router = useRouter();
const errorMessage = ref('');

const handleLogin = async () => {
  try {
    await authStore.login(credentials.value.usernameOrEmail, credentials.value.password);
    router.push('/dashboard');
  } catch (error) {
    errorMessage.value = error.message || 'Erreur de connexion';
    console.error(error.message);
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  background-color: #f8f9fa;
}

.error {
  color: red;
  font-size: 0.9rem;
}
</style>

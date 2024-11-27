<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="login-container shadow p-4 rounded">
      <h2 class="text-center mb-4">Connexion</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group mb-3 position-relative">
          <label for="email" class="form-label">Email</label>
          <i class="fas fa-envelope icon-email position-absolute"></i>
          <input
            type="email"
            id="email"
            v-model="credentials.email"
            required
            placeholder="Entrez votre email"
            class="form-control"
          />
        </div>
        <div class="form-group mb-3 position-relative">
          <label for="password" class="form-label">Mot de passe</label>
          <i class="fas fa-lock icon-password position-absolute"></i>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="credentials.password"
            required
            placeholder="Entrez votre mot de passe"
            class="form-control"
          />
          <button
            type="button"
            class="btn show-password-btn position-absolute"
            @click="togglePasswordVisibility"
          >
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
        <button type="submit" class="btn btn-primary w-100">Se connecter</button>
        <div class="text-end mt-2">
          <router-link to="/forgot-password" class="small">Mot de passe oublié ?</router-link>
        </div>
        <p v-if="errorMessage" class="error text-center mt-3">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'; // Import de SweetAlert2

const authStore = useAuthStore();
const credentials = ref({ email: '', password: '' });
const router = useRouter();
const errorMessage = ref('');
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  try {
    console.log('Tentative de connexion avec les données :', credentials.value);
    await authStore.login(credentials.value.email, credentials.value.password);
    console.log('Connexion réussie.');

    Swal.fire({
      title: 'Connexion réussie',
      text: 'Vous êtes maintenant connecté(e).',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      router.push('/dashboard/home');
    });
  } catch (error) {
    console.error('Erreur de connexion :', error.message || error);
    errorMessage.value = error.message || 'Erreur de connexion.';
    Swal.fire({
      title: 'Erreur',
      text: errorMessage.value,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.icon-email,
.icon-password {
  left: 10px;
  top: 38px;
  color: #6c757d;
  font-size: 1.2rem;
  position: absolute;
}

.show-password-btn {
  right: 10px;
  top: 35px;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #6c757d;
  z-index: 1;
}

.form-control {
  padding-left: 2.5rem; /* Espace pour l'icône de gauche */
  padding-right: 2.5rem; /* Espace pour le bouton de l'œil */
}

.error {
  color: red;
  font-size: 0.9rem;
}
</style>

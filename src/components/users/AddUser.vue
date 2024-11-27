<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-4" style="width: 100%; max-width: 480px;">
      <h2 class="text-center mb-4">Ajouter un Utilisateur</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Nom d'utilisateur -->
        <div class="mb-3">
          <label for="username" class="form-label">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            v-model="user.username"
            class="form-control"
            :class="{ 'is-invalid': errors.username }"
            placeholder="Entrez le nom d'utilisateur"
          />
          <small v-if="errors.username" class="text-danger">
            {{ errors.username }}
          </small>
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            v-model="user.email"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
            placeholder="Entrez l'email"
          />
          <small v-if="errors.email" class="text-danger">
            {{ errors.email }}
          </small>
        </div>

        <!-- Mot de passe -->
        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe</label>
          <div class="input-group">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="user.password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
              placeholder="Entrez le mot de passe"
            />
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="togglePasswordVisibility"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <small v-if="errors.password" class="text-danger">
            {{ errors.password }}
          </small>
        </div>

        <!-- Rôle -->
        <div class="mb-3">
          <label for="role" class="form-label">Rôle</label>
          <select
            id="role"
            v-model="user.role"
            class="form-select"
            :class="{ 'is-invalid': errors.role }"
          >
            <option disabled value="">Sélectionnez un rôle</option>
            <option value="Admin">Admin</option>
            <option value="Menager">Menager</option>
          </select>
          <small v-if="errors.role" class="text-danger">
            {{ errors.role }}
          </small>
        </div>

        <!-- Statut -->
        <div class="mb-3">
          <label class="form-label">Statut</label>
          <div class="d-flex gap-3">
            <div class="form-check">
              <input
                type="radio"
                id="active"
                :value="true"
                v-model="user.status"
                class="form-check-input"
              />
              <label for="active" class="form-check-label">Actif</label>
            </div>
            <div class="form-check">
              <input
                type="radio"
                id="inactive"
                :value="false"
                v-model="user.status"
                class="form-check-input"
              />
              <label for="inactive" class="form-check-label">Inactif</label>
            </div>
          </div>
          <small v-if="errors.status" class="text-danger">
            {{ errors.status }}
          </small>
        </div>

        <!-- Boutons -->
        <div class="d-flex justify-content-between mt-4">
          <button type="submit" class="btn btn-primary w-100 me-2">
            <i class="fas fa-user-plus me-2"></i> Ajouter
          </button>
          <button type="button" @click="goBack" class="btn btn-secondary w-100 ms-2">
            <i class="fas fa-arrow-left me-2"></i> Retour
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

// Store et router
const userStore = useUserStore();
const router = useRouter();

// État utilisateur et erreurs
const user = ref({
  username: '',
  email: '',
  password: '',
  role: '',
  status: true,
});

const errors = ref({});
const serverErrors = ref([]); // Pour stocker temporairement les erreurs serveur
const showPassword = ref(false);

// Basculer la visibilité du mot de passe
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Surveiller les erreurs serveur pour les remonter dans errors
watch(serverErrors, (newErrors) => {
  errors.value = {}; // Réinitialiser les erreurs
  newErrors.forEach((err) => {
    if (err.path === 'username') {
      errors.value.username = err.msg;
    }
    if (err.path === 'email') {
      errors.value.email = err.msg;
    }
    if (err.path === 'password') {
      errors.value.password = err.msg;
    }
    if (err.path === 'role') {
      errors.value.role = err.msg;
    }
    if (err.path === 'status') {
      errors.value.status = err.msg;
    }
  });
});

// Soumettre le formulaire
const handleSubmit = async () => {
  serverErrors.value = []; // Réinitialiser les erreurs serveur avant la soumission

  try {
    await userStore.addUser(user.value);

    Swal.fire({
      icon: 'success',
      title: 'Utilisateur ajouté',
      text: `${user.value.username} a été ajouté avec succès !`,
      confirmButtonText: 'OK',
    }).then(() => {
      router.push({ name: 'user' });
    });
  } catch (error) {
    if (error.response && error.response.status === 422) {
      // En cas d'erreur de validation, stocker les erreurs dans serverErrors
      serverErrors.value = error.response.data.errors;
    } else {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);

      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'ajout de l\'utilisateur.',
        confirmButtonText: 'OK',
      });
    }
  }
};

const goBack = () => {
  router.push({ name: 'user' });
};
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

.input-group .btn {
  margin-left: -1px;
  z-index: 1;
}
</style>

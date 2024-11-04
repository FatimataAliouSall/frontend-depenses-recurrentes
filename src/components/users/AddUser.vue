<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow-sm p-3" style="width: 100%; max-width: 480px;">
        <h2 class="text-center mb-3">Ajouter un Utilisateur</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-2">
            <label for="username" class="form-label">Nom d'utilisateur</label>
            <input 
              type="text" 
              id="username" 
              v-model="user.username" 
              class="form-control" 
              :class="{ 'is-invalid': errors.username }"
              placeholder="Entrez le nom d'utilisateur"
            />
            <div v-if="errors.username" class="invalid-feedback">
              {{ errors.username }}
            </div>
          </div>
  
          <div class="mb-2">
            <label for="email" class="form-label">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="user.email" 
              class="form-control" 
              :class="{ 'is-invalid': errors.email }"
              placeholder="Entrez l'email"
            />
            <div v-if="errors.email" class="invalid-feedback">
              {{ errors.email }}
            </div>
          </div>
  
          <div class="mb-2">
            <label for="password" class="form-label">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              v-model="user.password" 
              class="form-control" 
              :class="{ 'is-invalid': errors.password }"
              placeholder="Entrez le mot de passe"
            />
            <div v-if="errors.password" class="invalid-feedback">
              {{ errors.password }}
            </div>
          </div>
  
          <div class="mb-2">
            <label for="role" class="form-label">Rôle</label>
            <select 
              id="role" 
              v-model="user.role" 
              class="form-select" 
              :class="{ 'is-invalid': errors.role }"
            >
              <option value="admin">Admin</option>
              <option value="utilisateur">Utilisateur</option>
            </select>
            <div v-if="errors.role" class="invalid-feedback">
              {{ errors.role }}
            </div>
          </div>
  
          <div class="mb-2">
            <label for="status" class="form-label">Statut</label>
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
            <div v-if="errors.status" class="invalid-feedback">
              {{ errors.status }}
            </div>
          </div>
  
          <div class="d-flex justify-content-between mt-3">
            <button type="submit" class="btn btn-primary w-100 me-1">
              <i class="fas fa-user-plus me-2"></i> Ajouter
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
  import { ref } from 'vue';
  import { useUserStore } from '@/stores/UserStore';
  import { useRouter } from 'vue-router';
  
  const userStore = useUserStore();
  const router = useRouter();
  
  const user = ref({
    username: '',
    email: '',
    password: '',
    role: '',
    status: true,
  });
  
  const errors = ref({});
  
  const handleSubmit = async () => {
    try {
      await userStore.addUser(user.value);
      router.push({ name: 'user' });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        errors.value = validationErrors.reduce((acc, err) => {
          acc[err.param] = err.msg;
          return acc;
        }, {});
      } else {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        alert("Une erreur est survenue lors de l'ajout de l'utilisateur.");
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
  </style>
  
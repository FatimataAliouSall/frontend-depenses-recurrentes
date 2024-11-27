<template>
  <div class="forgot-password card shadow-sm mx-auto">
    <div class="card-body text-center">
      <h4 class="card-title mb-4">Réinitialiser le mot de passe</h4>
      <form @submit.prevent="handleForgotPassword">
        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="fas fa-envelope"></i>
          </span>
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Entrez votre email"
            required
          />
        </div>
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary btn-sm">
            <i class="fas fa-paper-plane"></i> Envoyer
          </button>
          <router-link to="/" class="btn btn-secondary btn-sm">
            <i class="fas fa-arrow-left"></i> Retour
          </router-link>
        </div>
      </form>
      <p v-if="message" class="message mt-3 text-success">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const email = ref("");
const message = ref("");
const toast = useToast();

async function handleForgotPassword() {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/request-password-reset",
      { email: email.value }
    );
    message.value = response.data.message || "Lien de réinitialisation envoyé.";
    toast.success("Lien de réinitialisation envoyé !");
  } catch (error) {
    message.value = error.response?.data?.message || "Erreur lors de l'envoi.";
    toast.error("Erreur lors de l'envoi.");
  }
}
</script>

<style scoped>
.forgot-password {
  width: 100%;
  max-width: 380px;
  margin: 80px auto;
  border-radius: 8px;
}

.input-group-text {
  background-color: #f8f9fa;
  border-right: none;
}

.form-control {
  border-left: none;
  height: 36px;
}

.btn {
  padding: 6px 12px;
  font-size: 0.875rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.message {
  font-size: 0.9rem;
}
</style>

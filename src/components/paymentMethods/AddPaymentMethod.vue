<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-3" style="width: 100%; max-width: 480px;">
      <h2 class="text-center mb-3">Ajouter un paiement méthode</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-2">
          <label for="name" class="form-label">Nom paiement</label>
          <input 
            v-model="name" 
            type="text" 
            class="form-control" 
            id="name" 
            placeholder="Entrez le nom de la méthode de paiement" 
            required
            :class="{ 'is-invalid': errors.name }"
          />
          <small v-if="errors.name" class="text-danger">
            {{ errors.name }}
          </small>
        </div>
        
        <div class="mb-2">
          <label class="form-label">Statut</label>
          <div class="d-flex gap-3">
            <div class="form-check">
              <input 
                v-model="status" 
                type="radio" 
                class="form-check-input" 
                id="status-actif" 
                :value="true" 
              />
              <label class="form-check-label" for="status-actif">Actif</label>
            </div>
            <div class="form-check">
              <input 
                v-model="status" 
                type="radio" 
                class="form-check-input" 
                id="status-inactif" 
                :value="false" 
              />
              <label class="form-check-label" for="status-inactif">Inactif</label>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-between mt-3">
          <button type="submit" class="btn btn-primary w-100 me-1">
            <i class="fas fa-plus me-2"></i> Ajouter
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
import { ref, watch } from 'vue';
import { usePaymentMethodStore } from '@/stores/PaymentMethodStore.js';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const PaymentMethodStore = usePaymentMethodStore();
const router = useRouter();

const name = ref('');
const status = ref(true);
const errors = ref({});
const serverErrors = ref([]); 

watch(serverErrors, (newErrors) => {
  errors.value = {}; 
  newErrors.forEach((err) => {
    if (err.path === 'name') {
      errors.value.name = err.msg;
    }
    if (err.path === 'status') {
      errors.value.status = err.msg;
    }
  });
});

const submitForm = async () => {
  serverErrors.value = [];
  try {
    const errorsFromServer = await PaymentMethodStore.addPaymentMethod({ name: name.value, status: status.value });
    if (errorsFromServer.length > 0) {
      // Si des erreurs existent, on les assigne à l'objet `errors` de manière structurée
      errors.value = {};
      errorsFromServer.forEach((err) => {
        if (err.path === 'name') {
          errors.value.name = err.msg;
        }
        if (err.path === 'status') {
          errors.value.status = err.msg;
        }
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Methode de paiement ajouté',
        text: `La methode "${name.value}" a été ajouté avec succès.`,
        confirmButtonText: 'OK',
      }).then(() => {
        router.push({ name: 'paymentMethods' });
      });
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du mode de paiement:', error);
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Une erreur est survenue lors de l\'ajout du mode de paiement.',
      confirmButtonText: 'OK'
    });
  }
};

const goBack = () => {
  router.push({ name: 'paymentMethods' });
};
</script>

<style scoped>
h2 {
  color: #333;
  margin-bottom: 1rem;
}

.card {
  background-color: #f8f9fa;
  border-radius: 8px;
}

.form-label {
  font-weight: bold;
}
</style>

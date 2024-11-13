<!-- <template>
    <div>
      <h2>Modifier le paiement</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="amount" class="form-label">Montant</label>
          <input type="number" v-model="formData.amount" class="form-control" id="amount" required />
        </div>
  
        <div class="mb-3">
          <label for="paymentDate" class="form-label">Date de paiement</label>
          <input type="date" v-model="formData.paymentDate" class="form-control" id="paymentDate" required />
        </div>
  
        <div class="mb-3">
          <label for="reference" class="form-label">Référence</label>
          <input type="text" v-model="formData.reference" class="form-control" id="reference" />
        </div>
  
        <div class="mb-3">
          <label for="planning" class="form-label">Planification</label>
          <select v-model="formData.planning" class="form-select" id="planning">
            <option v-for="planning in plannings" :key="planning.id" :value="planning.id">
              {{ planning.name }}
            </option>
          </select>
        </div>
  
        <div class="mb-3">
          <label for="paymentMethod" class="form-label">Méthode de paiement</label>
          <select v-model="formData.paymentMethod" class="form-select" id="paymentMethod">
            <option v-for="method in paymentMethods" :key="method.id" :value="method.id">
              {{ method.name }}
            </option>
          </select>
        </div>
  
        <button type="submit" class="btn btn-primary">Enregistrer</button>
        <button @click="cancelEdit" class="btn btn-secondary ms-2">Annuler</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { usePaymentStore } from '@/stores/PaymentStore.js';
  
  const paymentStore = usePaymentStore();
  const router = useRouter();
  const route = useRoute();
  
  const formData = reactive({
    amount: '',
    paymentDate: '',
    reference: '',
    planning: '',
    paymentMethod: '',
  });
  
  const loadPayment = async () => {
    
    const paymentId = route.params.id;
    await paymentStore.getPaymentById(paymentId);
  
    formData.amount = paymentStore.payment.amount;
    formData.paymentDate = paymentStore.payment.paymentDate;
    formData.reference = paymentStore.payment.reference;
    formData.planning = paymentStore.payment.planning || '';
    formData.paymentMethod = paymentStore.payment.paymentMethod || '';
  };
  
  const handleSubmit = async () => {
    const updatedPayment = {
      ...formData,
      id: route.params.id,
    };
  
    await paymentStore.updatePayment(updatedPayment);
    router.push({ name: 'payments' }); // Retourne à la liste des paiements
  };
  
  const cancelEdit = () => {
    router.push({ name: 'payments' });
  };
  
  onMounted(async () => {
    await paymentStore.getRequirements(); // Charger les plannings et méthodes de paiement
    loadPayment(); // Charger les données du paiement pour les éditer
  });
  </script>
  
  <style scoped>
  /* Styles supplémentaires si nécessaire */
  </style>
   -->

   <template>
    <div>
      <h2>Modifier le paiement</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="amount" class="form-label">Montant</label>
          <input type="number" v-model="formData.amount" class="form-control" id="amount" required />
        </div>
  
        <div class="mb-3">
          <label for="paymentDate" class="form-label">Date de paiement</label>
          <input type="date" v-model="formData.paymentDate" class="form-control" id="paymentDate" required />
        </div>
  
        <div class="mb-3">
          <label for="reference" class="form-label">Référence</label>
          <input type="text" v-model="formData.reference" class="form-control" id="reference" />
        </div>
  
        <div class="mb-3">
          <label for="planning" class="form-label">Planification</label>
          <select v-model="formData.planning" class="form-select" id="planning">
            <option v-for="planning in paymentStore.plannings" :key="planning.id" :value="planning.id">
              {{ planning.name }}
            </option>
          </select>
        </div>
  
        <div class="mb-3">
          <label for="paymentMethod" class="form-label">Méthode de paiement</label>
          <select v-model="formData.paymentMethod" class="form-select" id="paymentMethod">
            <option v-for="method in paymentStore.paymentMethods" :key="method.id" :value="method.id">
              {{ method.name }}
            </option>
          </select>
        </div>
  
        <button type="submit" class="btn btn-primary">Enregistrer</button>
        <button @click="cancelEdit" class="btn btn-secondary ms-2">Annuler</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { usePaymentStore } from '@/stores/PaymentStore.js';
    // import { usePlanningStore } from '@/stores/PlanningStore';
//   const planingStore = usePlanningStore()
  const paymentStore = usePaymentStore();
  const router = useRouter();
  const route = useRoute();
  
  const formData = reactive({
    amount: '',
    paymentDate: '',
    reference: '',
    planning: '',
    paymentMethod: '',
  });
  
  const loadPayment = async () => {
    const paymentId = route.params.id;
    await paymentStore.getPaymentById(paymentId);
  
    if (paymentStore.payment) {
      formData.amount = paymentStore.payment.amount;
      formData.paymentDate = paymentStore.payment.paymentDate;
      formData.reference = paymentStore.payment.reference;
      formData.planning = paymentStore.payment.planning ;
      formData.paymentMethod = paymentStore.payment.paymentMethod ;
    }
    console.log("Options de planification disponibles :", paymentStore.plannings);
console.log("Méthodes de paiement disponibles :", paymentStore.paymentMethods);
console.log("Données de paiement après récupération :", paymentStore.payment);
console.log("FormData après assignation :", formData);

  };
  
  const handleSubmit = async () => {
    const updatedPayment = {
      ...formData,
      id: route.params.id,
    };
  
    await paymentStore.updatePayment(updatedPayment);
    router.push({ name: 'payments' });
  };
  
  const cancelEdit = () => {
    router.push({ name: 'payments' });
  };
  
  onMounted(async () => {
    await paymentStore.getRequirements();
    await loadPayment();
  });
  </script>
  
  <style scoped>
  /* Styles supplémentaires si nécessaire */
  </style>
  
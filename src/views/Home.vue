<template>
  <div class="dashboard container">
    <h1 class="text-center my-4">💰 Tableau de bord financier</h1>

    <!-- Alerte pour paiements en retard -->
    <div v-if="overduePaymentsCount > 0" class="alert alert-danger text-center" role="alert">
      <strong>Attention!</strong> Vous avez {{ overduePaymentsCount }} paiement(s) en retard !
    </div>

    <!-- Total des paiements, paiements à venir, paiements effectués -->
    <div class="row mb-5">
      <div class="col-md-4">
        <div class="card text-center shadow-sm animate__animated animate__fadeInUp" style="animation-delay: 0.2s;">
          <div class="card-body">
            <h5 class="card-title">Total des paiements</h5>
            <p class="display-6 text-primary">{{ totalPayments }} MRU</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center shadow-sm animate__animated animate__fadeInUp" style="animation-delay: 0.4s;">
          <div class="card-body">
            <h5 class="card-title">Paiements à venir</h5>
            <p class="display-6 text-warning">{{ upcomingPayments }} MRU</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center shadow-sm animate__animated animate__fadeInUp" style="animation-delay: 0.6s;">
          <div class="card-body">
            <h5 class="card-title">Paiements effectués</h5>
            <p class="display-6 text-success">{{ completedPayments }} MRU</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Graphique des dépenses par mois -->
    <div class="row mb-5">
      <div class="col-md-12">
        <div class="card shadow-sm animate__animated animate__fadeInLeft">
          <div class="card-body">
            <h5 class="card-title text-center">Dépenses par mois </h5>
            <ExpensesByMonthChart  :payment-data="paymentData" :planning-data="plannigData"/>

          </div>
        </div>
      </div>
    </div>

    <!-- Graphiques supplémentaires -->
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card shadow-sm animate__animated animate__fadeInLeft">
          <div class="card-body">
            <h5 class="card-title text-center">Dépenses par catégorie</h5>
            <DoughnutChart />
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card shadow-sm animate__animated animate__fadeInRight">
          <div class="card-body">
            <h5 class="card-title text-center">Évolution des dépenses</h5>
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePaymentStore } from "@/stores/PaymentStore.js";
import { useExpenseStore } from "@/stores/ExpenseStore.js";
import { usePlanningStore } from "@/stores/PlanningStore";
import { onMounted, computed } from "vue";
import DoughnutChart from "./chartComponents/DoughnutChart.vue";
import LineChart from "./chartComponents/LineChart.vue";
import ExpensesByMonthChart from "./chartComponents/ExpensesByMonthChart.vue";

const paymentStore = usePaymentStore();
const expenseStore = useExpenseStore();
const planningStore = usePlanningStore();

// Charger les données nécessaires
onMounted(() => {
  paymentStore.loadPayments();
  expenseStore.loadExpenses();
  planningStore.loadPlannings();

  console.log("Paiements chargés :", paymentStore.payments);
  console.log("Dépenses chargées :", expenseStore.expenses);
});

// Calculer les totaux
const totalPayments = computed(() => {
  const total = paymentStore.payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0).toFixed(2);
  console.log("Total des paiements calculé :", total);
  return total;
});

const upcomingPayments = computed(() => {
  const total = paymentStore.payments
    .filter(payment => new Date(payment.paymentDate) > new Date())
    .reduce((sum, payment) => sum + parseFloat(payment.amount), 0)
    .toFixed(2);
  console.log("Paiements à venir calculés :", total);
  return total;
});
const  paymentData =  [5, 19, 30, 15, 2,30];
const  plannigData =  [12, 19, 3, 5, 2, 3];
const completedPayments = computed(() => {
  const total = paymentStore.payments
    .filter(payment => new Date(payment.paymentDate) <= new Date())
    .reduce((sum, payment) => sum + parseFloat(payment.amount), 0)
    .toFixed(2);
  console.log("Paiements effectués calculés :", total);
  return total;
});

// Paiements en retard
const overduePayments = computed(() => {
  const overdue = paymentStore.payments.filter(payment => new Date(payment.paymentDate) < new Date() && !payment.isPaid);
  console.log("Paiements en retard :", overdue);
  return overdue;
});



const overduePaymentsCount = computed(() => {
  console.log("Nombre de paiements en retard :", overduePayments.value.length);
  return overduePayments.value.length;
});
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.card {
  border-radius: 10px;
}

.card:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.card-title {
  font-weight: bold;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #4BC0C0;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}
</style>

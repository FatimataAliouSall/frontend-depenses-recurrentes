<template>
  <div class="dashboard d-flex">
    <!-- Barre latérale -->
    <div class="sidebar bg-dark text-white vh-100 p-3">
      <div class="logo-container text-center mb-4">
        <img src="../assets/logo.webp" alt="Expense Manager Logo" class="logo" />
      </div>
      <!-- <h3 class="text-center">Expense Manager</h3> -->
      <ul class="nav flex-column mt-4">
        <li class="nav-item mb-2">
          <router-link to="/dashboard/user" class="nav-link text-white" :class="{ active: currentMenu === 'User' }" @click="setActiveMenu('User')">
            <i class="fa fa-user"></i> Utilisateurs
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/dashboard/expenses" class="nav-link text-white" :class="{ active: currentMenu === 'Expenses' }" @click="setActiveMenu('Expenses')">
            <i class="fa fa-dollar-sign"></i> Dépenses
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/dashboard/payments" class="nav-link text-white" :class="{ active: currentMenu === 'Payments' }" @click="setActiveMenu('Payments')">
            <i class="fa fa-credit-card"></i> Paiements
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/dashboard/planning" class="nav-link text-white" :class="{ active: currentMenu === 'Planning' }" @click="setActiveMenu('Planning')">
            <i class="fa fa-calendar"></i> Planifications
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/dashboard/payment-methods" class="nav-link text-white" :class="{ active: currentMenu === 'PaymentMethods' }" @click="setActiveMenu('PaymentMethods')">
            <i class="fa fa-money-check"></i> Méthodes paiements
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/dashboard/expense-category" class="nav-link text-white" :class="{ active: currentMenu === 'ExpenseCategory' }" @click="setActiveMenu('ExpenseCategory')">
            <i class="fa fa-tags"></i> Catégories dépenses
          </router-link>
        </li>
      </ul>
    </div>

    <div class="content p-4">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentMenu = ref('Dashboard');

function setActiveMenu(menu) {
  currentMenu.value = menu;
}
</script>

<style scoped>
.sidebar {
  width: 250px;
}

/* .logo-container {
  background-color: #222; 
  padding: 10px;
  border-radius: 8px;
} */

.logo {
  max-width: 60px; 
}

.nav-link {
  font-size: 1.1em;
}

.nav-link.active {
  background-color: #007bff;
  border-radius: 5px;
}

.content {
  flex-grow: 1;
}
</style>

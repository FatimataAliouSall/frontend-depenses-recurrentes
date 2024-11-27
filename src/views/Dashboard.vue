<template>
  <div class="dashboard d-flex flex-column">
    <header class="header bg-primary text-white d-flex align-items-center justify-content-between px-4 py-2">
      <div class="d-flex align-items-center">
        <button @click="toggleSidebar" class="btn btn-outline-light me-3">
          <i class="fa fa-bars"></i>
        </button>
        <h3 class="m-0"></h3>
      </div>
      <div class="header-right d-flex align-items-center">
        <span class="me-3">{{ store.user?.username || 'Utilisateur' }}</span>
        <router-link to="/dashboard/profile" class="btn btn-outline-light me-3">
          <!-- <i class="fa fa-user"></i> -->
          Mon Profil
        </router-link>
        <button class="btn btn-danger" @click="handleLogout"><i class="fa-solid fa-right-to-bracket "></i>
          Déconnexion
        </button>
      </div>
    </header>

    <div class="dashboard-body d-flex">
      <div :class="['sidebar', { 'collapsed': isSidebarCollapsed }]" class="bg-dark text-white vh-100 p-3">
        <div class="logo-container text-center mb-4">
          <img src="../assets/logo.webp" alt="Expense Manager Logo" class="logo" />
        </div>
        <div class="user-info text-center mb-4">
          <p class="mb-1">Bienvenue,</p>
          <h5 class="text-white">{{ store.user?.username || 'Utilisateur' }}</h5>
        </div>
        <ul class="nav flex-column mt-4">
          <!-- Lien Tableau de bord -->
          <li class="nav-item mb-2">
            <router-link
              to="/dashboard/home"
              class="nav-link text-white"
              :class="{ active: currentMenu === 'Dashboard' }"
              @click="setActiveMenu('Dashboard')"
            >
              <i class="fa fa-home"></i> Tableau de bord
            </router-link>
          </li>
          <li class="nav-item mb-2" v-if="store.role === 'Admin'">
            <router-link
              to="/dashboard/user"
              class="nav-link text-white"
              :class="{ active: currentMenu === 'User' }"
              @click="setActiveMenu('User')"
            >
              <i class="fa fa-user"></i> Utilisateurs
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link
              to="/dashboard/expenses"
              class="nav-link text-white"
              :class="{ active: currentMenu === 'Expenses' }"
              @click="setActiveMenu('Expenses')"
            >
              <i class="fa fa-dollar-sign"></i> Dépenses
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link
              to="/dashboard/payments"
              class="nav-link text-white"
              :class="{ active: currentMenu === 'Payments' }"
              @click="setActiveMenu('Payments')"
            >
              <i class="fa fa-credit-card"></i> Paiements
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link
              to="/dashboard/planning"
              class="nav-link text-white"
              :class="{ active: currentMenu === 'Planning' }"
              @click="setActiveMenu('Planning')"
            >
              <i class="fa fa-calendar"></i> Planifications
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link
              to="/dashboard/payment-methods"
              class="nav-link text-white"
              :class="{ active: currentMenu === 'PaymentMethods' }"
              @click="setActiveMenu('PaymentMethods')"
            >
              <i class="fa fa-money-check"></i> Méthodes paiements
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link
              to="/dashboard/expense-category"
              class="nav-link text-white"
              :class="{ active: currentMenu === 'ExpenseCategory' }"
              @click="setActiveMenu('ExpenseCategory')"
            >
              <i class="fa fa-tags"></i> Catégories dépenses
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Contenu principal -->
      <div class="content p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const store = useAuthStore();
const router = useRouter();
const currentMenu = ref('Dashboard');
const isSidebarCollapsed = ref(false);

function setActiveMenu(menu) {
  currentMenu.value = menu;
}

const handleLogout = async () => {
  const result = await Swal.fire({
    title: 'Déconnexion',
    text: 'Êtes-vous sûr(e) de vouloir vous déconnecter ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, déconnecter',
    cancelButtonText: 'Annuler',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
  });

  if (result.isConfirmed) {
    store.logout();
    router.push('/');
    Swal.fire('Déconnecté(e)', 'Vous avez été déconnecté(e) avec succès.', 'success');
  }
};

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>

<style scoped>
.header {
  height: 60px;
  background-color: #1e3a8a; /* Bleu marine profond */
  color: #ffffff; /* Texte blanc */
}

.sidebar {
  width: 250px;
  background-color: #23272a; /* Gris anthracite */
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 80px;
}

.logo {
  max-width: 60px;
}

.user-info h5 {
  font-weight: bold;
  color: #ffffff; /* Texte blanc */
}

.nav-link {
  font-size: 1.1em;
  transition: background-color 0.3s ease, color 0.3s ease;
  color: #f0f0f0; /* Gris clair */
}

.nav-link:hover {
  background-color: #87ceeb; /* Bleu clair doux */
  color: #111827; /* Texte anthracite */
  border-radius: 5px;
}

.nav-link.active {
  background-color: #2196f3; /* Bleu cyan */
  border-radius: 5px;
}

.content {
  flex-grow: 1;
  background-color: #f8fafc; /* Gris clair */
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
  transition: background-color 0.3s ease;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.btn-outline-light {
  color: #ffffff;
  border-color: #ffffff;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.btn-outline-light:hover {
  background-color: #ffffff;
  color: #1e3a8a; /* Texte bleu marine */
}
</style>


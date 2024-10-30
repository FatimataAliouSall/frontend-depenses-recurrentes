import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Expenses from '../views/Expenses.vue';
import Payments from '../views/Payments.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/expenses', component: Expenses },
  { path: '/payments', component: Payments },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// // router/index.js
// import { createRouter, createWebHistory } from 'vue-router';
// import Login from '@components/Login.vue';
// import Dashboard from '@views/Dashboard.vue';
// import User from '@/components/users/ListUser.vue';
// import Expenses from '@/components/expenses/ListExpense.vue';
// import Payments from '@/components/payments/ListPayment.vue';
// import Planning from '@/components/plannings/ListPlanning.vue';
// import PaymentMethods from '@components/paymentMethods/ListPaymentMethod.vue';
// import ExpenseCategory from '@/components/expenseCategorys/ListExpenseCategory.vue';

// const routes = [
//   { path: '/', name: 'login', component: Login },
//   {
//     path: '/dashboard',
//     name: 'dashboard',
//     component: Dashboard,
//     children: [
//       { path: 'user', name: 'user', component: User },
//       { path: 'expenses', name: 'expenses', component: Expenses },
//       { path: 'payments', name: 'payments', component: Payments },
//       { path: 'planning', name: 'planning', component: Planning },
//       { path: 'payment-methods', name: 'paymentMethods', component: PaymentMethods },
//       { path: 'expense-category', name: 'expenseCategory', component: ExpenseCategory },
//     ],
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;


import { createRouter, createWebHistory } from 'vue-router';
import Login from '@components/Login.vue';
import Dashboard from '@views/Dashboard.vue';
import User from '@/components/users/ListUser.vue';
import AddUser from '@/components/users/AddUser.vue';
import EditUser from '@/components/users/EditUser.vue';
import ViewUser from '@/components/users/ViewUser.vue';
import Expenses from '@/components/expenses/ListExpense.vue';
import Payments from '@/components/payments/ListPayment.vue';
import Planning from '@/components/plannings/ListPlanning.vue';
import PaymentMethods from '@components/paymentMethods/ListPaymentMethod.vue';
import ExpenseCategory from '@/components/expenseCategorys/ListExpenseCategory.vue';

const routes = [
  { path: '/', name: 'login', component: Login },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      { path: 'user', name: 'user', component: User },
      { path: 'user/add', name: 'addUser', component: AddUser },
      { path: 'user/edit/:id', name: 'editUser', component: EditUser, props: true },
      { path: 'user/view/:id', name: 'viewUser', component: ViewUser, props: true },
      { path: 'expenses', name: 'expenses', component: Expenses },
      { path: 'payments', name: 'payments', component: Payments },
      { path: 'planning', name: 'planning', component: Planning },
      { path: 'payment-methods', name: 'paymentMethods', component: PaymentMethods },
      { path: 'expense-category', name: 'expenseCategory', component: ExpenseCategory },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

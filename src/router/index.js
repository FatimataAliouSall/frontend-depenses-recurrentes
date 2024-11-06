// import { createRouter, createWebHistory } from 'vue-router';
// import Login from '@components/Login.vue';
// import Dashboard from '@views/Dashboard.vue';
// import User from '@/components/users/ListUser.vue';
// import AddUser from '@/components/users/AddUser.vue';
// import EditUser from '@/components/users/EditUser.vue';
// import ViewUser from '@/components/users/ViewUser.vue';
// import Expenses from '@/components/expenses/ListExpense.vue';
// import AddExpense from '@/components/expenses/AddExpense.vue';
// import EditExpense from '@/components/expenses/EditExpense.vue';
// import ViewExpense from '@/components/expenses/ViewExpense.vue';
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
//       { path: 'user/add', name: 'addUser', component: AddUser },
//       { path: 'user/edit/:id', name: 'editUser', component: EditUser, props: true },
//       { path: 'user/view/:id', name: 'viewUser', component: ViewUser, props: true },
//       { path: 'expenses', name: 'expenses', component: Expenses },
//       { path: 'expenses/add', name: 'addExpense', component: AddExpense },
//       { path: 'expenses/edit/:id', name: 'editExpense', component: EditExpense, props: true },
//       { path: 'expenses/view/:id', name: 'viewExpense', component: ViewExpense, props: true },
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
import AddExpense from '@/components/expenses/AddExpense.vue';
import EditExpense from '@/components/expenses/EditExpense.vue';
import ViewExpense from '@/components/expenses/ViewExpense.vue';
import Payments from '@/components/payments/ListPayment.vue';
import Planning from '@/components/plannings/ListPlanning.vue';
import PaymentMethods from '@components/paymentMethods/ListPaymentMethod.vue';
import AddPaymentMethod from '@/components/paymentMethods/AddPaymentMethod.vue';
import EditPaymentMethod from '@/components/paymentMethods/EditPaymentMethod.vue';
import ViewPaymentMethod from '@/components/paymentMethods/ViewPaymentMethod.vue';
import ExpenseCategory from '@/components/expenseCategorys/ListExpenseCategory.vue';
import AddExpenseCategory from '@/components/expenseCategorys/AddExpenseCategory.vue'; 
import EditExpenseCategory from '@/components/expenseCategorys/EditExpenseCategory.vue'; 
import ViewExpenseCategory from '@/components/expenseCategorys/ViewExpenseCategory.vue'; 

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
      { path: 'expenses/add', name: 'addExpense', component: AddExpense },
      { path: 'expenses/edit/:id', name: 'editExpense', component: EditExpense, props: true },
      { path: 'expenses/view/:id', name: 'viewExpense', component: ViewExpense, props: true },
      { path: 'payments', name: 'payments', component: Payments },
      { path: 'planning', name: 'planning', component: Planning },
      { path: 'payment-methods', name: 'paymentMethods', component: PaymentMethods },
      { path: 'payment-methods/add', name: 'addPaymentMethod', component: AddPaymentMethod },
      { path: 'payment-methods/edit/:id', name: 'editPaymentMethod', component: EditPaymentMethod, props: true },
      { path: 'payment-methods/view/:id', name: 'viewPaymentMethod', component: ViewPaymentMethod, props: true },
      { path: 'expense-category', name: 'expenseCategory', component: ExpenseCategory },
      { path: 'expense-category/add', name: 'addExpenseCategory', component: AddExpenseCategory }, 
      { path: 'expense-category/edit/:id', name: 'editExpenseCategory', component: EditExpenseCategory, props: true }, 
      { path: 'expense-category/view/:id', name: 'viewExpenseCategory', component: ViewExpenseCategory, props: true }, 
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

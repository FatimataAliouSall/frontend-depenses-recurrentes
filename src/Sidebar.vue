<template>
    <div class="sidebar bg-dark text-white vh-100 p-3">
      <h3 class="text-center">Expense Manager</h3>
      <ul class="nav flex-column mt-4">
        <li v-for="item in menuItems" :key="item.name" class="nav-item mb-2">
          <a
            href="#"
            class="nav-link text-white"
            :class="{ active: current === item.name }"
            @click="navigate(item.name)"
          >
            <i :class="item.icon"></i> {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  
  const menuItems = [
    { name: 'Dashboard', label: 'Dashboard', icon: 'fa fa-home' },
    { name: 'User', label: 'User', icon: 'fa fa-user' },
    { name: 'Expenses', label: 'Expenses', icon: 'fa fa-dollar-sign' },
    { name: 'Payments', label: 'Payments', icon: 'fa fa-credit-card' },
    { name: 'PaymentMethods', label: 'Payment Methods', icon: 'fa fa-money-check' },
    { name: 'Planning', label: 'Planning', icon: 'fa fa-calendar' },
    { name: 'ExpenseCategory', label: 'Expense Category', icon: 'fa fa-tags' },
  ];
  
  const current = ref('Dashboard');
  const emit = defineEmits(['navigate']);
  
  function navigate(item) {
    current.value = item;
    emit('navigate', item);
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
  }
  .nav-link {
    font-size: 1.1em;
  }
  .nav-link.active {
    background-color: #007bff;
    border-radius: 5px;
  }
  </style>
  
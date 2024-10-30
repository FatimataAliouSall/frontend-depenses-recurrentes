<template>
  <div>
    <h1>Expense Categories</h1>
    <p>Review and manage your expense categories below:</p>
    
    <ul v-if="expenseCategories.length">
      <li v-for="category in expenseCategories" :key="category.id">
        {{ category.name }} - <strong>Status:</strong> {{ category.status ? 'True' : 'False' }}
      </li>
    </ul>
    <p v-else>No expense categories available.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const expenseCategories = ref([]); // state to hold fetched data

// Function to fetch expense categories
const fetchExpenseCategories = async () => {
  try {
    const response = await axios.get('/api/expense-categories'); // Adjust API endpoint if needed
    expenseCategories.value = response.data;
  } catch (error) {
    console.error('Error fetching expense categories:', error);
  }
};

// Fetch categories when the component mounts
onMounted(() => {
  fetchExpenseCategories();
});
</script>

<style scoped>
/* Style your component if needed */
</style>

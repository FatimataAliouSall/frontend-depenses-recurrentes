<template>
  <div class="d-flex">
    <Sidebar @navigate="currentView = $event" />
    <div class="flex-grow-1 p-4">
      <Content :view="currentView" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from './Sidebar.vue';
const currentView = ref('Dashboard');
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  margin: 0;
}
</style>

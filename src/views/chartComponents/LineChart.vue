<template>
  <LineChart :chartData="testData" :chartOptions="chartOptions" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default defineComponent({
  name: 'Home',
  components: { LineChart },
  setup() {
    // LineChart data structure
    const testData = {
      labels: ['Abonnement', 'Loisir', 'Transport'],
      datasets: [
        {
          label: 'Population',
          data: [30, 40, 60, 70, 5],
          borderColor: '#0079AF',
          backgroundColor: 'rgba(119, 206, 255, 0.5)',
          borderWidth: 2,
          tension: 0.4, // Smooth line
        },
      ],
    };

    // Optional: Chart options
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Cities',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Population',
          },
          beginAtZero: true,
        },
      },
    };

    return { testData, chartOptions };
  },
});
</script>

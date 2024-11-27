<template>
    <div class="chart-container">
        <LineChart :chartData="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, watch } from "vue";
  import { LineChart } from "vue-chart-3";
  
  // Propriété pour recevoir les données du parent
  const props = defineProps({
    planningData: {
      type: Array,
      required: true,
    },
    paymentData: {
      type: Array,
      required: true,
    },
  });
  
  // Données du graphique
  const chartData = ref({
    labels: ["01", "02", "03", "04", "05", "06", "07", "08" ,"09" ,"10" , "11", "12"],
      datasets: [
        {
          label: "Planification",
          data: props.planningData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "#4BC0C0",
        },
        {
          label: "Paiement",
          data: props.paymentData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "#FF6384",
        },
      ],
  });
  
  // Options du graphique
  const chartOptions = ref({
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Mois",
        },
      },
      y: {
        title: {
          display: true,
          text: "Montant (MRU)",
        },
        beginAtZero: true,
      },
    },
  });
  onMounted(() =>{ 
    console.log(props.planningData);
    
  } )
  
  // Mettre à jour les données du graphique lorsque `expensesData` change
  // watch(
  //   () => expensesData,
  //   (newData) => {
  //     if (newData && Array.isArray(newData)) {
  //       // Extraire les mois et les montants
  //       const labels = newData.map((item) => item.month || "");
  //       const realExpenses = newData.map((item) => item.real || 0);
  //       const plannedExpenses = newData.map((item) => item.planned || 0);
  
  //       // Mettre à jour les données du graphique
  //       chartData.value.labels = labels;
  //       chartData.value.datasets[0].data = realExpenses;
  //       chartData.value.datasets[1].data = plannedExpenses;
  //     }
  //   },
  //   { immediate: true }
  // );
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 400px;
  }
  </style>
  
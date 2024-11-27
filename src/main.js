import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import 'vue-toastification/dist/index.css';
import router from './router';

// Importer le store d'authentification
import { useAuthStore } from './stores/authStore.js';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Vérifier l'état d'authentification avant le montage de l'application
const authStore = useAuthStore();
authStore.checkAuth();

app.mount('#app');

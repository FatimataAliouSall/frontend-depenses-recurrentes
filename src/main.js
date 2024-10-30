import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createApp } from 'vue';
import App from '../src/App.vue';
import router from '../src/router/router.js';

const app = createApp(App);
app.use(router);
app.mount('#app');

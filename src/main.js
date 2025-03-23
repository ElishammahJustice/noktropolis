import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

// Create the app
const app = createApp(App);
const pinia = createPinia();

// Initialize Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

// Use plugins
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
// Mount the app
app.mount('#app')

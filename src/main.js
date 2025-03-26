import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from './router';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VBtn, VCard, VContainer, VRow, VCol, VTextField, VForm, VToolbar, VToolbarTitle, VAlert } from 'vuetify/components';
import { Ripple } from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

// Initialize Vuetify with only used components and directives
const vuetify = createVuetify({
  components: { VBtn, VCard, VContainer, VRow, VCol, VTextField, VForm, VToolbar, VToolbarTitle, VAlert },
  directives: { Ripple }
});

// Create Vue app
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');

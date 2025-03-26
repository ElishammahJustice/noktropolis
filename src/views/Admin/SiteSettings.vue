<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>Site Settings</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateSiteSettings">
          <v-text-field v-model="siteName" label="Site Name" outlined required></v-text-field>
          <v-text-field v-model="siteEmail" label="Support Email" outlined required></v-text-field>
          <v-text-field v-model="sitePhone" label="Support Phone" outlined required></v-text-field>
          <v-text-field v-model="siteAddress" label="Business Address" outlined required></v-text-field>
          <v-file-input label="Upload Logo" v-model="siteLogo" outlined></v-file-input>

          <v-switch v-model="maintenanceMode" label="Enable Maintenance Mode"></v-switch>

          <v-btn type="submit" color="brown-darken-2" :loading="loading">Save Changes</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const siteName = ref('');
const siteEmail = ref('');
const sitePhone = ref('');
const siteAddress = ref('');
const siteLogo = ref(null);
const maintenanceMode = ref(false);
const loading = ref(false);

const fetchSiteSettings = async () => {
  try {
    const response = await axios.get('/api/admin/site-settings');
    siteName.value = response.data.site_name;
    siteEmail.value = response.data.site_email;
    sitePhone.value = response.data.site_phone;
    siteAddress.value = response.data.site_address;
    maintenanceMode.value = response.data.maintenance_mode;
  } catch (error) {
    console.error('Error fetching site settings:', error);
  }
};

const updateSiteSettings = async () => {
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append('site_name', siteName.value);
    formData.append('site_email', siteEmail.value);
    formData.append('site_phone', sitePhone.value);
    formData.append('site_address', siteAddress.value);
    formData.append('maintenance_mode', maintenanceMode.value);
    if (siteLogo.value) {
      formData.append('site_logo', siteLogo.value);
    }
    await axios.post('/api/admin/site-settings', formData);
    alert('Site settings updated successfully!');
  } catch (error) {
    console.error('Error updating site settings:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchSiteSettings);
</script>

<style scoped>
.v-card {
  max-width: 600px;
  margin: auto;
  border-radius: 12px;
}
</style>

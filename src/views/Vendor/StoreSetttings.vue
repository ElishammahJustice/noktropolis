
<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>Store Settings</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateStoreSettings">
          <v-text-field v-model="storeName" label="Store Name" outlined required></v-text-field>
          <v-textarea v-model="storeDescription" label="Store Description" outlined required></v-textarea>
          <v-text-field v-model="storeEmail" label="Store Email" outlined required></v-text-field>
          <v-text-field v-model="storePhone" label="Store Phone" outlined required></v-text-field>
          <v-text-field v-model="storeAddress" label="Store Address" outlined required></v-text-field>

          <v-btn type="submit" color="brown-darken-2" :loading="loading">Save Changes</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const storeName = ref('');
const storeDescription = ref('');
const storeEmail = ref('');
const storePhone = ref('');
const storeAddress = ref('');
const loading = ref(false);

const fetchStoreSettings = async () => {
  try {
    const response = await axios.get('/api/vendor/store-settings');
    storeName.value = response.data.store_name;
    storeDescription.value = response.data.store_description;
    storeEmail.value = response.data.store_email;
    storePhone.value = response.data.store_phone;
    storeAddress.value = response.data.store_address;
  } catch (error) {
    console.error('Error fetching store settings:', error);
  }
};

const updateStoreSettings = async () => {
  loading.value = true;
  try {
    await axios.post('/api/vendor/store-settings', {
      store_name: storeName.value,
      store_description: storeDescription.value,
      store_email: storeEmail.value,
      store_phone: storePhone.value,
      store_address: storeAddress.value,
    });
    alert('Store settings updated successfully!');
  } catch (error) {
    console.error('Error updating store settings:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchStoreSettings);
</script>

<style scoped>
.v-card {
  max-width: 600px;
  margin: auto;
  border-radius: 12px;
}
</style>

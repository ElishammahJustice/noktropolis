<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>Account Settings</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateAccountSettings">
          <v-text-field v-model="userName" label="Full Name" outlined required></v-text-field>
          <v-text-field v-model="userEmail" label="Email" outlined required disabled></v-text-field>
          <v-text-field v-model="currentPassword" label="Current Password" type="password" outlined></v-text-field>
          <v-text-field v-model="newPassword" label="New Password" type="password" outlined></v-text-field>
          <v-text-field v-model="confirmPassword" label="Confirm New Password" type="password" outlined></v-text-field>

          <v-btn type="submit" color="brown-darken-2" :loading="loading">Save Changes</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const userName = ref('');
const userEmail = ref('');
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(false);

const fetchAccountSettings = async () => {
  try {
    const response = await axios.get('/api/user/account-settings');
    userName.value = response.data.name;
    userEmail.value = response.data.email;
  } catch (error) {
    console.error('Error fetching account settings:', error);
  }
};

const updateAccountSettings = async () => {
  if (newPassword.value && newPassword.value !== confirmPassword.value) {
    alert('Passwords do not match!');
    return;
  }

  loading.value = true;
  try {
    await axios.post('/api/user/account-settings', {
      name: userName.value,
      current_password: currentPassword.value,
      new_password: newPassword.value,
    });
    alert('Account settings updated successfully!');
  } catch (error) {
    console.error('Error updating account settings:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchAccountSettings);
</script>

<style scoped>
.v-card {
  max-width: 600px;
  margin: auto;
  border-radius: 12px;
}
</style>

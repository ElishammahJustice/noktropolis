<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>Vendor Management</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="vendors" class="elevation-1">
          <template v-slot:item.actions="{ item }">
            <v-btn color="primary" @click="approveVendor(item.id)" v-if="!item.approved">
              Approve
            </v-btn>
            <v-btn color="error" @click="deleteVendor(item.id)">
              Remove
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const vendors = ref([]);
const headers = [
  { text: 'Vendor Name', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Store Name', value: 'store_name' },
  { text: 'Status', value: 'approved', sortable: false },
  { text: 'Actions', value: 'actions', sortable: false }
];

const fetchVendors = async () => {
  try {
    const response = await axios.get('/api/admin/vendors');
    vendors.value = response.data;
  } catch (error) {
    console.error('Error fetching vendors:', error);
  }
};

const approveVendor = async (vendorId) => {
  try {
    await axios.post(`/api/admin/vendors/${vendorId}/approve`);
    vendors.value = vendors.value.map(v => v.id === vendorId ? { ...v, approved: true } : v);
  } catch (error) {
    console.error('Error approving vendor:', error);
  }
};

const deleteVendor = async (vendorId) => {
  try {
    await axios.delete(`/api/admin/vendors/${vendorId}`);
    vendors.value = vendors.value.filter(v => v.id !== vendorId);
  } catch (error) {
    console.error('Error deleting vendor:', error);
  }
};

onMounted(fetchVendors);
</script>

<style scoped>
.v-card {
  max-width: 900px;
  margin: auto;
  border-radius: 12px;
}
</style>

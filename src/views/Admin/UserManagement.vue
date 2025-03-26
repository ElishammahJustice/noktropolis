
<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>User Management</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="users" class="elevation-1">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="primary" small @click="editUser(item)">Edit</v-btn>
            <v-btn color="red" small @click="toggleUserStatus(item)">
              {{ item.active ? 'Deactivate' : 'Activate' }}
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

const users = ref([]);
const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Role', value: 'role' },
  { text: 'Status', value: 'active' },
  { text: 'Actions', value: 'actions', sortable: false }
];

const fetchUsers = async () => {
  try {
    const response = await axios.get('/api/admin/users');
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const toggleUserStatus = async (user) => {
  try {
    await axios.post(`/api/admin/users/${user.id}/toggle-status`);
    user.active = !user.active;
  } catch (error) {
    console.error('Error toggling user status:', error);
  }
};

const editUser = (user) => {
  alert(`Editing user: ${user.name}`);
};

onMounted(fetchUsers);
</script>

<style scoped>
.v-card {
  max-width: 800px;
  margin: auto;
  border-radius: 12px;
}
</style>

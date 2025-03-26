<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>Earnings & Transactions</v-card-title>
      <v-card-text>
        <!-- Earnings Overview -->
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-3 text-center" color="brown lighten-4">
              <v-card-title>Total Earnings</v-card-title>
              <v-card-subtitle class="text-h5">${{ totalEarnings }}</v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-3 text-center" color="brown lighten-4">
              <v-card-title>Pending Payouts</v-card-title>
              <v-card-subtitle class="text-h5">${{ pendingPayouts }}</v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-3 text-center" color="brown lighten-4">
              <v-card-title>Completed Payouts</v-card-title>
              <v-card-subtitle class="text-h5">${{ completedPayouts }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>

        <!-- Error Alert -->
        <v-alert v-if="errorMessage" type="error" class="mt-4">
          {{ errorMessage }}
        </v-alert>

        <!-- Transactions Table -->
        <v-data-table :headers="headers" :items="transactions" class="mt-5" dense>
  <template #item.amount="{ item }">
    ${{ item.amount.toFixed(2) }}
  </template>
  <template #item.status="{ item }">
    <v-chip :color="item.status === 'Completed' ? 'green' : 'red'">
      {{ item.status }}
    </v-chip>
  </template>
</v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const totalEarnings = ref(0);
const pendingPayouts = ref(0);
const completedPayouts = ref(0);
const transactions = ref([]);
const errorMessage = ref('');

const headers = [
  { text: 'Transaction ID', value: 'id' },
  { text: 'Vendor', value: 'vendor_name' },
  { text: 'Amount', value: 'amount' },
  { text: 'Date', value: 'date' },
  { text: 'Status', value: 'status' }
];

const fetchEarningsData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/earnings-transactions`);
    totalEarnings.value = response.data.total_earnings;
    pendingPayouts.value = response.data.pending_payouts;
    completedPayouts.value = response.data.completed_payouts;
    transactions.value = response.data.transactions;
  } catch (error) {
    errorMessage.value = 'Error fetching earnings data. Please try again later.';
    console.error('API Error:', error);
  }
};

onMounted(fetchEarningsData);
</script>

<style scoped>
.v-card {
  border-radius: 12px;
}
</style>

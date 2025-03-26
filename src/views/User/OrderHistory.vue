<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>Order History</v-card-title>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ formatDate(order.date) }}</td>
              <td>{{ order.status }}</td>
              <td>{{ formatCurrency(order.total) }}</td>
              <td>
                <v-btn color="brown-darken-2" @click="viewOrder(order.id)">View</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const orders = ref([]);

const fetchOrders = async () => {
  try {
    const response = await axios.get('/api/user/orders');
    orders.value = response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const viewOrder = (orderId) => {
  console.log('Viewing order:', orderId);
  // Implement navigation to order details page
};

onMounted(fetchOrders);
</script>

<style scoped>
.v-card {
  max-width: 800px;
  margin: auto;
  border-radius: 12px;
}
</style>

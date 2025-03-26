
<template>
  <div class="vendor-page">
    <h1 class="page-title">Manage Orders</h1>
    <v-table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customer }}</td>
          <td>{{ order.status }}</td>
          <td>${{ order.amount }}</td>
          <td>
            <v-btn color="primary" @click="viewOrder(order.id)">View</v-btn>
            <v-btn color="success" v-if="order.status !== 'Shipped'" @click="markShipped(order.id)">Mark as Shipped</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const orders = ref([
  { id: 101, customer: 'John Doe', status: 'Pending', amount: 45.99 },
  { id: 102, customer: 'Jane Smith', status: 'Shipped', amount: 89.99 },
]);

const viewOrder = (id) => alert(`Viewing order ${id}`);
const markShipped = (id) => alert(`Order ${id} marked as shipped`);
</script>

<style scoped>
.vendor-page { padding: 20px; }
.page-title { font-size: 24px; margin-bottom: 20px; }
</style>

<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>Order Management</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="orders" class="elevation-1">
          <!-- ✅ Corrected slot usage -->
          <template v-slot:[`item.status`]="{ item }">
            <v-chip :color="getStatusColor(item.status)">
              {{ item.status }}
            </v-chip>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="primary" @click="updateOrderStatus(item.id, 'Shipped')">Ship</v-btn>
            <v-btn color="success" @click="updateOrderStatus(item.id, 'Delivered')">Deliver</v-btn>
            <v-btn color="red" @click="updateOrderStatus(item.id, 'Cancelled')">Cancel</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const orders = ref([]);

const headers = [
  { title: 'Order ID', key: 'id' },          // ✅ Use "key" instead of "value"
  { title: 'Customer', key: 'customer' },
  { title: 'Total Amount', key: 'total' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'orange';
    case 'Shipped': return 'blue';
    case 'Delivered': return 'green';
    case 'Cancelled': return 'red';
    default: return 'grey';
  }
};

const fetchOrders = async () => {
  try {
    const response = await axios.get('/api/admin/orders');
    orders.value = response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

const updateOrderStatus = async (orderId, status) => {
  try {
    await axios.put(`/api/admin/orders/${orderId}`, { status });
    fetchOrders();
  } catch (error) {
    console.error('Error updating order status:', error);
  }
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

<template>
  <v-container>
    <v-card>
      <v-card-title>Manage Products</v-card-title>
      <v-card-text>
        <v-btn color="primary" @click="$router.push('/vendor/products/add')">Add Product</v-btn>
        <v-data-table :headers="headers" :items="products" class="mt-4"></v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);
const headers = ref([
  { text: 'Name', value: 'name' },
  { text: 'Price', value: 'price' },
  { text: 'Stock', value: 'stock' },
  { text: 'Actions', value: 'actions', sortable: false }
]);

onMounted(async () => {
  const response = await axios.get('/api/vendor/products');
  products.value = response.data;
});
</script>

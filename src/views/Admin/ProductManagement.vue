<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>Product Management</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="products"
          item-value="id"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn icon color="blue" @click="editProduct(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red" @click="deleteProduct(item.id)">
              <v-icon>mdi-delete</v-icon>
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

const products = ref([]);
const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Product Name', key: 'name' },
  { title: 'Vendor', key: 'vendor' },
  { title: 'Price', key: 'price' },
  { title: 'Stock', key: 'stock' },
  { title: 'Actions', key: 'actions', sortable: false }
]);

const fetchProducts = async () => {
  try {
    const response = await axios.get('/api/admin/products');
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const deleteProduct = async (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await axios.delete(`/api/admin/products/${id}`);
      products.value = products.value.filter(product => product.id !== id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
};

const editProduct = (product) => {
  alert(`Edit functionality for ${product.name} will be implemented.`);
};

onMounted(fetchProducts);
</script>

<style scoped>
.v-card {
  max-width: 900px;
  margin: auto;
  border-radius: 12px;
}
</style>


<template>
  <v-container>
    <v-card>
      <v-card-title>Add New Product</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitProduct">
          <v-text-field label="Product Name" v-model="product.name" required></v-text-field>
          <v-text-field label="Price" type="number" v-model="product.price" required></v-text-field>
          <v-text-field label="Stock" type="number" v-model="product.stock" required></v-text-field>
          <v-btn type="submit" color="success">Save Product</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const product = ref({ name: '', price: '', stock: '' });

async function submitProduct() {
  await axios.post('/api/vendor/products', product.value);
  alert('Product added!');
}
</script>

<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>My Wishlist</v-card-title>
      <v-card-text>
        <v-alert v-if="wishlist.length === 0" type="info">Your wishlist is empty.</v-alert>

        <v-row v-else>
          <v-col v-for="item in wishlist" :key="item.id" cols="12" sm="6" md="4">
            <v-card>
              <v-img :src="item.image" height="200px" contain></v-img>
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-subtitle>{{ formatCurrency(item.price) }}</v-card-subtitle>
              <v-card-actions>
                <v-btn color="primary" @click="moveToCart(item)">Add to Cart</v-btn>
                <v-btn color="red" @click="removeFromWishlist(item.id)">Remove</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const wishlist = ref([]);

const fetchWishlist = async () => {
  try {
    const response = await axios.get('/api/user/wishlist');
    wishlist.value = response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
  }
};

const removeFromWishlist = async (id) => {
  try {
    await axios.delete(`/api/user/wishlist/${id}`);
    wishlist.value = wishlist.value.filter(item => item.id !== id);
  } catch (error) {
    console.error('Error removing item:', error);
  }
};

const moveToCart = async (item) => {
  try {
    await axios.post('/api/user/cart', { product_id: item.id });
    removeFromWishlist(item.id);
    alert('Item moved to cart!');
  } catch (error) {
    console.error('Error moving item to cart:', error);
  }
};

// ✅ Function to format price as currency
const formatCurrency = (price) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
};

onMounted(fetchWishlist);
</script>

<style scoped>
.v-card {
  border-radius: 12px;
}
</style>

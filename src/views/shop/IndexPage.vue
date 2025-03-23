<template>
  <v-container>
    <!-- Hero Section -->
    <v-row class="hero-section">
      <v-col cols="12">
        <v-img
          src="/images/shop-hero.jpg"
          height="400"
          class="hero-img"
        >
          <div class="hero-overlay">
            <h1 class="hero-title">Explore the Richness of African Culture</h1>
            <p class="hero-subtitle">Shop Authentic, Handcrafted Products from Across Africa</p>
            <v-btn
              color="accent"
              class="mt-4 hero-cta"
              :to="'/shop'"
              large
            >
              Start Shopping
            </v-btn>
          </div>
        </v-img>
      </v-col>
    </v-row>

    <!-- Products Section -->
    <v-row class="mt-8">
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        class="product-card-container"
      >
        <v-card
          class="product-card"
          elevation="12"
          @mouseover="isHovered = true"
          @mouseleave="isHovered = false"
        >
          <v-img :src="product.image" height="300" cover />

          <div class="product-info">
            <v-card-title class="product-title">{{ product.name }}</v-card-title>
            <v-card-subtitle class="product-description">{{ product.description }}</v-card-subtitle>
            <v-card-text class="product-price">₦{{ product.price }}</v-card-text>
            <v-btn
              color="accent"
              @click="addToCart(product)"
              class="add-to-cart-btn"
              block
            >
              Add to Cart
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pagination Section (optional for large catalogs) -->
    <v-row justify="center" class="mt-6">
      <v-pagination
        v-model:current-page="currentPage"
        :length="pagesCount"
      />
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

// Sample product data
const products = ref([
  {
    id: 1,
    name: 'Handwoven Kente Cloth',
    price: 149.99,
    image: '/images/kente.jpg',
    description: 'Authentic handwoven Kente cloth with traditional patterns',
  },
  {
    id: 2,
    name: 'African Beaded Necklace',
    price: 49.99,
    image: '/images/necklace.jpg',
    description: 'Handcrafted beaded necklace from Kenya',
  },
]);

// Function to add product to cart using Pinia store
const addToCart = (product) => {
  cartStore.addToCart(product);
};

// Pagination setup
const currentPage = ref(1);
const pagesCount = ref(5);
</script>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  height: 400px;
  overflow: hidden;
  margin-top: 80px;
}

.hero-img {
  position: relative;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  padding: 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px #333;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-top: 1rem;
}

.hero-cta {
  margin-top: 20px;
  background-color: #e9c46a;
  color: #2d2d2d;
  font-weight: bold;
  text-transform: uppercase;
}

/* Product Cards */
.product-card-container {
  display: flex;
  justify-content: center;
}

.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.product-info {
  padding: 16px;
}

.product-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.product-description {
  font-size: 1rem;
  color: #777;
  margin-top: 8px;
}

.product-price {
  font-size: 1.25rem;
  color: #e9c46a;
  margin-top: 8px;
}

.add-to-cart-btn {
  margin-top: 16px;
  background-color: #e9c46a;
  color: #2d2d2d;
}

.add-to-cart-btn:hover {
  background-color: #f4a261;
  color: #fff;
}

/* Pagination */
.v-pagination__item--active {
  background-color: #e9c46a;
  color: #fff;
}
</style>

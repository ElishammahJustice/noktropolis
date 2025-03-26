<template>
  <v-card elevation="4" class="product-card">
    <v-img
      :src="product.image"
      height="250"
      cover
      class="product-image"
    >
      <v-btn
        icon
        variant="tonal"
        color="accent"
        class="favorite-btn"
        @click.stop="toggleFavorite"
      >
        <v-icon>{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>
    </v-img>

    <v-card-title class="text-h6">{{ product.name }}</v-card-title>

    <v-card-subtitle class="text-caption">
      By {{ product.artisan }} • {{ product.location }}
    </v-card-subtitle>

    <v-card-text>
      <v-rating
        :model-value="product.rating"
        color="accent"
        density="compact"
        readonly
        half-increments
      ></v-rating>

      <div class="text-h5 mt-2">${{ product.price }}</div>

      <v-btn
        color="accent"
        block
        class="mt-4"
        @click="$emit('add-to-cart', product)"
      >
        Add to Cart
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>


import { ref } from 'vue';

defineProps({
  product: {
    type: Object,
    required: true
  }
});

const isFavorite = ref(false);

function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
}
</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-5px);
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}

.product-image {
  border-bottom: 2px solid #e9c46a;
}
</style>

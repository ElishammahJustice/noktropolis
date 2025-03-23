<template>
  <v-container>
    <!-- Hero Section -->
    <v-row class="hero-section">
      <v-col cols="12">
        <v-img src="/images/shop-hero.jpg" height="400" class="hero-img">
          <div class="hero-overlay">
            <h1 class="hero-title">{{ categoryTitle }}</h1>
            <p class="hero-subtitle">Explore various styles within {{ categoryTitle }}</p>
          </div>
        </v-img>
      </v-col>
    </v-row>

    <!-- Subcategories Section -->
    <v-row class="mt-8">
      <v-col
        v-for="sub in subcategories"
        :key="sub.slug"
        cols="12"
        sm="6"
        md="4"
        class="product-card-container"
      >
        <v-card
          class="product-card"
          elevation="12"
          @click="$router.push(`/shop/${$route.params.category}/${sub.slug}`)"
        >
          <v-img :src="sub.image" height="300" cover />
          <div class="product-info">
            <v-card-title class="product-title">{{ sub.name }}</v-card-title>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

// Get category from URL
const route = useRoute();
const categoryTitle = computed(() => route.params.category.replace("-", " ").toUpperCase());

// Sample subcategory data (You can replace this with an API call)
const subcategoriesData = {
  clothing: [
    { name: "Ankara Styles", slug: "ankara", image: "/images/ankara.jpg" },
    { name: "Dashikis", slug: "dashikis", image: "/images/dashiki.jpg" },
    { name: "Modern Fusion", slug: "fusion", image: "/images/fusion.jpg" }
  ],
  accessories: [
    { name: "Beaded Jewelry", slug: "beaded-jewelry", image: "/images/beaded.jpg" },
    { name: "Head Wraps", slug: "head-wraps", image: "/images/headwrap.jpg" }
  ]
};

// Get subcategories dynamically based on the category
const subcategories = computed(() => subcategoriesData[route.params.category] || []);
</script>

<style scoped>
/* Same styles as in Shop Index.vue */
</style>

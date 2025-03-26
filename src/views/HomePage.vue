<template>
  <div class="home-page">
    <!-- Hero Section -->
    <v-carousel
      cycle
      height="600"
      hide-delimiters
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(slide, i) in heroSlides"
        :key="i"
        :src="slide.image"
        cover
      >
        <div class="hero-content">
          <h1 class="hero-title">{{ slide.title }}</h1>
          <p class="hero-subtitle">{{ slide.subtitle }}</p>
          <v-btn
            color="accent"
            size="x-large"
            class="mt-4"
            :to="slide.ctaRoute"
          >
            {{ slide.ctaText }}
          </v-btn>
        </div>
      </v-carousel-item>
    </v-carousel>

    <!-- Featured Categories -->
    <section class="py-16 px-4">
      <h2 class="section-title text-center mb-8">Explore Our Heritage</h2>
      <v-row class="justify-center">
        <v-col
          v-for="(category, index) in featuredCategories"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="category-card"
            elevation="4"
            :to="category.route"
          >
            <v-img
              :src="category.image"
              height="300"
              cover
              lazy
              alt="Category Image: {{ category.name }}"
            />
            <v-card-title class="category-title">
              {{ category.name }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- Artisan Stories -->
    <section class="artisan-section py-16">
      <v-container>
        <h2 class="section-title text-center mb-8">Meet the Artisans</h2>
        <v-slide-group show-arrows>
          <v-slide-group-item
            v-for="(artisan, i) in featuredArtisans"
            :key="i"
          >
            <v-card
              class="ma-4 artisan-card"
              width="300"
              @click="toggleSelection(i)"
              :class="{ 'selected': selectedIndex === i }"
            >
              <v-img
                :src="artisan.image"
                height="200"
                cover
                alt="Artisan Image: {{ artisan.name }}"
              />
              <v-card-title class="text-h6">
                {{ artisan.name }}
              </v-card-title>
              <v-card-subtitle class="text-caption">
                {{ artisan.location }}
              </v-card-subtitle>
              <v-card-text>
                <p class="text-truncate-2">{{ artisan.story }}</p>
                <v-btn
                  color="accent"
                  variant="text"
                  :to="`/artisans/${artisan.id}`"
                >
                  Read Full Story
                </v-btn>
              </v-card-text>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-container>
    </section>

    <!-- Trending Products -->
    <section class="py-16 px-4">
  <h2 class="section-title text-center mb-8">Trending Now</h2>
  <v-row class="justify-center">
    <v-col
      v-for="(product, index) in trendingProducts"
      :key="index"
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <ProductCard :product="product" />
    </v-col>
  </v-row>
</section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductCard from '../components/ProductCard.vue';
const heroSlides = ref([
  {
    image: '/images/hero-1.jpg',
    title: 'Celebrate African Heritage',
    subtitle: 'Discover Handcrafted Treasures from Across the Continent',
    ctaText: 'Shop Now',
    ctaRoute: '/shop'
  }
]);

const featuredCategories = ref([
  {
    name: 'Traditional Fabrics',
    image: '/images/fabrics.jpg',
    route: '/shop/clothing'
  }
]);

const featuredArtisans = ref([
  {
    id: 1,
    name: 'Amina Diallo',
    location: 'Bamako, Mali',
    story: 'Third-generation textile artist preserving Bogolan techniques...',
    image: '/images/artisan-1.jpg'
  }
]);

const trendingProducts = ref([
  {
    id: 101,
    name: 'Handwoven Kente Scarf',
    price: 25.99,
    image: '/images/product-kente.jpg'
  }
]);

const selectedIndex = ref(null);

const toggleSelection = (index) => {
  selectedIndex.value = selectedIndex.value === index ? null : index;
};
</script>

<style scoped>
.selected {
  border: 2px solid #e9c46a;
  box-shadow: 0px 4px 10px rgba(233, 196, 106, 0.6);
  transform: scale(1.05);
}
</style>

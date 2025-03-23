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
            v-slot="{ toggle }"
          >
            <v-card
              class="ma-4 artisan-card"
              width="300"
              @click="toggle"
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
          <product-card :product="product" />
        </v-col>
      </v-row>
    </section>

    <!-- Cultural Blog Highlights -->
    <section class="blog-section py-16">
      <v-container>
        <h2 class="section-title text-center mb-8">From Our Blog</h2>
        <v-row>
          <v-col
            v-for="(post, index) in blogPosts"
            :key="index"
            cols="12"
            md="4"
          >
            <v-card elevation="4">
              <v-img
                :src="post.image"
                height="200"
                cover
                alt="Blog Post Image: {{ post.title }}"
              />
              <v-card-title>{{ post.title }}</v-card-title>
              <v-card-text>
                <p class="text-truncate-2">{{ post.excerpt }}</p>
                <v-btn
                  color="accent"
                  variant="text"
                  :to="`/blog/${post.slug}`"
                >
                  Read More
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section py-16">
      <v-container class="text-center">
        <h2 class="section-title mb-4">Join Our Community</h2>
        <p class="section-subtitle mb-8">
          Get updates on new arrivals, stories, and exclusive offers
        </p>
        <v-form @submit.prevent="subscribeNewsletter">
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="email"
                label="Enter your email"
                variant="outlined"
                color="accent"
                type="email"
                required
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                color="accent"
                size="x-large"
                type="submit"
                block
              >
                Subscribe
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Temporary data - replace with API calls
const heroSlides = ref([
  {
    image: '/images/hero-1.jpg',
    title: 'Celebrate African Heritage',
    subtitle: 'Discover Handcrafted Treasures from Across the Continent',
    ctaText: 'Shop Now',
    ctaRoute: '/shop'
  },
  // Add more slides
]);

const featuredCategories = ref([
  {
    name: 'Traditional Fabrics',
    image: '/images/fabrics.jpg',
    route: '/shop/clothing'
  },
  // Add more categories
]);

const featuredArtisans = ref([
  {
    id: 1,
    name: 'Amina Diallo',
    location: 'Bamako, Mali',
    story: 'Third-generation textile artist preserving Bogolan techniques...',
    image: '/images/artisan-1.jpg'
  },
  // Add more artisans
]);

const trendingProducts = ref([
  // Populate with product data
]);

const blogPosts = ref([
  {
    title: 'The History of Kente Cloth',
    excerpt: 'Explore the rich symbolism behind this iconic fabric...',
    image: '/images/blog-kente.jpg',
    slug: 'history-of-kente'
  },
  // Add more posts
]);

const email = ref('');

const subscribeNewsletter = () => {
  // Add newsletter logic
};
</script>

<style scoped>
.home-page {
  background-color: #ffffff;
  color: #333333;
}

.hero-content {
  position: absolute;
  bottom: 20%;
  left: 10%;
  max-width: 600px;
  text-shadow: 2px 2px 6px rgba(255, 255, 255, 0.5); /* Softer text-shadow */
  padding: 1rem;
  border-radius: 8px;
}

.hero-title {
  font-family: 'Ubuntu', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: #2d2d2d;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-top: 1rem;
  color: #444444;
}

.section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  color: #e9c46a;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.category-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  background: #f8f8f8;
  border-radius: 10px;
}

.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
}

.category-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.3));
  color: white;
  padding: 1rem;
}

.artisan-section {
  background-color: #fafafa;
  border-top: 2px solid #e9c46a;
  border-bottom: 2px solid #e9c46a;
}

.artisan-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.artisan-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
}

.artisan-card .v-img {
  background: rgba(0, 0, 0, 0.4); /* Darken image */
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.newsletter-section {
  background-color: #f5f5f5;
}

.v-btn {
  transition: all 0.3s ease;
}

.v-btn:hover {
  background-color: #e9c46a;
  color: #fff;
  transform: scale(1.05);
}

.v-btn--variant-outlined {
  border-color: #e9c46a !important;
  color: #e9c46a !important;
}

.v-btn--variant-outlined:hover {
  background-color: #e9c46a;
  color: #fff;
}

@media (max-width: 600px) {
  .section-title {
    font-size: 2rem;
  }
}
</style>


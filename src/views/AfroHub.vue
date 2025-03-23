<template>
  <div class="afro-hub-page">
    <!-- Hero Section -->
    <v-parallax src="/images/afro-hub-hero.jpg" height="500" class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Afro Hub</h1>
        <p class="hero-subtitle">
          Celebrating African Culture, Art, and Heritage
        </p>
      </div>
    </v-parallax>

    <!-- Artisan Stories -->
    <section class="py-16 px-4">
      <h2 class="section-title text-center mb-8">Meet the Artisans</h2>
      <v-slide-group show-arrows>
        <v-slide-group-item
          v-for="artisan in artisans"
          :key="artisan.id"
          v-slot="{ toggle }"
        >
          <v-card class="ma-4 artisan-card" width="300" @click="toggle">
            <v-img :src="artisan.image" height="200" cover />
            <v-card-title class="text-h6">{{ artisan.name }}</v-card-title>
            <v-card-subtitle class="text-caption">{{ artisan.location }}</v-card-subtitle>
            <v-card-text>
              <p class="text-truncate-2">{{ artisan.story }}</p>
              <v-btn color="accent" variant="text" :to="`/artisans/${artisan.id}`">
                Read Full Story
              </v-btn>
            </v-card-text>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </section>

    <!-- Cultural Heritage -->
    <section class="cultural-heritage py-16">
      <v-container>
        <h2 class="section-title text-center mb-8">Cultural Heritage</h2>
        <v-row>
          <v-col
            v-for="article in culturalArticles"
            :key="article.slug"
            cols="12"
            md="4"
          >
            <v-card elevation="4">
              <v-img :src="article.image" height="200" cover />
              <v-card-title>{{ article.title }}</v-card-title>
              <v-card-text>
                <p class="text-truncate-2">{{ article.excerpt }}</p>
                <v-btn color="accent" variant="text" :to="`/cultural-heritage/${article.slug}`">
                  Read More
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Events -->
    <section class="events py-16">
      <v-container>
        <h2 class="section-title text-center mb-8">Upcoming Events</h2>
        <v-timeline align="start">
          <v-timeline-item
            v-for="event in events"
            :key="event.slug"
            :dot-color="event.color"
            size="small"
          >
            <template v-slot:opposite>
              <span class="event-date">{{ event.date }}</span>
            </template>
            <v-card>
              <v-card-title>{{ event.title }}</v-card-title>
              <v-card-text>
                <p>{{ event.description }}</p>
                <v-btn color="accent" variant="text" :to="`/events/${event.slug}`">
                  Learn More
                </v-btn>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </section>

    <!-- Gallery -->
    <section class="gallery py-16">
      <v-container>
        <h2 class="section-title text-center mb-8">Gallery</h2>
        <v-row>
          <v-col
            v-for="(image, index) in galleryImages"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-img :src="image" height="300" cover class="gallery-image" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Floating Back to Top Button -->
    <v-btn
      v-show="showBackToTop"
      fab
      dark
      color="accent"
      class="back-to-top"
      @click="scrollToTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Artisan Stories
const artisans = ref([
  {
    id: 1,
    name: 'Amina Diallo',
    location: 'Bamako, Mali',
    story: 'Third-generation textile artist preserving Bogolan techniques...',
    image: '/images/artisan-1.jpg',
  },
  {
    id: 2,
    name: 'Kwame Osei',
    location: 'Accra, Ghana',
    story: 'Master kente weaver with over 20 years of experience...',
    image: '/images/artisan-2.jpg',
  },
  // Add more artisans...
]);

// Cultural Heritage Articles
const culturalArticles = ref([
  {
    title: 'The History of Kente Cloth',
    excerpt: 'Explore the rich symbolism behind this iconic fabric...',
    image: '/images/kente-history.jpg',
    slug: 'history-of-kente',
  },
  {
    title: 'The Art of Adinkra Symbols',
    excerpt: 'Discover the meanings behind these traditional symbols...',
    image: '/images/adinkra-art.jpg',
    slug: 'adinkra-symbols',
  },
  // Add more articles...
]);

// Upcoming Events
const events = ref([
  {
    title: 'African Art Exhibition',
    date: '2023-12-15',
    description: 'A showcase of contemporary African art...',
    slug: 'african-art-exhibition',
    color: 'accent',
  },
  {
    title: 'Traditional Dance Festival',
    date: '2024-01-20',
    description: 'Celebrate African culture through dance...',
    slug: 'dance-festival',
    color: 'primary',
  },
  // Add more events...
]);

// Gallery Images
const galleryImages = ref([
  '/images/gallery-1.jpg',
  '/images/gallery-2.jpg',
  '/images/gallery-3.jpg',
  // Add more images...
]);

// Back to Top Button Logic
const showBackToTop = ref(false);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function handleScroll() {
  showBackToTop.value = window.scrollY > 200;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.afro-hub-page {
  background-color: #fafafa;
}

.hero-section {
  position: relative;
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.hero-title {
  font-family: 'Ubuntu', sans-serif;
  font-size: 4rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: 1.5rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.section-title {
  font-family: 'Ubuntu', sans-serif;
  font-size: 2.5rem;
  color: #e9c46a;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.artisan-card {
  transition: transform 0.3s ease;
}

.artisan-card:hover {
  transform: translateY(-5px);
}

.cultural-heritage {
  background-color: #1a1a1a;
  color: white;
}

.events {
  background-color: #f5f5f5;
}

.event-date {
  font-weight: bold;
  color: #e9c46a;
}

.gallery-image {
  border: 2px solid #e9c46a;
  transition: transform 0.3s ease;
}

.gallery-image:hover {
  transform: scale(1.05);
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Non-standard property */
  line-clamp: 2; /* Standard property */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  transition: opacity 0.3s ease;
}

.back-to-top:hover {
  transform: scale(1.1);
}
</style>

<template>
  <!-- App Bar -->
  <v-app-bar color="brown-darken-2" density="compact">
    <!-- Drawer Activator Icon -->
    <v-app-bar-nav-icon @click.stop="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-app-bar-nav-icon>

    <!-- Platform Name -->
    <v-toolbar-title class="font-weight-bold">
  <router-link to="/" class="site-logo">
    NOK<span class="text-accent">TRO</span>POLIS
  </router-link>
</v-toolbar-title>
    <!-- Desktop Navigation -->
    <div class="d-none d-sm-flex ml-6">
      <v-btn variant="text" to="/">Home</v-btn>

      <!-- Shop Dropdown -->
      <v-menu open-on-hover :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn variant="text" to="/shop" v-bind="props" @click.stop>
            <v-icon left>mdi-store</v-icon>
            Shop
          </v-btn>
        </template>
        <v-list density="compact" class="shop-menu">
          <template v-for="(category, i) in shopCategories" :key="i">
            <!-- Category -->
            <v-list-item :to="category.route">
              <template v-slot:prepend>
                <v-icon>{{ category.icon }}</v-icon>
              </template>
              <v-list-item-title>{{ category.title }}</v-list-item-title>
            </v-list-item>

            <!-- Subcategories -->
            <v-list-item
              v-for="sub in category.subcategories"
              :key="sub.slug"
              :to="`/shop/${category.route}/${sub.slug}`"
              class="subcategory-item"
            >
              <v-list-item-title>{{ sub.title }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>

      <v-btn variant="text" to="/afrohub">Afro Hub</v-btn>
      <v-btn variant="text" to="/blog">Blog</v-btn>
    </div>

    <!-- Right Section -->
    <v-spacer></v-spacer>

    <!-- Search Bar -->
    <v-text-field
      v-model="searchQuery"
      density="compact"
      variant="solo"
      placeholder="Search"
      prepend-inner-icon="mdi-magnify"
      class="search-bar"
      hide-details
    ></v-text-field>

    <!-- Cart Icon -->
    <v-btn icon to="/cart" class="ml-2">
      <v-badge v-if="cartStore.cartItemsCount > 0" :content="cartStore.cartItemsCount" color="red" overlap>
        <v-icon>mdi-cart</v-icon>
      </v-badge>
      <v-icon v-else>mdi-cart-outline</v-icon>
    </v-btn>

    <!-- Account Menu Dropdown -->
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon class="ml-2" v-bind="props">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list density="compact">
        <template v-if="!isAuthenticated">
          <v-list-item v-for="(item, index) in guestMenuItems" :key="index" :to="item.route">
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>

        <template v-else>
          <v-list-item v-for="(item, index) in authMenuItems" :key="index" @click="item.action">
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </v-app-bar>

  <!-- Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary location="left">
    <v-list density="compact" nav>
      <v-list-item v-for="(item, index) in navDrawerItems" :key="index" :to="item.route">
        <v-icon class="mr-2">{{ item.icon }}</v-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const drawer = ref(false);
const isAuthenticated = ref(false);
const searchQuery = ref('');

// Navigation Drawer Items
const navDrawerItems = [
  { title: 'Home', icon: 'mdi-home', route: '/' },
  { title: 'Shop', icon: 'mdi-shopping', route: '/shop' },
  { title: 'Afro Hub', icon: 'mdi-earth', route: '/afrohub' },
  { title: 'Blog', icon: 'mdi-newspaper', route: '/blog' },
  { title: 'About Us', icon: 'mdi-information', route: '/about' },
  { title: 'Contact Us', icon: 'mdi-email', route: '/contact' },
];

// Account Menu Items
const guestMenuItems = [
  { title: 'Login', icon: 'mdi-login', route: '/login' },
  { title: 'Sign Up', icon: 'mdi-account-plus', route: '/signup' },
];

const authMenuItems = [
  { title: 'Profile', icon: 'mdi-account', action: () => console.log('Profile clicked') },
  { title: 'Logout', icon: 'mdi-logout', action: () => console.log('Logout clicked') },
];

// Shop Categories with Subcategories
const shopCategories = [
  {
    title: 'Clothing',
    icon: 'mdi-tshirt-crew',
    route: 'clothing',
    subcategories: [
      { title: 'Ankara Styles', slug: 'ankara' },
      { title: 'Dashikis', slug: 'dashikis' },
      { title: 'Modern Fusion', slug: 'fusion' },
    ],
  },
  {
    title: 'Accessories',
    icon: 'mdi-necklace',
    route: 'accessories',
    subcategories: [
      { title: 'Beaded Jewelry', slug: 'beaded-jewelry' },
      { title: 'Head Wraps', slug: 'head-wraps' },
    ],
  },
];
</script>

<style scoped>
/* App Bar */
.v-app-bar {
  display: flex;
  align-items: center;
  padding: 0 20px;
}

/* Search Bar */
.search-bar {
  max-width: 250px;
}

/* Shop Menu Styling */
.shop-menu {
  min-width: 200px;
}

/* Subcategory Styling */
.subcategory-item {
  padding-left: 40px;
  font-size: 0.9rem;
}

/* Drawer Styling */
.v-navigation-drawer {
  background-color: #4e342e;
  color: white;
}
.site-logo {
  text-decoration: none; /* Remove underline */
  color: inherit; /* Inherit color from parent */
  font-weight: bold; /* Ensure it keeps the bold look */
}
</style>

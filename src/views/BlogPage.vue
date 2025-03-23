<template>
  <v-container>
    <!-- Page Title -->
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="display-1 font-weight-bold">Noktropolis Blog</h1>
        <p class="subtitle-1">Explore stories, culture, and inspiration from the Afrocentric world.</p>
      </v-col>
    </v-row>

    <!-- Search Bar -->
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-text-field
          v-model="searchQuery"
          label="Search articles"
          outlined
          dense
          prepend-inner-icon="mdi-magnify"
          @input="filterArticles"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Categories/Tags -->
    <v-row>
      <v-col cols="12" class="text-center">
        <v-chip
          v-for="category in categories"
          :key="category"
          class="ma-2"
          :color="selectedCategory === category ? 'primary' : 'grey lighten-2'"
          @click="filterByCategory(category)"
        >
          {{ category }}
        </v-chip>
      </v-col>
    </v-row>

    <!-- Blog Posts Grid -->
    <v-row>
      <v-col
        v-for="post in filteredPosts"
        :key="post.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card hover @click="viewPost(post.id)">
          <v-img :src="post.image" height="200px" class="align-end">
            <v-card-title class="white--text" style="background: rgba(0, 0, 0, 0.5);">
              {{ post.title }}
            </v-card-title>
          </v-img>
          <v-card-text>
            <p class="subtitle-1">{{ post.excerpt }}</p>
            <v-btn color="primary" text @click.stop="viewPost(post.id)">
              Read More
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-row>
      <v-col cols="12" class="text-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @input="changePage"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "", // For search functionality
      selectedCategory: "All", // Default category filter
      currentPage: 1, // Current page for pagination
      postsPerPage: 6, // Number of posts per page
      categories: ["All", "Fashion", "Art", "History", "Culture", "Events"], // Blog categories
      blogPosts: [
        {
          id: 1,
          title: "The Rise of Afrocentric Fashion",
          excerpt: "Discover how Afrocentric fashion is taking the world by storm.",
          image: "https://via.placeholder.com/400x200",
          category: "Fashion",
        },
        {
          id: 2,
          title: "Exploring African Art Traditions",
          excerpt: "A deep dive into the rich history of African art.",
          image: "https://via.placeholder.com/400x200",
          category: "Art",
        },
        {
          id: 3,
          title: "The History of African Drumming",
          excerpt: "Learn about the cultural significance of drumming in Africa.",
          image: "https://via.placeholder.com/400x200",
          category: "History",
        },
        {
          id: 4,
          title: "Celebrating African Festivals",
          excerpt: "A guide to the most vibrant festivals across the continent.",
          image: "https://via.placeholder.com/400x200",
          category: "Events",
        },
        {
          id: 5,
          title: "The Beauty of African Hairstyles",
          excerpt: "From braids to afros, explore the diversity of African hairstyles.",
          image: "https://via.placeholder.com/400x200",
          category: "Fashion",
        },
        {
          id: 6,
          title: "The Influence of African Music",
          excerpt: "How African music has shaped global sounds.",
          image: "https://via.placeholder.com/400x200",
          category: "Culture",
        },
      ],
    };
  },
  computed: {
    // Filter posts based on search query and category
    filteredPosts() {
      return this.blogPosts
        .filter((post) => {
          const matchesSearch = post.title
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
          const matchesCategory =
            this.selectedCategory === "All" ||
            post.category === this.selectedCategory;
          return matchesSearch && matchesCategory;
        })
        .slice(
          (this.currentPage - 1) * this.postsPerPage,
          this.currentPage * this.postsPerPage
        );
    },
    // Calculate total pages for pagination
    totalPages() {
      return Math.ceil(
        this.blogPosts.filter((post) => {
          const matchesSearch = post.title
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
          const matchesCategory =
            this.selectedCategory === "All" ||
            post.category === this.selectedCategory;
          return matchesSearch && matchesCategory;
        }).length / this.postsPerPage
      );
    },
  },
  methods: {
    // Filter posts by category
    filterByCategory(category) {
      this.selectedCategory = category;
      this.currentPage = 1; // Reset to first page
    },
    // Change page for pagination
    changePage(page) {
      this.currentPage = page;
    },
    // Navigate to a specific blog post
    viewPost(postId) {
      this.$router.push({ name: "BlogPost", params: { id: postId } });
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: transform 0.3s ease;
}
.v-card:hover {
  transform: translateY(-5px);
}
.v-chip {
  cursor: pointer;
}
</style>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-card-title class="text-h5 font-weight-bold">
            My Reviews & Ratings
          </v-card-title>

          <v-divider class="mb-4"></v-divider>

          <v-alert v-if="error" type="error" variant="outlined">
            {{ error }}
          </v-alert>

          <v-progress-linear v-if="loading" indeterminate></v-progress-linear>

          <v-alert v-if="!loading && reviews.length === 0" type="info">
            You haven't reviewed any products yet.
          </v-alert>

          <v-list v-if="!loading && reviews.length > 0" lines="two">
            <v-list-item v-for="review in reviews" :key="review.id">
              <template v-slot:prepend>
                <v-avatar size="56">
                  <v-img :src="review.product.image" alt="Product" />
                </v-avatar>
              </template>

              <v-list-item-title class="font-weight-bold">
                {{ review.product.name }}
              </v-list-item-title>

              <v-list-item-subtitle>
                <v-rating v-model="review.rating" readonly color="amber"></v-rating>
              </v-list-item-subtitle>

              <v-list-item-text>
                <span class="text-body-2">{{ review.comment }}</span>
              </v-list-item-text>

              <template v-slot:append>
                <v-chip color="primary" variant="outlined">
                  {{ review.created_at }}
                </v-chip>
              </template>

              <v-divider class="mt-3"></v-divider>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const reviews = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchUserReviews = async () => {
  try {
    const response = await axios.get("/api/user/reviews");
    reviews.value = response.data;
  } catch (err) {
    console.error("Error fetching reviews:", err); // ✅ Log the error
    error.value = "Failed to load reviews.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUserReviews);
</script>

<style scoped>
/* Responsive design tweaks */
.v-list-item {
  align-items: center;
}
</style>

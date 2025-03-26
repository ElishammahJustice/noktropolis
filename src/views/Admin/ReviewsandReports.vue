<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>Reviews & Reports Management</v-card-title>
      <v-card-text>
        <v-tabs v-model="tab" background-color="brown-darken-2" dark>
          <v-tab value="reviews">Product Reviews</v-tab>
          <v-tab value="reports">User Reports</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item value="reviews">
            <v-data-table :headers="reviewHeaders" :items="reviews" class="elevation-1">
              <template v-slot:item.actions="{ item }">
                <v-btn icon color="red" @click="deleteReview(item.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-tab-item>

          <v-tab-item value="reports">
            <v-data-table :headers="reportHeaders" :items="reports" class="elevation-1">
              <template v-slot:item.actions="{ item }">
                <v-btn icon color="blue" @click="resolveReport(item.id)">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="deleteReport(item.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const tab = ref('reviews');
const reviews = ref([]);
const reports = ref([]);

const reviewHeaders = [
  { text: 'Product', value: 'product' },
  { text: 'User', value: 'user' },
  { text: 'Rating', value: 'rating' },
  { text: 'Comment', value: 'comment' },
  { text: 'Actions', value: 'actions', sortable: false }
];

const reportHeaders = [
  { text: 'Reported By', value: 'reporter' },
  { text: 'Reason', value: 'reason' },
  { text: 'Status', value: 'status' },
  { text: 'Actions', value: 'actions', sortable: false }
];

const fetchData = async () => {
  try {
    const reviewResponse = await axios.get('/api/admin/reviews');
    const reportResponse = await axios.get('/api/admin/reports');
    reviews.value = reviewResponse.data;
    reports.value = reportResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const deleteReview = async (id) => {
  try {
    await axios.delete(`/api/admin/reviews/${id}`);
    reviews.value = reviews.value.filter(review => review.id !== id);
  } catch (error) {
    console.error('Error deleting review:', error);
  }
};

const resolveReport = async (id) => {
  try {
    await axios.put(`/api/admin/reports/${id}`, { status: 'Resolved' });
    reports.value = reports.value.map(report => report.id === id ? { ...report, status: 'Resolved' } : report);
  } catch (error) {
    console.error('Error resolving report:', error);
  }
};

const deleteReport = async (id) => {
  try {
    await axios.delete(`/api/admin/reports/${id}`);
    reports.value = reports.value.filter(report => report.id !== id);
  } catch (error) {
    console.error('Error deleting report:', error);
  }
};

onMounted(fetchData);
</script>

<style scoped>
.v-card {
  max-width: 900px;
  margin: auto;
  border-radius: 12px;
}
</style>

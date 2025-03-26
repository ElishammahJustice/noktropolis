<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>Reviews & Ratings</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="review in reviews" :key="review.id">
            <v-list-item-content>
              <v-list-item-title>
                <strong>{{ review.customer_name }}</strong>
                <v-rating :value="review.rating" dense readonly></v-rating>
              </v-list-item-title>
              <v-list-item-subtitle>{{ review.comment }}</v-list-item-subtitle>
              <v-btn v-if="review.response" text color="green">Replied</v-btn>
              <v-btn v-else text color="blue" @click="openReplyDialog(review)">Reply</v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Reply Dialog -->
    <v-dialog v-model="replyDialog" max-width="500px">
      <v-card>
        <v-card-title>Reply to Review</v-card-title>
        <v-card-text>
          <v-textarea v-model="replyText" label="Your Response" outlined required></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="replyDialog = false">Cancel</v-btn>
          <v-btn color="green" :loading="loading" @click="submitReply">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const reviews = ref([]);
const replyDialog = ref(false);
const replyText = ref('');
const loading = ref(false);
const selectedReview = ref(null);

const fetchReviews = async () => {
  try {
    const response = await axios.get('/api/vendor/reviews');
    reviews.value = response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

const openReplyDialog = (review) => {
  selectedReview.value = review;
  replyText.value = '';
  replyDialog.value = true;
};

const submitReply = async () => {
  if (!selectedReview.value) return;
  loading.value = true;
  try {
    await axios.post(`/api/vendor/reviews/${selectedReview.value.id}/reply`, {
      response: replyText.value,
    });
    alert('Reply submitted successfully!');
    replyDialog.value = false;
    fetchReviews();
  } catch (error) {
    console.error('Error submitting reply:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchReviews);
</script>

<style scoped>
.v-card {
  max-width: 700px;
  margin: auto;
  border-radius: 12px;
}
</style>

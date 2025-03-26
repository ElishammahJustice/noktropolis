earnings and payout
<template>
  <v-container>
    <v-card class="elevation-6 custom-card">
      <v-card-title class="headline brown--text">Earnings & Payouts</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="earning-card">
              <v-card-title>Total Earnings</v-card-title>
              <v-card-text class="amount">${{ totalEarnings }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="payout-card">
              <v-card-title>Available for Payout</v-card-title>
              <v-card-text class="amount">${{ availablePayout }}</v-card-text>
              <v-btn color="brown-darken-2" class="mt-2" @click="requestPayout">Request Payout</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      totalEarnings: 5000,
      availablePayout: 1200,
    };
  },
  methods: {
    requestPayout() {
      alert("Payout request submitted!");
    },
  },
};
</script>

<style scoped>
.custom-card {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.amount {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>

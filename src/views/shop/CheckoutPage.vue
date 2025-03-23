<template>
  <v-container>
    <h1 class="text-h4">Checkout</h1>

    <v-container v-if="cart.length === 0">
      <h2 class="text-h5">Your cart is empty.</h2>
      <v-btn color="accent" @click="goToShop" class="mt-4">Shop Now</v-btn>
    </v-container>

    <v-container v-else>
      <v-card class="order-summary">
        <v-card-title>Order Summary</v-card-title>
        <v-divider></v-divider>

        <v-list>
          <v-list-item v-for="(item, index) in cart" :key="index">
            <v-list-item-avatar>
              <v-img :src="item.image"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ formatCurrency(item.price) }} x {{ item.quantity }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <span class="font-weight-bold">{{ formatCurrency(item.price * item.quantity) }}</span>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-card-text>
          <p><strong>Subtotal:</strong> {{ formatCurrency(totalPrice) }}</p>
          <p><strong>Shipping:</strong> {{ formatCurrency(shippingCost) }}</p>
          <p><strong>Tax (5%):</strong> {{ formatCurrency(tax) }}</p>
          <h3 class="font-weight-bold">Total: {{ formatCurrency(grandTotal) }}</h3>
        </v-card-text>
      </v-card>

      <v-card class="mt-6">
        <v-card-title>Shipping Details</v-card-title>
        <v-card-text>
          <v-text-field v-model="shipping.name" label="Full Name" :rules="[rules.required]" required></v-text-field>
          <v-text-field v-model="shipping.address" label="Address" :rules="[rules.required]" required></v-text-field>
          <v-text-field v-model="shipping.phone" label="Phone Number" :rules="[rules.required]" required></v-text-field>
          <v-text-field v-model="shipping.email" label="Email" type="email" :rules="[rules.email]" required></v-text-field>
        </v-card-text>
      </v-card>

      <v-btn color="green-darken-1" class="mt-4" block @click="placeOrder">Place Order</v-btn>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);
const shippingCost = computed(() => 10);
const tax = computed(() => (totalPrice.value * 0.05).toFixed(2));
const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0));
const grandTotal = computed(() => parseFloat(totalPrice.value) + parseFloat(shippingCost.value) + parseFloat(tax.value));

const shipping = ref({ name: '', address: '', phone: '', email: '' });

const formatCurrency = amount => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);

const rules = {
  required: v => !!v || 'Field is required',
  email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
};

watch(cart, newCart => localStorage.setItem('cart', JSON.stringify(newCart)), { deep: true });

const goToShop = () => router.push('/shop');

const placeOrder = () => {
  if (!shipping.value.name || !shipping.value.address || !shipping.value.phone || !shipping.value.email) {
    alert('Please fill in all shipping details.');
    return;
  }

  // Save order details in localStorage or Vuex for the payment page
  localStorage.setItem('orderDetails', JSON.stringify({
    cart: cart.value,
    shipping: shipping.value,
    total: grandTotal.value,
  }));

  // Redirect to the payment page
  router.push('/payment');
};
</script>

<style scoped>
.order-summary, .v-card {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
}

.font-weight-bold {
  font-weight: bold;
}
</style>

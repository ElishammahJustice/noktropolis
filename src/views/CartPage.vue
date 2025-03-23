<template>
  <v-container class="cart-page" v-if="cartStore.cart.length > 0">
    <h1 class="text-h4 mb-6">Your Cart</h1>

    <!-- Cart Items Section -->
    <v-row v-for="item in cartStore.cart" :key="item.id" class="cart-item mb-4">
      <v-col cols="12" md="8">
        <v-card class="cart-card" elevation="4">
          <v-row>
            <v-col cols="4">
              <v-img :src="item.image" height="180" contain />
            </v-col>
            <v-col cols="8">
              <v-card-title class="cart-card-title">{{ item.name }}</v-card-title>
              <v-card-subtitle class="cart-card-subtitle">{{ item.description }}</v-card-subtitle>

              <!-- Quantity and Update -->
              <v-row align="center" class="mt-4">
                <v-col cols="6" md="3">
                  <v-text-field
                    v-model.number="item.quantity"
                    type="number"
                    min="1"
                    label="Quantity"
                    outlined
                    @change="updateQuantity(item)"
                  />
                </v-col>
                <v-col cols="6" md="3">
                  <v-btn
                    color="red"
                    @click="cartStore.removeItem(item.id)"
                    class="remove-btn"
                    rounded
                  >
                    Remove
                  </v-btn>
                </v-col>
              </v-row>

              <!-- Price -->
              <v-row>
                <v-col cols="12" class="text-right">
                  <span class="cart-item-price">₦{{ (item.price * item.quantity).toFixed(2) }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Total Price Section -->
    <v-row>
      <v-col cols="12" md="8" offset-md="4" class="total-price-section">
        <v-card class="total-card" elevation="4">
          <v-card-title>Total Summary</v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle>
            <v-row>
              <v-col cols="6">Subtotal</v-col>
              <v-col cols="6" class="text-right">₦{{ cartStore.totalPrice }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="6">Shipping</v-col>
              <v-col cols="6" class="text-right">₦{{ shippingCost }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="6">Tax (5%)</v-col>
              <v-col cols="6" class="text-right">₦{{ tax }}</v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="6" class="font-weight-bold">Total</v-col>
              <v-col cols="6" class="text-right font-weight-bold">₦{{ grandTotal }}</v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Checkout Section -->
    <v-row class="mt-6">
      <v-col cols="12" md="6" class="text-center">
        <v-btn color="green" size="large" @click="proceedToCheckout">
          Proceed to Checkout
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" class="text-center">
        <v-btn color="grey" size="large" @click="cartStore.clearCart">
          Clear Cart
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else>
    <h1 class="text-h4">Your Cart is Empty</h1>
    <v-btn color="accent" @click="goToShop" class="mt-4">Shop Now</v-btn>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';

const router = useRouter();
const cartStore = useCartStore();

const shippingCost = computed(() => 10);
const tax = computed(() => (cartStore.totalPrice * 0.05).toFixed(2));
const grandTotal = computed(() => (parseFloat(cartStore.totalPrice) + parseFloat(shippingCost.value) + parseFloat(tax.value)).toFixed(2));

const updateQuantity = (item) => {
  if (item.quantity < 1) item.quantity = 1;
  // Since we're directly binding to item.quantity, saving will happen via the store's watch mechanism.
  cartStore.saveCart();
};

const proceedToCheckout = () => {
  router.push('/checkout');
};

const goToShop = () => {
  router.push('/shop');
};
</script>

<style scoped>
.cart-page {
  background-color: #fafafa;
  color: #333;
}

.cart-card {
  background-color: #fff;
  border-radius: 10px;
}

.cart-item-price {
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
}

.total-price-section {
  margin-top: 2rem;
}

.font-weight-bold {
  font-weight: bold;
}

.mt-6 {
  margin-top: 3rem;
}
</style>

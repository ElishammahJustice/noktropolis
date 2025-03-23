// stores/cart.js
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);

  const cartItemsCount = computed(() =>
    cart.value.reduce((total, item) => total + item.quantity, 0)
  );

  const totalPrice = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );

  function addToCart(product) {
    const existingProduct = cart.value.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
    saveCart();
  }

  function removeItem(productId) {
    cart.value = cart.value.filter(item => item.id !== productId);
    saveCart();
  }

  function clearCart() {
    cart.value = [];
    saveCart();
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart.value));
  }

  watch(cart, saveCart, { deep: true });

  return { cart, cartItemsCount, totalPrice, addToCart, removeItem, clearCart };
});

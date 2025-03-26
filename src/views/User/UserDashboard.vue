<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-black text-white p-6">
      <h2 class="text-xl font-bold mb-6">Noktropolis User</h2>
      <nav>
        <ul>
          <li v-for="item in menuItems" :key="item.route" class="mb-4">
            <router-link :to="item.route" :class="{ 'text-yellow-500': $route.path === item.route }" class="hover:text-yellow-500">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 p-6">
      <header class="bg-white p-4 shadow-md flex justify-between items-center">
        <h1 class="text-2xl font-semibold">User Dashboard</h1>
        <button @click="logout" class="bg-yellow-500 text-black px-4 py-2 rounded">Logout</button>
      </header>

      <div class="grid grid-cols-3 gap-6 mt-6">
        <div class="bg-white p-4 shadow rounded-lg">
          <h3 class="text-lg font-semibold">Total Orders</h3>
          <p class="text-2xl font-bold">{{ orders.length }}</p>
        </div>
        <div class="bg-white p-4 shadow rounded-lg">
          <h3 class="text-lg font-semibold">Wishlist Items</h3>
          <p class="text-2xl font-bold">{{ wishlist.length }}</p>
        </div>
      </div>

      <!-- Order History Section -->
      <div class="mt-6 bg-white p-6 shadow rounded-lg">
        <h2 class="text-xl font-bold mb-4">Order History</h2>
        <table class="w-full border-collapse border border-gray-200">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-2">Order ID</th>
              <th class="border p-2">Total Price</th>
              <th class="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td class="border p-2">{{ order.id }}</td>
              <td class="border p-2">${{ order.total_price }}</td>
              <td class="border p-2">{{ order.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Wishlist Section -->
      <div class="mt-6 bg-white p-6 shadow rounded-lg">
        <h2 class="text-xl font-bold mb-4">Wishlist</h2>
        <table class="w-full border-collapse border border-gray-200">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-2">Product</th>
              <th class="border p-2">Price</th>
              <th class="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in wishlist" :key="item.id">
              <td class="border p-2">{{ item.name }}</td>
              <td class="border p-2">${{ item.price }}</td>
              <td class="border p-2">
                <button @click="removeFromWishlist(item.id)" class="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserDashboard',
  data() {
    return {
      orders: [],
      wishlist: [],
      menuItems: [
        { name: "Dashboard", route: "/user" },
        { name: "Order History", route: "/user/orders" },
        { name: "Wishlist", route: "/user/wishlist" },
        { name: "Account Settings", route: "/user/settings" },
        { name: "Messages & Support", route: "/user/support" },
        { name: "Reviews & Ratings", route: "/user/reviews" }
      ]
    };
  },
  mounted() {
    this.fetchOrders();
    this.fetchWishlist();
  },
  methods: {
    async fetchOrders() {
      const response = await axios.get('/api/user/orders');
      this.orders = response.data;
    },
    async fetchWishlist() {
      const response = await axios.get('/api/user/wishlist');
      this.wishlist = response.data;
    },
    async removeFromWishlist(id) {
      await axios.delete(`/api/user/wishlist/${id}`);
      this.fetchWishlist();
    },
    logout() {
      alert("Logging out...");
    }
  }
};
</script>

<style scoped>
.bg-black {
  background-color: #000;
}
</style>

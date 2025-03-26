<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-black text-white p-6">
      <h2 class="text-xl font-bold mb-6">Noktropolis Admin</h2>
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
        <h1 class="text-2xl font-semibold">Admin Dashboard</h1>
        <button @click="logout" class="bg-yellow-500 text-black px-4 py-2 rounded">Logout</button>
      </header>

      <div v-if="loading" class="text-center mt-6 text-lg font-semibold">Loading data...</div>

      <div v-else>
        <div class="grid grid-cols-4 gap-6 mt-6">
          <div v-for="stat in stats" :key="stat.title" class="bg-white p-4 shadow rounded-lg">
            <h3 class="text-lg font-semibold">{{ stat.title }}</h3>
            <p class="text-2xl font-bold">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
  data() {
    return {
      loading: true,
      stats: [
        { title: "Total Orders", value: "1,245" },
        { title: "Revenue", value: "$45,678" },
        { title: "Users", value: "5,312" },
        { title: "Products", value: "237" }
      ],
      menuItems: [
        { name: "Dashboard", route: "/admin" },
        { name: "User Management", route: "/admin/users" },
        { name: "Vendor Management", route: "/admin/vendors" },
        { name: "Product Management", route: "/admin/products" },
        { name: "Order Management", route: "/admin/orders" },
        { name: "Earnings & Transactions", route: "/admin/earnings" },
        { name: "Reviews & Ratings", route: "/admin/reviews" },
        { name: "Site Settings", route: "/admin/settings" }
      ]
    };
  },
  methods: {
    logout() {
      // Implement logout logic
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

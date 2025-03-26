<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-black text-white p-6">
      <h2 class="text-xl font-bold mb-6">Noktropolis Vendor</h2>
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
        <h1 class="text-2xl font-semibold">Vendor Dashboard</h1>
        <button @click="logout" class="bg-yellow-500 text-black px-4 py-2 rounded">Logout</button>
      </header>

      <div class="grid grid-cols-3 gap-6 mt-6">
        <div v-for="stat in stats" :key="stat.title" class="bg-white p-4 shadow rounded-lg">
          <h3 class="text-lg font-semibold">{{ stat.title }}</h3>
          <p class="text-2xl font-bold">{{ stat.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VendorDashboard",
  data() {
    return {
      stats: [
        { title: "Total Sales", value: "$12,340" },
        { title: "Total Products", value: "45" },
        { title: "Pending Orders", value: "8" }
      ],
      menuItems: [
        { name: "Dashboard", route: "/vendor" },
        { name: "Manage Products", route: "/vendor/products" },
        { name: "Add Product", route: "/vendor/products/add" },
        { name: "Manage Orders", route: "/vendor/orders" },
        { name: "Earnings & Payouts", route: "/vendor/earnings" },
        { name: "Store Settings", route: "/vendor/settings" },
        { name: "Reviews & Ratings", route: "/vendor/reviews" }
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

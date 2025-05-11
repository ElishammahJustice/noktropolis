import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../router/services/auth.service' // Import authentication service

// General Public Pages
import Home from '../views/HomePage.vue'
import AboutUs from '../views/AboutUs.vue'
import ShopPage from '../views/shop/IndexPage.vue'
import CategoryPage from '../views/shop/CategoryPage.vue'
import SubcategoryPage from '../views/shop/Sub_Category.vue'
import AfroHub from '../views/AfroHub.vue'
import BlogPage from '../views/BlogPage.vue'
import SignUp from '../views/SignUp.vue'
import LoginPage from '../views/LoginPage.vue'
import CartPage from '../views/CartPage.vue'
import CheckoutPage from '../views/shop/CheckoutPage.vue'
import PaymentPage from '../views/shop/PaymentPage.vue'

// User Dashboard (for authenticated customers)
import UserDashboard from '../views/User/UserDashboard.vue'
import AccountSettings from '../views/User/AccountSettings.vue'
import MessagesandSupport from '../views/User/MessagesandSupport.vue'
import OrderHistory from '../views/User/OrderHistory.vue'
import ReviewsandRatings from '../views/User/ReviewsandRatings.vue'
import WishList from '../views/User/WishList.vue'

// Vendor Pages (Only Accessible by Vendors)
import VendorDashboard from '../views/Vendor/VendorDashboard.vue'
import AddProduct from '../views/Vendor/AddProducts.vue'
import EarningsandPayout from '../views/Vendor/EarningsandPayout.vue'
import ManageOrder from '../views/Vendor/ManageOrder.vue'
import ReviewandRating from '../views/Vendor/ReviewandRating.vue'
import StoreSetttings from '../views/Vendor/StoreSetttings.vue'
import VendorManageProducts from '../views/Vendor/VendorManageProducts.vue'

// Admin Pages (Only Accessible by Admin)
import AdminDashboard from '@/views/Admin/AdminDashboard.vue'
import EarningsandTransactions from '@/views/Admin/EarningsandTransactions.vue'
import OrderManagement from '@/views/Admin/OrderManagement.vue'
import ProductManagement from '@/views/Admin/ProductManagement.vue'
import ReviewsandReports from '@/views/Admin/ReviewsandReports.vue'
import SiteSettings from '@/views/Admin/SiteSettings.vue'
import UserManagement from '@/views/Admin/UserManagement.vue'
import VendorManagement from '@/views/Admin/VendorManagement.vue'

const routes = [
  // Public Routes
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: AboutUs },
  { path: '/shop', name: 'Shop', component: ShopPage },
  { path: '/shop/:category', name: 'Category', component: CategoryPage, props: true },
  { path: '/shop/:category/:subcategory', name: 'Subcategory', component: SubcategoryPage, props: true },
  { path: '/afrohub', name: 'AfroHub', component: AfroHub },
  { path: '/blog', name: 'Blog', component: BlogPage },
  { path: '/signup', name: 'Signup', component: SignUp, meta: { requiresGuest: true } },
  { path: '/login', name: 'Login', component: LoginPage, meta: { requiresGuest: true } },
  { path: '/cart', name: 'Cart', component: CartPage },
  { path: '/checkout', name: 'Checkout', component: CheckoutPage, meta: { requiresAuth: true } },
  { path: '/payment', name: 'Payment', component: PaymentPage, meta: { requiresAuth: true } },

  // User Dashboard Routes (Customers)
  {
    path: '/user', component: UserDashboard, meta: { requiresAuth: true, role: 'Customer' },
    children: [
      { path: 'settings', name: 'AccountSettings', component: AccountSettings },
      { path: 'messages', name: 'MessagesandSupport', component: MessagesandSupport },
      { path: 'orders', name: 'OrderHistory', component: OrderHistory },
      { path: 'reviews', name: 'ReviewsandRatings', component: ReviewsandRatings },
      { path: 'wishlist', name: 'WishList', component: WishList },
    ]
  },

  // Vendor Dashboard Routes (Only for Vendors)
  {
    path: '/vendor', component: VendorDashboard, meta: { requiresAuth: true, role: 'Vendor' },
    children: [
      { path: 'add-product', name: 'AddProducts', component: AddProduct },
      { path: 'earnings', name: 'EarningsandPayout', component: EarningsandPayout },
      { path: 'orders', name: 'ManageOrder', component: ManageOrder },
      { path: 'reviews', name: 'ReviewandRating', component: ReviewandRating },
      { path: 'store-settings', name: 'StoreSettings', component: StoreSetttings },
      { path: 'manage-products', name: 'VendorManageProducts', component: VendorManageProducts },
    ]
  },

  // Admin Dashboard Routes
  {
    path: '/admin', component: AdminDashboard, meta: { requiresAuth: true, role: 'Admin' },
    children: [
      { path: 'earnings', name: 'EarningsandTransactions', component: EarningsandTransactions },
      { path: 'orders', name: 'OrderManagement', component: OrderManagement },
      { path: 'products', name: 'ProductManagement', component: ProductManagement },
      { path: 'reviews', name: 'ReviewsandReports', component: ReviewsandReports },
      { path: 'settings', name: 'SiteSettings', component: SiteSettings },
      { path: 'users', name: 'UserManagement', component: UserManagement },
      { path: 'vendors', name: 'VendorManagement', component: VendorManagement },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const { isAuthenticated, userRole } = useAuth();

  // If route requires authentication but user is not logged in, redirect to Login
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return next({ name: 'Login' });
  }

  // Prevent authenticated users from visiting Signup/Login pages
  if (to.meta.requiresGuest && isAuthenticated.value) {
    return next({ name: 'home' });
  }

  // Role-based access: If route requires a specific role and userRole doesn't match, redirect to home
  if (to.meta.role && userRole.value !== to.meta.role) {
    return next({ name: 'home' });
  }

  next();
});

export default router;

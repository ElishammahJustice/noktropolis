import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../router/services/auth.service'

// Public Pages
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

// User Dashboard
import UserDashboard from '../views/User/UserDashboard.vue'
import AccountSettings from '../views/User/AccountSettings.vue'
import MessagesandSupport from '../views/User/MessagesandSupport.vue'
import OrderHistory from '../views/User/OrderHistory.vue'
import ReviewsandRatings from '../views/User/ReviewsandRatings.vue'
import WishList from '../views/User/WishList.vue'

// Vendor Dashboard
import VendorDashboard from '../views/Vendor/VendorDashboard.vue'
import AddProduct from '../views/Vendor/AddProducts.vue'
import EarningsandPayout from '../views/Vendor/EarningsandPayout.vue'
import ManageOrder from '../views/Vendor/ManageOrder.vue'
import ReviewandRating from '../views/Vendor/ReviewandRating.vue'
import StoreSetttings from '../views/Vendor/StoreSetttings.vue'
import VendorManageProducts from '../views/Vendor/VendorManageProducts.vue'

// Admin Dashboard
import AdminDashboard from '../views/Admin/AdminDashboard.vue'
import EarningsandTransactions from '../views/Admin/EarningsandTransactions.vue'
import OrderManagement from '../views/Admin/OrderManagement.vue'
import ProductManagement from '../views/Admin/ProductManagement.vue'
import ReviewsandReports from '../views/Admin/ReviewsandReports.vue'
import SiteSettings from '../views/Admin/SiteSettings.vue'
import UserManagement from '../views/Admin/UserManagement.vue'
import VendorManagement from '../views/Admin/VendorManagement.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: AboutUs },
  { path: '/shop', name: 'shop', component: ShopPage },
  { path: '/shop/:category', name: 'category', component: CategoryPage, props: true },
  { path: '/shop/:category/:subcategory', name: 'subcategory', component: SubcategoryPage, props: true },
  { path: '/afrohub', name: 'afrohub', component: AfroHub },
  { path: '/blog', name: 'blog', component: BlogPage },
  { path: '/signup', name: 'signup', component: SignUp },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/cart', name: 'cart', component: CartPage },
  { path: '/checkout', name: 'checkout', component: CheckoutPage, meta: { requiresAuth: true, ability: 'checkout' } },
  { path: '/payment', name: 'payment', component: PaymentPage, meta: { requiresAuth: true, ability: 'checkout' } },

  // User Dashboard root route named 'UserDashboard' for routing to work with your auth.service.js
  {
    path: '/user',
    component: UserDashboard,
    name: 'UserDashboard',
    meta: { requiresAuth: true, ability: 'view_user_dashboard' },
    children: [
      { path: 'settings', name: 'account-settings', component: AccountSettings, meta: { ability: 'update_account_settings' } },
      { path: 'support', name: 'messages-support', component: MessagesandSupport, meta: { ability: 'send_messages' } },
      { path: 'orders', name: 'order-history', component: OrderHistory, meta: { ability: 'view_own_orders' } },
      { path: 'reviews', name: 'reviews-ratings', component: ReviewsandRatings, meta: { ability: 'write_reviews' } },
      { path: 'wishlist', name: 'wishlist', component: WishList, meta: { ability: 'manage_wishlist' } },
    ]
  },

  // Vendor Dashboard root route named 'VendorDashboard'
  {
    path: '/vendor',
    component: VendorDashboard,
    name: 'VendorDashboard',
    meta: { requiresAuth: true, ability: 'view_vendor_dashboard' },
    children: [
      { path: 'add-product', name: 'add-product', component: AddProduct, meta: { ability: 'add_product' } },
      { path: 'products', name: 'manage-products', component: VendorManageProducts, meta: { ability: 'view_own_products' } },
      { path: 'orders', name: 'manage-order', component: ManageOrder, meta: { ability: 'view_vendor_orders' } },
      { path: 'earnings', name: 'earnings-payout', component: EarningsandPayout, meta: { ability: 'view_earnings' } },
      { path: 'reviews', name: 'vendor-reviews', component: ReviewandRating, meta: { ability: 'view_reviews' } },
      { path: 'store-settings', name: 'store-settings', component: StoreSetttings, meta: { ability: 'edit_store_settings' } },
    ]
  },

  // Admin Dashboard root route named 'AdminDashboard'
  {
    path: '/admin',
    component: AdminDashboard,
    name: 'AdminDashboard',
    meta: { requiresAuth: true, ability: 'view_admin_dashboard' },
    children: [
      { path: 'earnings', name: 'earnings-transactions', component: EarningsandTransactions, meta: { ability: 'manage_earnings' } },
      { path: 'orders', name: 'order-management', component: OrderManagement, meta: { ability: 'manage_orders' } },
      { path: 'products', name: 'product-management', component: ProductManagement, meta: { ability: 'manage_products' } },
      { path: 'reviews', name: 'reviews-reports', component: ReviewsandReports, meta: { ability: 'manage_reviews' } },
      { path: 'settings', name: 'site-settings', component: SiteSettings, meta: { ability: 'manage_site_settings' } },
      { path: 'users', name: 'user-management', component: UserManagement, meta: { ability: 'manage_users' } },
      { path: 'vendors', name: 'vendor-management', component: VendorManagement, meta: { ability: 'manage_vendors' } },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const auth = useAuth()
  const { isAuthenticated, hasAbility } = auth

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return next({ name: 'login' })
  }

  if (to.meta.requiresGuest && isAuthenticated.value) {
    return next({ name: 'home' })
  }

  if (to.meta.ability && !hasAbility(to.meta.ability)) {
    return next({ name: 'home' })
  }

  next()
})

export default router

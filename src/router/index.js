import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import AboutUs from '../views/AboutUs.vue';
import ShopPage from '../views/shop/IndexPage.vue'; // Update this
import CategoryPage from '../views/shop/CategoryPage.vue'; // Update this
import SubcategoryPage from '../views/shop/Sub_Category.vue'; // Update this
import AfroHub from '../views/AfroHub.vue';
import BlogPage from '../views/BlogPage.vue';
import SignUp from '../views/SignUp.vue';
import LoginPage from '../views/LoginPage.vue';
import CartPage from '@/views/CartPage.vue';
import CheckoutPage from '../views/shop/CheckoutPage.vue';
import PaymentPage from '@/views/shop/PaymentPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: AboutUs },
    { path: '/shop', name: 'Shop', component: ShopPage },
    { path: '/shop/:category', name: 'Category', component: CategoryPage, props: true },
    { path: '/shop/:category/:subcategory', name: 'Subcategory', component: SubcategoryPage, props: true },
    { path: '/afrohub', name: 'AfroHub', component: AfroHub },
    { path: '/blog', name: 'Blog', component: BlogPage },
    { path: '/signup', name: 'Signup', component: SignUp },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/cart', name: 'Cart', component: CartPage },
    { path: '/checkout', name: 'Checkout', component: CheckoutPage },
    { path: '/payment', name:  'Payment', component: PaymentPage}
  ],
});

export default router;

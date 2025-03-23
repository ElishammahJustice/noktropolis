<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <!-- Login Card -->
        <v-card class="elevation-12">
          <!-- Card Header -->
          <v-toolbar color="brown-darken-2" dark flat>
            <v-toolbar-title>Welcome to Noktropolis</v-toolbar-title>
          </v-toolbar>

          <!-- Card Content -->
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <!-- Email Input -->
              <v-text-field
                v-model="email"
                label="Email"
                prepend-icon="mdi-email"
                type="email"
                required
                :rules="[rules.required, rules.email]"
                outlined
                class="mb-4"
              ></v-text-field>

              <!-- Password Input -->
              <v-text-field
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                required
                :rules="[rules.required]"
                outlined
                class="mb-4"
              ></v-text-field>

              <!-- Login Button -->
              <v-btn
                class="login-button"
                type="submit"
                color="brown-darken-2"
                block
                large
                :loading="loading"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>

          <!-- Card Footer -->
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <span>Don't have an account?</span>
            <v-btn text color="brown-darken-2" @click="goToSignup">Sign Up</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../router/services/auth.service'

const router = useRouter()
const { login, loading } = useAuth()

// Form fields
const email = ref('')
const password = ref('')

const rules = {
  required: (value) => !!value || 'This field is required.',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid email.'
  },
}

async function handleLogin() {
  if (!email.value || !password.value) {
    console.error('Email and password are required')
    return
  }

  try {
    await login({
      email: email.value,
      password: password.value,
    })
    alert('Login successful! Redirecting...')
    router.push({ name: 'home' }) // Redirect to home page
    // setTimeout(() => {
    //   this.loading = false
    //   alert('We are here So far!!!')
    //   router.push({ name: 'home' }) // Redirect to home page
    // }, 1500)
  } catch (err) {
    console.error('Login failed', err)
  }
}

function goToSignup() {
  router.push({ name: 'Signup' })
}
</script>
<!-- <script>
export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      rules: {
        required: (value) => !!value || "This field is required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid email.";
        },
      },
    };
  },
  mounted() {
    console.log('LoginPage component mounted');
  },
  methods: {
    async handleLogin() {
      if (!this.email || !this.password) {
        alert("Please fill in all required fields.");
        return;
      }

      // Simulate login process
      this.loading = true;

      await

      setTimeout(() => {
        this.loading = false;
        alert("Login successful! Redirecting...");
        this.$router.push({ name: "Home" }); // Redirect to home page
      }, 1500);
    },
    goToSignup() {
      this.$router.push({ name: "Signup" }); // Redirect to signup page
    },
  },
};
</script> -->

<style scoped>
.fill-height {
  min-height: 100vh;
}

.v-card {
  border-radius: 10px;
}

.v-btn--block {
  margin-top: 20px;
}
.login-button {
  background: transparent;
  color: burlywood;
  font-size: 17px;
  text-transform: uppercase;
  font-weight: 600;
  border: none;
  padding: 20px 30px;
  cursor: pointer;
  perspective: 30rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.308);
}

.login-button::before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 10px;
  background: linear-gradient(320deg, rgba(255, 179, 0, 0.678), rgba(128, 70, 0, 0.308));
  z-index: 1;
  transition: background 3s;
}

.login-button:hover::before {
  animation: rotate 1s;
  transition: all 0.5s;
}

@keyframes rotate {
  0% {
    transform: rotateY(180deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}
</style>

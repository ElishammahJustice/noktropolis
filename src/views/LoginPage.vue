<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="brown-darken-2" dark flat>
            <v-toolbar-title>Welcome to Noktropolis</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>

              <v-text-field
                v-model="email"
                label="Email"
                prepend-icon="mdi-email"
                type="email"
                :rules="[rules.required, rules.email]"
                outlined
                class="mb-4"
                :disabled="loading"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPassword = !showPassword"
                :rules="[rules.required]"
                outlined
                class="mb-4"
                :disabled="loading"
              ></v-text-field>

              <v-checkbox v-model="rememberMe" label="Remember Me" color="brown-darken-2"></v-checkbox>

              <v-btn
                type="submit"
                color="brown-darken-2"
                block
                large
                :loading="loading"
                :disabled="loading"
              >
                Login
              </v-btn>

              <v-divider class="my-4"></v-divider>

              <v-btn block outlined color="blue-darken-2" @click="loginWithGoogle">
                <v-icon left>mdi-google</v-icon> Continue with Google
              </v-btn>

              <v-btn block outlined color="blue-darken-4" class="mt-2" @click="loginWithFacebook">
                <v-icon left>mdi-facebook</v-icon> Continue with Facebook
              </v-btn>
            </v-form>
          </v-card-text>

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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../router/services/auth.service.js'

const router = useRouter()
const { login, loading } = useAuth()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)

const rules = {
  required: (value) => !!value || 'This field is required.',
  email: (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'Invalid email.'
  },
}

onMounted(() => {
  const savedEmail = localStorage.getItem('savedEmail')
  if (savedEmail) {
    email.value = savedEmail
    rememberMe.value = true
  }
})

async function handleLogin() {
  if (!email.value || !password.value) {
    errorMessage.value = "Please enter email and password."
    return
  }

  errorMessage.value = ""; // Clear any previous errors

  try {
    // Pass the router instance to the login function
    const response = await login({
      email: email.value,
      password: password.value,
    }, router)

    // Check if we have a valid response
    if (!response || !response.data || !response.data.user) {
      errorMessage.value = "Invalid response from server"
      return;
    }

    // Save extras (token already handled by TokenService)
    const userData = response.data.user;

    // Store role information
    if (userData.role && userData.role.slug) {
      localStorage.setItem('userRole', userData.role.slug);
      console.log('User role stored:', userData.role.slug);
    } else {
      console.warn('No role information in response:', userData);
    }

    if (rememberMe.value) {
      localStorage.setItem('savedEmail', email.value)
    } else {
      localStorage.removeItem('savedEmail')
    }

  } catch (err) {
    console.error('Login error:', err)

    const status = err?.response?.status
    const backendMessage = err?.response?.data?.message
    const fallbackMessage = err?.message || 'Login failed. Please try again.'

    if (status === 401) {
      errorMessage.value = "Invalid email or password."
    } else if (status === 403) {
      errorMessage.value = "Your account is suspended or not approved."
    } else if (backendMessage) {
      errorMessage.value = backendMessage
    } else {
      errorMessage.value = fallbackMessage
    }
  }
}

function loginWithGoogle() {
  console.log("Google Login Clicked!")
}

function loginWithFacebook() {
  console.log("Facebook Login Clicked!")
}

function goToSignup() {
  router.push({ name: 'Signup' })
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
.v-card {
  border-radius: 10px;
}
</style>

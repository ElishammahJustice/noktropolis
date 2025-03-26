<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12">
            <!-- Card Header -->
            <v-toolbar color="brown-darken-2" dark flat>
              <v-toolbar-title>Join Noktropolis</v-toolbar-title>
            </v-toolbar>

            <!-- Card Content -->
            <v-card-text>
              <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>
              <v-alert v-if="successMessage" type="success" dense>{{ successMessage }}</v-alert>

              <v-form @submit.prevent="handleSignup">
                <v-text-field
                  v-model="fullName"
                  label="Full Name"
                  prepend-icon="mdi-account"
                  :rules="[rules.required]"
                  outlined
                  class="mb-4"
                  :disabled="loading"
                ></v-text-field>

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
                  :rules="[rules.required, rules.minLength]"
                  outlined
                  class="mb-4"
                  :disabled="loading"
                ></v-text-field>

                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm Password"
                  prepend-icon="mdi-lock"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append="showPassword = !showPassword"
                  :rules="[rules.required, rules.confirmPassword]"
                  outlined
                  class="mb-4"
                  :disabled="loading"
                ></v-text-field>

                <v-select
                  v-model="role"
                  :items="roles"
                  label="Register As"
                  prepend-icon="mdi-account-group"
                  :rules="[rules.required]"
                  outlined
                  class="mb-4"
                  :disabled="loading"
                ></v-select>

                <v-btn
                  type="submit"
                  color="brown-darken-2"
                  block
                  large
                  :loading="loading"
                  :disabled="loading"
                >
                  Sign Up
                </v-btn>
              </v-form>
            </v-card-text>

            <!-- Card Footer -->
            <v-card-actions class="pa-4">
              <v-spacer></v-spacer>
              <span>Already have an account?</span>
              <v-btn text color="brown-darken-2" @click="goToLogin">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/services/auth.service'

const router = useRouter()
const { register, loading } = useAuth()

// Form fields
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('')
const roles = ['Customer', 'Vendor']

// UI states
const showPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Validation rules
const rules = {
  required: (value) => !!value || 'This field is required.',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email.',
  minLength: (value) => value.length >= 8 || 'Password must be at least 8 characters.',
  confirmPassword: computed(() => (value) =>
    value === password.value || 'Passwords do not match.'
  ),
}

async function handleSignup() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!fullName.value || !email.value || !password.value || !confirmPassword.value || !role.value) {
    errorMessage.value = "Please fill in all required fields."
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match."
    return
  }

  try {
    const response = await register({
      name: fullName.value,
      email: email.value,
      password: password.value,
      role: role.value.toLowerCase(), // Ensuring consistent role value (e.g., 'customer' or 'vendor')
    })

    successMessage.value = "Signup successful! Redirecting to login..."
    setTimeout(() => router.push({ name: 'Login' }), 2000)
  } catch (err) {
    errorMessage.value = err.response?.data?.message || "Signup failed. Please try again."
  }
}

function goToLogin() {
  router.push({ name: 'Login' })
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

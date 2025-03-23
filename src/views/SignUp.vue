<template>
  <v-main>
    <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <!-- Signup Card -->
        <v-card class="elevation-12">
          <!-- Card Header -->
          <v-toolbar color="brown-darken-2" dark flat>
            <v-toolbar-title>Join Noktropolis</v-toolbar-title>
          </v-toolbar>

          <!-- Card Content -->
          <v-card-text>
            <v-form @submit.prevent="handleSignup">
              <!-- Full Name Input -->
              <v-text-field
                v-model="fullName"
                label="Full Name"
                prepend-icon="mdi-account"
                required
                :rules="[rules.required]"
                outlined
                class="mb-4"
              ></v-text-field>

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
                :rules="[rules.required, rules.minLength]"
                outlined
                class="mb-4"
              ></v-text-field>

              <!-- Confirm Password Input -->
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                prepend-icon="mdi-lock"
                type="password"
                required
                :rules="[rules.required, rules.confirmPassword]"
                outlined
                class="mb-4"
              ></v-text-field>

              <!-- Signup Button -->
              <v-btn
                type="submit"
                color="brown-darken-2"
                block
                large
                :loading="loading"
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

<script>
export default {
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      rules: {
        required: (value) => !!value || "This field is required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid email.";
        },
        minLength: (value) =>
          value.length >= 8 || "Password must be at least 8 characters.",
        confirmPassword: (value) =>
          value === this.password || "Passwords do not match.",
      },
    };
  },
  mounted() {
    console.log('SignUp component mounted');
  },
  methods: {

    handleSignup() {
      if (
        !this.fullName ||
        !this.email ||
        !this.password ||
        !this.confirmPassword
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      // Simulate signup process
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        alert("Signup successful! Redirecting to login...");
        this.$router.push({ name: "Login" }); // Redirect to login page
      }, 1500);
    },
    goToLogin() {
      this.$router.push({ name: "Login" }); // Redirect to login page
    },
  },
};
</script>

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
</style>

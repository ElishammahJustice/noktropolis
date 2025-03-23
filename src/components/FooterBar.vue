<template>
  <v-footer class="footer">
    <v-container>
      <v-row>
        <!-- Quick Links -->

        <!-- Social Media -->

        <v-card class="card" @mouseover="hover = true" @mouseleave="hover = false">
    <!-- Background -->
    <div class="background"></div>

    <!-- Logo -->
    <v-card-title class="logo">Connect with <br> us</v-card-title>

    <!-- Social Icons -->
    <div class="box box1" :class="{ 'box-hover': hover }">
      <a href="https://facebook.com/noktropolis" target="_blank">
        <span class="icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="svg">
            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
          </svg>
        </span>
      </a>
    </div>

    <div class="box box2" :class="{ 'box-hover': hover }">
      <a href="https://twitter.com/noktropolis" target="_blank">
        <span class="icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="svg">
            <path d="M22.46 6.012c-.815.37-1.77.62-2.735.733a4.894 4.894 0 0 0 2.108-2.723 9.687 9.687 0 0 1-3.073 1.19 4.823 4.823 0 0 0-8.32 4.402A13.687 13.687 0 0 1 3.39 4.498a4.885 4.885 0 0 0-.653 2.426 4.828 4.828 0 0 0 2.146 4.02 4.825 4.825 0 0 1-2.183-.606v.06a4.83 4.83 0 0 0 3.87 4.735 4.838 4.838 0 0 1-2.178.083 4.836 4.836 0 0 0 4.515 3.352 9.68 9.68 0 0 1-5.988 2.066c-.39 0-.775-.023-1.154-.068a13.665 13.665 0 0 0 7.395 2.17c8.872 0 13.722-7.352 13.722-13.723 0-.21-.004-.418-.012-.624a9.83 9.83 0 0 0 2.407-2.503l-2.385-1.008z"/>
          </svg>
        </span>
      </a>
    </div>

    <div class="box box3" :class="{ 'box-hover': hover }">
      <a href="https://youtube.com/noktropolis" target="_blank">
        <span class="icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="svg">
            <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
          </svg>
        </span>
      </a>
    </div>

    <div class="box box4" :class="{ 'box-hover': hover }">
      <a href="https://instagram.com/noktropolis" target="_blank">
        <span class="icon">
          <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" class="svg">
            <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"/>
          </svg>
        </span>
      </a>
    </div>

    <div class="box box5" :class="{ 'box-hover': hover }">
      <a href="https://tiktok.com/@noktropolis" target="_blank">
        <span class="icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="svg">
            <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
          </svg>
        </span>
      </a>
    </div>
  </v-card>

        <!-- Newsletter -->
        <v-col cols="12" md="3">
          <h3 class="footer-heading">Subscribe to Our Newsletter</h3>
          <v-form @submit.prevent="subscribeNewsletter">
            <v-text-field
              v-model="email"
              label="Enter your email"
              variant="outlined"
              color="accent"
              type="email"
              required
            ></v-text-field>
            <v-btn
              type="submit"
              color="accent"
              block
            >
              Subscribe
            </v-btn>
          </v-form>
        </v-col>

        <!-- Contact Information -->
        <v-col cols="12" md="3">
          <h3 class="footer-heading">Contact Us</h3>
          <div class="contact-info">
            <p><v-icon>mdi-email</v-icon> info@noktropolis.com</p>
            <p><v-icon>mdi-phone</v-icon> +1 (234) 567-890</p>
            <p><v-icon>mdi-map-marker</v-icon> 123 Afro Street, Cultural City</p>
          </div>
        </v-col>
      </v-row>

      <!-- Legal Links -->
      <v-divider class="my-4"></v-divider>
      <v-row class="text-center">
        <v-col cols="12">
          <v-btn
            variant="text"
            to="/terms"
            class="legal-link"
          >
            Terms of Service
          </v-btn>
          <v-btn
            variant="text"
            to="/privacy"
            class="legal-link"
          >
            Privacy Policy
          </v-btn>
          <v-btn
            variant="text"
            to="/returns"
            class="legal-link"
          >
            Returns Policy
          </v-btn>
        </v-col>
      </v-row>

      <!-- Copyright -->
      <v-row class="text-center">
        <v-col cols="12">
          <p class="copyright">
            &copy; {{ new Date().getFullYear() }} Noktropolis. All rights reserved.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');

function subscribeNewsletter() {
  console.log('Subscribed with email:', email.value);
  // Add your newsletter subscription logic here
}

</script>
<script>
 export default {
    data() {
      return {
        hover: false,
      }
    },
  }
</script>
<style scoped>
.footer {
  background-color: #3d2207;
  color: white;
  padding: 40px 0;
}

.footer-heading {
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.25rem;
  margin-bottom: 16px;
  color: #e9c46a;
}

.footer-list .v-list-item {
  padding: 4px 0;
  color: #e9c46a;
}

.footer-list .v-list-item:hover {
  color: #e9c46a;
}



.contact-info p {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.contact-info .v-icon {
  margin-right: 8px;
  color: #e9c46a;
}

.legal-link {
  color: white !important;
}

.legal-link:hover {
  color: #e9c46a !important;
}

.copyright {
  font-size: 0.875rem;
  color: #888;
}

.card {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: all 1s ease-in-out;
    border: 2px solid rgb(255, 255, 255);
  }

  .background {
    position: absolute;
    inset: 0;
    background-color: #5d4037; /* brown-darken-2 */
  }

  .logo {
  position: absolute;
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  transition: all 0.6s ease-in-out;
  font-size: 1.3em;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 3px;
  padding: 16px; /* Added padding to prevent text from touching borders */
}
  .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
  }

  .icon .svg {
    fill: rgba(255, 255, 255, 0.797);
    width: 100%;
    transition: all 0.5s ease-in-out;
  }

  .box {
    position: absolute;
    padding: 10px;
    text-align: right;
    background: rgba(255, 255, 255, 0.389);
    border-top: 2px solid rgb(255, 255, 255);
    border-right: 1px solid white;
    border-radius: 10% 13% 42% 0% / 10% 12% 75% 0%;
    box-shadow: rgba(100, 100, 111, 0.364) -7px 7px 29px 0px;
    transform-origin: bottom left;
    transition: all 1s ease-in-out;
  }

  .box::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }

  .box:hover .svg {
    fill: white;
  }

  /* Box sizes and positions */
  .box1 {
    width: 70%;
    height: 70%;
    bottom: -70%;
    left: -70%;
  }
  .box2 {
    width: 55%;
    height: 55%;
    bottom: -55%;
    left: -55%;
    transition-delay: 0.2s;
  }
  .box3 {
    width: 40%;
    height: 40%;
    bottom: -40%;
    left: -40%;
    transition-delay: 0.4s;
  }
  .box4 {
    width: 25%;
    height: 25%;
    bottom: -25%;
    left: -25%;
    transition-delay: 0.6s;
  }
  .box5 {
    width: 10%;
    height: 10%;
    bottom: -10%;
    left: -10%;
    transition-delay: 0.8s;
  }

  /* Gradient backgrounds */
  .box1::before {
    background: radial-gradient(circle at 30% 107%, #3b5998, #4267b2);
  } /* Facebook */
  .box2::before {
    background: radial-gradient(circle at 30% 107%, #1da1f2, #1da0f2c7);
  } /* Twitter */
  .box3::before {
    background: radial-gradient(circle at 30% 107%, #ff0000, #ff0000c7);
  } /* YouTube */
  .box4::before {
    background: radial-gradient(circle at 30% 107%, #e1306c, #fd1d1d);
  } /* Instagram */
  .box5::before {
    background: radial-gradient(circle at 30% 107%, #69c9d0, #ee1d52);
  } /* TikTok */

  .box:hover::before {
    opacity: 1;
  }
  .box:hover .icon .svg {
    filter: drop-shadow(0 0 5px white);
  }

  .card:hover {
    transform: scale(1.1);
  }

  .card:hover .box {
    bottom: -1px;
    left: -1px;
  }

  .card:hover .logo {
    transform: translate(70px, -52px);
    letter-spacing: 0px;
  }
</style>

<template>
  <v-container class="about-container">
    <v-card class="about-card">
      <v-img src="/images/about-banner.jpg" class="banner-image"></v-img>
      <v-card-title class="title futuristic-text">About Noktropolis</v-card-title>
      <v-card-text class="content">
        <p>
          Welcome to <span class="highlight">Noktropolis</span> – a revolutionary Afrocentric e-commerce platform
          that redefines how the world experiences African culture, craftsmanship, and innovation.
        </p>

        <h2 class="subtitle">Our Story</h2>
        <p>
          Born from a vision to connect Africa’s rich heritage with the global marketplace, Noktropolis is more
          than just an online store. We empower artisans, creators, and brands across the continent by providing a
          space where their unique products shine. From vibrant Ankara fashion to handcrafted jewelry and cutting-edge
          African tech, our platform celebrates authenticity and creativity.
        </p>

        <h2 class="subtitle">Our Mission</h2>
        <p>
          To bridge the gap between Africa and the world by creating a futuristic digital marketplace that promotes
          economic growth, cultural appreciation, and sustainable business practices.
        </p>

        <h2 class="subtitle">Our Vision</h2>
        <p>
          A future where African innovation leads global commerce, where every purchase tells a story, and where Noktropolis
          becomes the heartbeat of Afrocentric shopping worldwide.
        </p>

        <h2 class="subtitle">Why Choose Noktropolis?</h2>
        <ul class="features">
          <li><v-icon color="green">mdi-check-circle</v-icon> 100% Authentic African Products</li>
          <li><v-icon color="green">mdi-check-circle</v-icon> Secure Payments with Multiple Options</li>
          <li><v-icon color="green">mdi-check-circle</v-icon> Global Shipping with Reliable Partners</li>
          <li><v-icon color="green">mdi-check-circle</v-icon> Empowering African Entrepreneurs</li>
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
// No additional script needed for now
</script>

<style scoped>
.about-container {
  padding: 40px;
  text-align: center;
  margin-top: 40px;
}

.about-card {
  background: rgba(0, 0, 0, 0.85);
  color: white;
  border-radius: 15px;
  box-shadow: 0px 0px 20px #5C4033;
  padding: 20px;
  animation: fadeIn 1s;
}

.banner-image {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
}

.futuristic-text {
  color: #5C4033;
  text-shadow: 0px 0px 10px #00ffcc;
}

.highlight {
  color: #ffcc00;
  font-weight: bold;
}

.subtitle {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 20px;
  color: 	#5C4033;
}

.features {
  list-style: none;
  padding: 0;
  font-size: 1.1rem;
  text-align: left;
  margin-top: 15px;
}

.features li {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

<template>
  <v-container class="payment-container">
    <h1 class="text-h4 futuristic-text">Secure Payment</h1>
    <v-card class="payment-card">
      <v-card-title>Choose Payment Method</v-card-title>
      <v-divider></v-divider>

      <v-radio-group v-model="paymentMethod" class="mt-4">
        <v-radio label="Credit/Debit Card" value="card"></v-radio>
        <v-radio label="Mobile Money" value="mobile_money"></v-radio>
        <v-radio label="Crypto (Bitcoin, Ethereum, USDT, Solana)" value="crypto"></v-radio>
      </v-radio-group>

      <v-container v-if="paymentMethod === 'card'">
        <v-text-field label="Card Number" v-model="card.number" type="text" required></v-text-field>
        <v-text-field label="Expiry Date" v-model="card.expiry" type="text" required></v-text-field>
        <v-text-field label="CVV" v-model="card.cvv" type="password" required></v-text-field>
      </v-container>

      <v-container v-if="paymentMethod === 'mobile_money'">
        <v-text-field label="Mobile Money Number" v-model="mobileMoney.number" type="text" required></v-text-field>
        <v-select label="Provider" :items="['MTN', 'Airtel', 'Safaricom']" v-model="mobileMoney.provider" required></v-select>
      </v-container>

      <v-container v-if="paymentMethod === 'crypto'">
        <p>Scan the QR code or send payment to the address below:</p>
        <v-img :src="cryptoQrCode" class="qr-code" contain></v-img>
        <v-select label="Select Cryptocurrency" :items="['Bitcoin', 'Ethereum', 'USDT', 'Solana']" v-model="selectedCrypto" required></v-select>
        <p class="crypto-address">{{ cryptoAddresses[selectedCrypto] }}</p>
        <p class="conversion-rate">Approx: {{ convertedAmount }} {{ selectedCrypto }}</p>
      </v-container>

      <v-btn color="primary" block class="mt-4 futuristic-button" @click="processPayment">Pay Now</v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const paymentMethod = ref('card');
const card = ref({ number: '', expiry: '', cvv: '' });
const mobileMoney = ref({ number: '', provider: '' });
const selectedCrypto = ref('Bitcoin');
const cryptoAddresses = ref({
  Bitcoin: '0x1234ABCD5678EFGH91011IJKL',
  Ethereum: '0x5678MNOP1234QRST5678UVWX',
  USDT: '0x9ABCDEF1234567890GHIJKLMN',
  Solana: 'SOL1234ABCD5678EFGH91011XYZ',
});
const cryptoQrCode = ref('/images/crypto-qr.png');
const convertedAmount = ref('0');

const fetchConversionRate = async () => {
  // Simulate fetching live conversion rate (Replace with API call in real scenario)
  const rates = { Bitcoin: 0.000025, Ethereum: 0.0004, USDT: 1, Solana: 0.08 };
  convertedAmount.value = (100 * rates[selectedCrypto.value]).toFixed(6); // Assume total amount in USD
};

watch(selectedCrypto, fetchConversionRate);

const processPayment = () => {
  alert('Payment processing...');
  router.push('/confirmation');
};
</script>

<style scoped>
.payment-container {
  text-align: center;
  padding: 20px;
}

.futuristic-text {
  color: #5C4033;
  text-shadow: 0px 0px 10px #00ffcc;
}

.payment-card {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px #00ffcc;
  animation: glow 2s infinite alternate;
}

@keyframes glow {
  from { box-shadow: 0px 0px 10px #5C4033; }
  to { box-shadow: 0px 0px 20px #592c17; }
}

.futuristic-button {
  background: linear-gradient(90deg, #5C4033, #592c17);
  color: black;
  font-weight: bold;
  text-transform: uppercase;
  transition: transform 0.3s ease;
}

.futuristic-button:hover {
  transform: scale(1.05);
}

.qr-code {
  width: 150px;
  margin: 10px auto;
  animation: fadeIn 1s;
}

.crypto-address {
  font-family: monospace;
  font-size: 14px;
  color: #00ffcc;
}

.conversion-rate {
  font-size: 16px;
  color: #ffcc00;
  font-weight: bold;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

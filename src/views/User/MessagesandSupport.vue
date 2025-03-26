<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>Messages & Support</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="message in messages" :key="message.id">
            <v-list-item-content>
              <v-list-item-title>{{ message.subject }}</v-list-item-title>
              <v-list-item-subtitle>{{ message.content }}</v-list-item-subtitle>
              <v-list-item-action>
                <v-btn color="brown-darken-2" @click="viewMessage(message)">View</v-btn>
              </v-list-item-action>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn color="brown-darken-2" @click="openSupportDialog">Contact Support</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="supportDialog" max-width="500">
      <v-card>
        <v-card-title>Contact Support</v-card-title>
        <v-card-text>
          <v-text-field v-model="supportSubject" label="Subject" outlined></v-text-field>
          <v-textarea v-model="supportMessage" label="Message" outlined></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="gray" @click="supportDialog = false">Cancel</v-btn>
          <v-btn color="brown-darken-2" @click="sendSupportMessage">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const messages = ref([]);
const supportDialog = ref(false);
const supportSubject = ref('');
const supportMessage = ref('');

const fetchMessages = async () => {
  try {
    const response = await axios.get('/api/user/messages');
    messages.value = response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

const viewMessage = (message) => {
  alert(`Subject: ${message.subject}\nMessage: ${message.content}`);
};

const openSupportDialog = () => {
  supportDialog.value = true;
};

const sendSupportMessage = async () => {
  try {
    await axios.post('/api/user/support', {
      subject: supportSubject.value,
      message: supportMessage.value,
    });
    alert('Support request sent successfully!');
    supportDialog.value = false;
  } catch (error) {
    console.error('Error sending support message:', error);
  }
};

onMounted(fetchMessages);
</script>

<style scoped>
.v-card {
  max-width: 600px;
  margin: auto;
  border-radius: 12px;
}
</style>

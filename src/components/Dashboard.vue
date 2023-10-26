<template>
  <v-container>

    <v-navigation-drawer v-model="Abrirdash">

          
      <v-list-item to="/home" prepend-icon="mdi-home-outline">Home</v-list-item>
      <v-divider></v-divider>
      <v-list-item to="/pessoas" prepend-icon="mdi-account-multiple-outline">Pessoas</v-list-item>
      <v-divider></v-divider>
      <v-list-item to="/portaria" prepend-icon="mdi-shield-account">Portaria</v-list-item>
      <v-divider></v-divider>
      <v-list-item to="/registro" prepend-icon="mdi-account-key-outline">Registro</v-list-item>
    </v-navigation-drawer>
    <v-app-bar>

      <v-app-bar-nav-icon @click="Abrirdash = !Abrirdash"></v-app-bar-nav-icon>
      <template #append>
        <v-btn @click="alteraCor" icon="mdi-brightness-4" class="mr-2"></v-btn>

      </template>
    </v-app-bar>

  </v-container>
</template>
  

<script>
export default {
  name: 'Dashboard',
  data() {
    return {

    }
  },
  methods: {

  }

}



</script>


<script setup>
import { ref } from 'vue'

const Abrirdash = ref(false)



</script>
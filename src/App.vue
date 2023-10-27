<template>
  <v-app :theme="cor">
    <v-main>
        <Dashboard />
        <router-view/>
        
    </v-main>
  </v-app>
</template>

<script>
import Home from './views/Home.vue';
import Dashboard from './components/Dashboard.vue';
import Principal from './components/Principal.vue';
export default {
  
  name: 'App',
  components:{
    Dashboard,
    Principal,
    Home
  },

  data: () => ({
    cor : 'dark'
  }),
}
</script>

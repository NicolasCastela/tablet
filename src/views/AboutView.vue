<template>
  <div class="about">
   <v-container class="d-flex  justify-center">
    <h1>Pessoas</h1> 

   </v-container>
   <v-container>
  <v-row align="center">
    <v-col cols="10">
      <v-text-field v-model="search" label="Buscar" single-line hide-details></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
    </v-col>
  </v-row>

  <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>
</v-container>
    <v-container id="ola" class="d-flex flex-wrap">

      


          <v-card class=" ma-10 " id="cardapi" v-for="user in users" :key="user.id">

            <img id="imgapi"  :src="user.avatar" alt="User Avatar">
            <v-card-title>
              {{ user.first_name }} {{ user.last_name }}
            </v-card-title>
            <v-card-subtitle>
              {{ user.email }}
            </v-card-subtitle>
            <v-btn class="mt-2 ml-auto">Ver mais</v-btn>
          </v-card>
  <v-container>

    <div class="text-center">
      <v-pagination
      v-model="page"
      :length="4"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [] // Inicialize como um array vazio
    };
  },
  mounted() {
    for (let userId = 1; userId <= 8; userId++) {
      fetch(`https://reqres.in/api/users/${userId}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          this.users.push(data.data);
        })
        .catch((err) => {
          console.error('Erro na solicitação GET:', err);
        });
    }
  },

};
</script>

<style scoped>
#cardapi{
width: 200px;

}

#imgapi{
  object-fit: cover;
  width: 100%;
}
</style>
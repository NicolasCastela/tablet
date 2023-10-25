<template>
  <div class="about">
    <v-container class="d-flex  justify-center">




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

    </v-container>
    <v-container id="ola" class="d-flex flex-wrap">
      <v-card v-for="(person, index) in pessoas.personInfos" :key="index" class="ma-10" id="cardapi">
        <!-- <img id="imgapi" alt="User Avatar" :src="person.avatarUrl"> -->
        <v-card-title> NOME: {{ person.name }}</v-card-title>
        <v-card-subtitle>ID: {{ person.id }}</v-card-subtitle>
        <v-btn @click="mostrarFaces(person.id)" class="mt-2 ml-auto">Ver mais</v-btn>
      </v-card>
    </v-container>

    <div class="text-center">
      <v-pagination v-model="page" :length="4" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      page: 1,
      pessoas: {
        pageInfo: {},
        personInfos: [],
        faces: []
      }
    }
  },
  methods: {
  mostrarFaces(personId) {
    const pass = '12345678';

    fetch(`http://192.168.15.34:8090/face/find?pass=${pass}&personId=${personId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => response.json())
      .then(data => {
       
        const pessoa = this.pessoas.personInfos.find(p => p.id === personId);


        if (pessoa) {
          pessoa.faces = data.data;
          console.log(pessoa.faces);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar faces:', error);
      });
  }
},

  mounted() {

    fetch('http://192.168.15.34:8090/person/findByPage?pass=12345678&personId=-1&length=100&index=0  ', {
      method: 'GET'
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        this.pessoas = data.data
        console.log(data)
      })
  },

};
</script>

<style scoped>
#cardapi {
  width: 200px;

}

#imgapi {
  object-fit: cover;
  width: 100%;
}
</style>
<template>
  <v-container>
    <h1 class="text-center">Moradores</h1>

    <v-spacer class="mt-10"></v-spacer>
    <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar Moradores cadastrados" single-line
      hide-details></v-text-field>
    <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>

    <div v-for="(person, index) in pessoas.data.personInfos" :key="index">
      <v-card class="mx-auto mt-5" max-width="344">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" cover></v-img> 
        <v-card-title>
          Nome: {{ person.name }}
        </v-card-title>
        <v-card-subtitle>
          ID: {{ person.id }}
        </v-card-subtitle>
      </v-card>
    </div>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      personImgList: [],
      pessoas: {}

    }
  },
  // methods: {
  //   mostrarFaces() {
  //     const pass = '12345678';
  //     const personId = '1';
  //     fetch(`http://192.168.15.34:8090/face/find?pass=${pass}&personId=${personId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         // const imageList = data.map((item) => item.path)
  //         // const imageList = data
  //         this.personImgList = data
  //         // console.log(imageList)


  //         // if (pessoa) {
  //         //   pessoa.faces = data.data;
  //         //   console.log(pessoa.faces);
  //         // }
  //       })
  //       .catch(error => {
  //         console.error('Erro ao buscar faces:', error);
  //       });
  //   }
  // },

  mounted() {
    
    fetch('http://192.168.15.34:8090/person/findByPage?personId=-1&length=-1&pass=12345678&index=0  ', {
      method: 'GET'
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        this.pessoas = data
                console.log('console pessoas', data)
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
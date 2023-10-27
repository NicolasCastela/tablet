<template>
  <v-container>
    <h1 class="text-center">Moradores</h1>

    <v-spacer class="mt-10"></v-spacer>
    <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar Moradores cadastrados" single-line
      hide-details></v-text-field>
    <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>

    <div v-for="(person, index) in personList" :key="index">
      <v-card class="mx-auto mt-5" max-width="344">
        <v-img :src="selectImageForPerson(person.id)" height="200px" cover></v-img>
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
      personList:[]

    }
  },
  methods: {
    findProfilePicture(personId) {
      console.log(personId)
      const pass = '12345678';
      fetch(`http://192.168.15.34:8090/face/find?pass=${pass}&personId=${personId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
        .then((response) => response.json())
        .then((respostaJson) => {
          
          console.log(respostaJson.data[0]);

          const firtPictureForThisPerson = respostaJson.data[0];

          const personPicture = {
            id: firtPictureForThisPerson.personId,
            // imageUrl: firtPictureForThisPerson.path,
            imageUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          };

          this.personImgList.push(personPicture);
        })
        .catch((error) => {
          console.error("Erro ao buscar faces:", error);
        });
    },
    selectImageForPerson(personId) {
      console.log(personId);
      // Pegar imagem correspondente do This.personImgList
    },
  },

  mounted() {

    fetch('http://192.168.15.34:8090/person/findByPage?personId=-1&length=-1&pass=12345678&index=0  ', {
      method: 'GET'
    })
      .then((resposta) => resposta.json())
      .then((respostaJson) => {
        const findedPersons = respostaJson.data.personInfos;

        this.personList = findedPersons;

        for (const person of findedPersons) {
          const personId = person.id;
          this.findProfilePicture(personId);
        }
      })
      
  }

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
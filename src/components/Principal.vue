<template>


  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          FAZER
        </th>
        <th class="text-left">
          CHECK
        </th>
        <th class="text-center">
          OBS
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td> Cadastro de condôminos com facial</td>
        <td class="text-green">OK</td>
        <td>Imagens sendo cadastrada via base64</td>
      </tr>
      <tr>
        <td>Registro de entrada e saída de condôminos </td>
        <td class="text-orange">Pendente</td>
        <td>Problema pois não aparece as imagens, consumindo api ele não da a opção de puxar img</td>
      </tr>
      <tr>
        <td>Manutenção dos cadastros </td>
        <td class="text-orange">Pendente</td>
        <td>vou implementar a opção de Delete e Update.</td>
      </tr>
    </tbody>
  </v-table>












  <!-- <v-container> -->
          
    <!-- <div >
      <ul v-for="(pokemon, index) in data" :key="index">
        <li class="mb-5">
          {{ pokemon.name }}
          <v-btn @click="chamandoURL(pokemon.url)" class="ml-10">Ver mais</v-btn>
          <h1>{{ infoPokemon.id }}</h1>
        
        </li>
      </ul>
      
    </div> -->
  <!-- </v-container> -->
</template>

<script>  
export default {
  name: "Principal",
  data() {
    return {
      data:{},
      infoPokemon:{}
    }
  },

  mounted() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0')
    .then((resposta) => resposta.json())
    .then((data) => {
      console.log(data)
      this.data = data.results})
},
methods:{
  chamandoURL(url){
    fetch(url)
    .then((res) => res.json())
    .then((data) =>{ 
      this.infoPokemon = data
      console.log(data)})

      }


}
}

</script>

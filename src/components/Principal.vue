<template>
 <div v-for="(poke, index) in pokes " :key="index">
  <h1>{{ poke.name}}</h1>
 </div>
</template>

<script>
export default {
  name: "Principal",
  data() {
    return {
      pokes:{
        results:[]
      }
    }
  },

  mounted() {
    

fetch('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0',{
  method: 'GET'
})
.then((resposta) => resposta.json())
.then((data) => console.log(data))

fetch('https://pokeapi.co/api/v2/pokemon/')
.then((res) => res.json())
.then((data) => this.pokes = data)

  }
}
</script>

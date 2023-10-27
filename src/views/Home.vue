<template>
  <div class="d-flex justify-center">
    <!-- <img class="w-25 rotating-svg" src="../../public/img/corinthians-50.svg"> -->
  </div>
    <div class="d-flex justify-center mt-10">
      <!-- <Principal/> -->
      <h1>Ola</h1>
    </div>
</template>

<script>
import Principal from '@/components/Principal.vue';
export default {
  name: 'Home',
  components:{
    Principal
  },
  methods:{

  },
  mounted(){
    const pass='12345678'
    const personId = '1'
    const index = '-1'
    const length = '-1'
    const startTime = '0'
    const endTime = '0'
    fetch('http://192.168.15.34:8090/findRecords',{
      method:'POST',
      headers:{
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
  }
};
</script>

<style scoped>
.rotating-svg {
  animation: rotate 0.1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

h1 {
  font-size: 24px;
  color: #000;
}
</style>

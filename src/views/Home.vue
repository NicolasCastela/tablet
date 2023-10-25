<template>
  <div class="d-flex justify-center">
    <img class="w-25 rotating-svg" src="../../public/img/corinthians-50.svg">
  </div>
  <div class="d-flex justify-center mt-10">
    <h1>Bem-Vindo</h1>

</div>

</template>

<script>
import Principal from '@/components/Principal.vue';
export default {
  name: 'Home',
  components:{
    Principal
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

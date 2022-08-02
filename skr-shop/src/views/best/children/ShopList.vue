<template>
  <div class="container">
    <ContaiOne />
    <ContaTwo />
    <ContaThree />
   
   
  </div>
</template>

<script>
import ContaiOne from './children/ContaiOne.vue'
import ContaTwo from './children/ContaTwo.vue'
import ContaThree from './children/ContaThree.vue'
export default {
  name: "Container",
  components:{ContaiOne,ContaTwo,ContaThree}
};
</script>

<style lang="scss" scoped>



</style>
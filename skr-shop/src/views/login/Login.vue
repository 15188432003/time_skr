<template>
  <div class="login">
    <h1>登录</h1>
    <div class="content">
      <LoginTest />
      <ThreePart />
      <ResInto />
    </div>
  </div>
</template>

<script>
import LoginTest from './children/LoginTest.vue'
import ResInto from './children/ResInto.vue'
import ThreePart from './children/ThreePart.vue'

export default {
    name:'Login',
    components:{LoginTest,ResInto,ThreePart},
    data() {
        return {
            
        }
    },
    
}
</script>

<style lang="scss" scoped>
  .login {
  width: 100%;
  min-width: 1240px;
  & > h1 {
    width: 1240px;
    margin: 0 auto;
    padding-top: 81px;
    font-size: 44px;
    color: #000;
    line-height: 100%;
    font-weight: 400;
    padding-bottom: 60px;
  }
  .content{
    width: 1240px;
    margin: 0 auto;
    border-top: 2px solid black;
    padding-top:60px;

  }
}
</style>
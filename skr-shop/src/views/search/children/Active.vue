<template>
  <div class="active">
    <h1>目前没有活动</h1>
  </div>
</template>

<script>
export default {
    name:'Active',
    
}
</script>

<style lang="scss" scoped>
  .active{
        display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom:   100px;
    h1{
      margin-top: 8vh;
      font-weight: 500;
    }

  }
</style>
<template>
  <div class="detailImg">
    <ul>
      <li v-for="(item, index) in detailImgs" :key="index">
        <img :src="item.normal" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["detailImgs"],
};
</script>

<style lang="scss" scoped>
img {
  width: 50%;
  height: 50%;
}
</style>
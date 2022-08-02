<template>
  <div class="Review">
    <h4>产品满意度</h4>
    <p>这是购买者对产品的评价</p>
    <stars style="{float='left'}" />
    <div class="lastScore">
      <span>{{ score }}</span>
      <span>/5</span>
    </div>
  </div>
</template>

<script>
import stars from "./Star.vue";
export default {
  components: { stars },
  data() {
    return {
      score: 0,
    };
  },
  created() {
    this.$bus.$on("aaaaaa", (data) => {
      this.score = data;
    });
  },
};
</script>

<style lang="scss" scoped>
.Review {
  height: 520px;
  display: block;
  h4 {
    text-align: left;
    font-size: 18px;
    margin: 0 0 8px;
  }
  p {
    text-align: left;
  }
  .lastScore {
    float: left;
    margin-left: 10px;
    font-size: 32px;
    text-align: left;
  }
}
</style>
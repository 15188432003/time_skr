<template>
  <div class="star">
    <div class="num">
      <ul>
        <li v-for="item in numbers" :key="item">
          <svg-icon
            icon-class="fullStar"
            className="icon"
            height="20px"
            width="20px"
          ></svg-icon>
        </li>
        <li v-show="halfstar">
          <svg-icon
            icon-class="halfStar"
            className="icon"
            height="20px"
            width="20px"
          ></svg-icon>
        </li>
      </ul>
    </div>
    <div class="nums">
      <ul>
        <li v-for="items in nullStar" :key="items">
          <svg-icon
            icon-class="nullStar"
            className="icon"
            height="20px"
            width="20px"
          ></svg-icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: 0,
      halfstar: false,
      nullStar: 0,
    };
  },
  methods: {
    linee() {
      this.numbers = Number((Math.random() * 4 + 1).toFixed(1));
      this.$bus.$emit("aaaaaa", this.numbers);
      let res = this.numbers.toString().split(".");
      if (!(res[1] > 5)) {
        this.halfstar = true;
        this.numbers = Math.floor(this.numbers);
        this.nullStar = 4 - Math.floor(this.numbers);
      } else {
        this.numbers = Math.floor(this.numbers) + 1;
        this.nullStar = 5 - this.numbers;
      }
    },
  },
  created() {
    this.linee();
  },
};
</script>

<style lang="scss" scoped>
.star {
  width: 160px;
  height: 35px;
  line-height: 50px;
  float: left;
}
li {
  width: 30px;
  height: 30px;
  float: left;
}
</style>
<template>
  <!-- 卡片 -->

  <div class="AnCard" >
      <el-card
        hoverable
        :body-style="{padding:0}"
        class="card"
        v-for="(item, index) in AnCard_list.slice(0, 4)"
        :key="index"
      >
        <img  :src="item.img" />
        <div class="eltitle" :title="item.title">
          <span>{{ item.title }}</span>
        </div>
        <span class="description">www.stride.fun</span>
      </el-card>

  </div>
</template>
<script>
export default {
  name: "AnCard",
  props: {
    AnCard_list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    cardclick(item,id) {
      console.log(item,id);
      this.$router.push(`/details/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.AnCard {
  width: 100%;
  padding: 0 10px;
  display: flex;
  text-align: center;
  .card {
    width: calc((100% / 4) - 8px);
    margin: 4px;
        cursor: pointer;

  }
}
    img {
      width: 100%;
    }
.eltitle {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
  font-family: "ProximaNova-Bold";
  font-size: 20px;
}
.description {
  color: #666;
  font-family: "yg740";
  font-size: 12px;
  line-height: 1.5;
  display: block;
  padding: 10px 0 10px;
  word-break: keep-all;
}
</style>
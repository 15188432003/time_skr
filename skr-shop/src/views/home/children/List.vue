<template>
  <!-- 卡片 -->
  <div class="List">
    <el-card
      hoverable
              :body-style="{padding:0}"
      class="card"
      v-for="(item, index) in list_list.slice(0, 8)"
      :key="index"
    >
      <img :src="item.img" />
      <div class="eltitle" :title="item.title">
        <span>{{ item.title }}</span>
      </div>
      <span class="description">www.stride.fun</span>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "List",
  props: {
    list_list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    cardclick(id) {
      this.$router.push(`/details/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.List {
  width: 100%;
  display: flex;
  text-align: center;
  .card {
    margin: 4px;
    width: calc((100% / 8) - 8px);
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
  font-size: 12px;
  line-height: 1.5;
  display: block;
  padding: 10px 0 10px;
}
</style>
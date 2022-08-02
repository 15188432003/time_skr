<template>
  <div class="exclusiveContenta">
    <div class="shopList">
      <div class="shopItem" v-for="(item, index) in shopImgList" :key="index" @click="detail(item.id)">
        <img :src="item.img" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { getImg } from "@/api/gitImg";
export default {
  name: "ExclusiveContenta",
  data() {
    return {
      shopImgList: [],
    };
  },
  methods: {
    getImg() {
      // 轮播图6-9
      getImg({ parent_name: "服饰", start: 6, end: 9 }).then((data) => {
        this.shopImgList = data;
      });
    },
    detail(id){
      this.$router.push(`/details/${id}`)
    }
  },
  created() {
    this.getImg();
  },
};
</script>

<style lang="scss" scoped>
.exclusiveContenta {
  min-width: 1240px;
  margin-top: 5%;
  position: relative;
  display: flex;
  .shopList {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .shopItem {
      padding: 0 10px;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
  }
}
</style>
<template>
  <div class="exclusiveContentb">
    <Title><p>EDITION</p></Title>
    <ul>
      <li v-for="(item, index) in shopImgList" :key="index" @click="detail(item.id)">
        <img :src="item.img" alt="" />
        <p class="title">{{ item.title }}</p>
        <p class="tit_">www.stride.fun</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getImg } from "@/api/gitImg";
import Title from "@/components/content/title/Title.vue";
export default {
  name: "ExclusiveContentb",
  components: { Title },
  data() {
    return {
      shopImgList: [],
    };
  },
  methods: {
    getImg() {
      // 轮播图6-9
      getImg({ parent_name: "服饰", start: 16, end: 18 }).then((data) => {
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
.exclusiveContentb {
  ul {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    li {
      cursor: pointer;
      width: calc(100% / 3 - 2%);
      img {
        width: 100%;
      }
      .title {
        text-align: center;
        margin: 40px 0 22px 0;
        font-size: 20px;
        color: #333;
        line-height: normal;
      }
      .tit_ {
        font-size: 12px;
        color: #666;
        line-height: 17px;
        text-align: center;
      }
    }
  }
}
</style>
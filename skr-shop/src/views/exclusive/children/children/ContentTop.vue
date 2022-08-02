<template>
  <div class="contentTop">
    <div class="mySwiper">
      <MySwiper :TopSwiper="TopSwiper" />
    </div>
    <div class="shopList">
      <ul>
        <div class="shopItem" v-for="(item, index) in shopImgList" :key="index" @click="detail(item.id)">
          <div class="img">
            <img :src="item.img" alt="" />
          </div>
          <div class="title">
            <div class="tit">{{ item.title }}</div>
            <div class="tit_">www.stride.fun</div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getImg } from "@/api/gitImg";
import MySwiper from "./MySwiper.vue";
export default {
  name: "ContentTop",
  components: { MySwiper },
  data() {
    return {
      TopSwiper: [],
      shopImgList: [],
    };
  },
  methods: {
    getImg() {
      // 轮播图6-9
      getImg({ parent_name: "服饰", start: 6, end: 9 }).then((data) => {
        this.TopSwiper = data;
        // console.log(this.TopSwiper);
      });
      getImg({ parent_name: "服饰", start: 10, end: 15 }).then((data) => {
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
.contentTop {
  width: 100%;
  position: relative;
  overflow: hidden;
  .mySwiper {
    width: 65%;
    float: left;
  }
  .shopList {
    width: 33.5%;
    float: right;
    ul {
      text-align: left;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .shopItem {
        width: 46%;
        margin: 0 2% 2%;
        border: 1px solid #e8e8e8;
        &:hover {
          border-color: rgba(0, 0, 0, 0.09);
          box-shadow: 0 2px 8px rgb(0 0 0 / 9%);
        }
        .img {
          width: 100%;
          img {
            width: 100%;
            border-radius: 2px 2px 0 0;
          }
        }
        .title {
          padding: 24px;
          zoom: 1;
          .tit {
            color: rgba(0, 0, 0, 0.85);
            font-weight: 500;
            font-size: 16px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-bottom: 8px;
          }
          .tit_ {
            color: rgba(0, 0, 0, 0.45);
          }
        }
      }
    }
  }
}
</style>
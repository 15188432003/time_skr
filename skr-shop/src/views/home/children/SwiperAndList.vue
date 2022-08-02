<template>
  <div class="SwiperAndList">
    <div class="swiper">
      <swiper ref="SwiperAndList" :option="SwiperAndList">
        <swiper-slide
          v-for="(item, index) in SwiperAndList_list.slice(8, 16)"
          :key="index"
        >
          <img :src="item.img" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="AnCard" >
      <el-card
        hoverable
        :body-style="{padding:0}"
        class="card"
        v-for="(item, index) in SwiperAndList_list.slice(8, 16)"
        :key="index"
       
      >
        <img  :src="item.img" />
        <div class="eltitle" :title="item.title">
          <span>{{ item.title }}</span>
        </div>
        <span class="description">www.stride.fun</span>
      </el-card>
  </div>
  </div>
</template>

<script>
export default {
  name: "SwiperAndList",
  data() {
    return {
      SwiperAndList: {
        slidesPerView: 1,
        loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        autoplay:false,
        autoplay: {
          delay: 2000,
        },
      },
    };
  },
  props: {
    SwiperAndList_list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 40%;
  float: left;
}
img {
  width: 100%;
}
.card{
  float: left;
}
.AnCard {
  width: 60%;
  padding: 0 10px;
  float: left;
  text-align: center;
  .card {
    width: calc((100% / 4) - 8px);
    margin: 4px;
        cursor: pointer;
  }
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
<template>
  <div class="SwiperList">
    <swiper :options="SwiperList">
      <swiper-slide
        v-for="(item, index) in SwiperList_list.slice(20, 28)"
        :key="index"
      >
        <el-card
        :body-style="{padding:0}"
         hoverable
          class="card">
          <img :src="item.img" />

          <div class="eltitle" :title="item.title">
            <span>{{ item.title }}</span>
          </div>
          <span class="description">www.stride.fun</span>
        </el-card>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev" slot="button-prev"></div>
    　　
    <div class="swiper-button-next" slot="button-next"></div>
  </div>
</template>

<script>
export default {
  name: "SwiperList",
  data() {
    return {
      SwiperList: {
        slidesPerView: 4,
        spaceBetween: 60,
        centeredSlides: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
          stopOnLastSlide: true,
        },
        pagination: {
          el: ".SwiperHreader .swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".SwiperList .swiper-button-next",
          prevEl: ".SwiperList .swiper-button-prev",
        },
      },
    };
  },
  props: {
    SwiperList_list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.SwiperList {
  position: relative;
  width: 80%;
  margin: 0 auto;
}
.swiper-container {
  padding: 70px 0;
}
.card{
          cursor: pointer;
}
img {
  width: 100%;
}
.swiper-slide-active {
  transform: scale(1.2) !important;
}
.swiper-button-prev {
  left: -8%;
}
.description {
  color: #666;
  font-family: "yg740";
  font-size: 12px;
  line-height: 1.5;
  word-break: keep-all;
}
.swiper-button-next {
  right: -8%;
}
.swiper-button-prev,
.swiper-button-next {
  --swiper-theme-color: #ccc; /* 设置Swiper风格 */
  z-index: 1;
}
</style>
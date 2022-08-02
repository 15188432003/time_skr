<template>
  <div class="SwiperCarousel">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide
      class='swiperitem'
        v-for="(item, index) in SwiperCarousel_list.slice(20, 28)"
        :key="index"
      >
        <el-card 
                :body-style="{padding:0}"
        hoverable class="card">
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
  name: "SwiperCarousel",
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        },
        navigation: {
          nextEl: ".SwiperCarousel .swiper-button-next",
          prevEl: ".SwiperCarousel .swiper-button-prev",
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  props: {
    SwiperCarousel_list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    swiperClick(id) {
      this.$router.push(`/details/${id}`);
    },
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false);
  },
};
</script>

<style lang="scss" scoped>
.SwiperCarousel {
  width: 80%;
  margin: 0 auto;
  position: relative;
}
.swiper-button-prev {
  left: -8%;
}
.eltitle{
    overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.swiper-button-next {
  right: -8%;
}
.swiper-button-prev,
.swiper-button-next {
  --swiper-theme-color: #ccc; /* 设置Swiper风格 */
  z-index: 1;
}
.boxCard {
  width: 100%;
  padding: 0 10px;
  display: flex;
  text-align: center;
}
.description {
  color: #666;
  font-family: "yg740";
  font-size: 12px;
  line-height: 1.5;
  word-break: keep-all;
}
.swiperitem{
          cursor: pointer;
}
img {
  width: 100%;
}
.el-card-meta-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
  font-family: "ProximaNova-Bold";
  font-size: 20px;
}
</style>
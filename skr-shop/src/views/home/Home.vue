<template>
  <div class="home">
    <!-- 头部轮播 -->
    <SwiperHreaderTwo :TopSwiper="TopSwiper" />
    <Title><p>Basketball shoes</p></Title>
    <AnCard :AnCard_list="AnCard_list" />
    <!-- <StickyBanner /> -->
    <Title><p>Skate shoes</p></Title>
    <SwiperList
      :SwiperList_list="SwiperList_list"
      v-if="SwiperList_list.length > 0"
    />
    <Title><p>Running shoes</p></Title>
    <SwiperCarousel
      :SwiperCarousel_list="SwiperCarousel_list"
      v-if="SwiperCarousel_list"
    />
    <Title><p>Casual shoes</p></Title>
  <SwiperColors />
    <!-- 女鞋卡片 -->
    <List :list_list="list_list" />
    <Title><p>Recommend+</p></Title>
    <SwiperAndList :SwiperAndList_list="SwiperAndList_list" />
    <SwiperHreaderTwo :TopSwiper="TopSwiper" />
    <!-- 分类卡片 -->
    <TypeList :TypeList_list="TypeList_list.slice(5, 12)" />
    <TypeListshoes :TypeList_list="TypeListshoes_list.slice(5, 12)" />
    <TypeListacc :TypeList_list="TypeListacc_list.slice(0, 7)" />
    <TypeListchren :TypeList_list="TypeListchren_list.slice(0, 7)" />

    <Title><p>Knapsack</p></Title>
    <SwiperTab :SwiperTab_list="SwiperTab_list" />
    <Title><p>Wdna Style</p></Title>
    <WdnaStyle
      :WdnaStylewoman_list="WdnaStylewoman_list"
      :WdnaStylejacket_list="WdnaStylejacket_list"
      :WdnaStylecoat_list="WdnaStylecoat_list"
      :WdnaStyleshorts_list="WdnaStyleshorts_list"
      :WdnaStylevest_list="WdnaStylevest_list"
    />
        <Footer />
  </div>
</template>

<script>
import SwiperColors from './children/SwiperColors.vue'
import Title from "../../components/common/title.vue";
import SwiperHreaderTwo from "./children/SwiperHreaderTwo.vue";
import AnCard from "./children/AnCard.vue";
import SwiperList from "./children/SwiperList.vue";
import SwiperCarousel from "./children/SwiperCarousel.vue";
import List from "./children/List.vue";
import SwiperAndList from "./children/SwiperAndList.vue";
import TypeList from "./children/TypeList.vue";
import TypeListacc from "./children/TypeListacc.vue";
import TypeListchren from "./children/TypeListchren.vue";
import TypeListshoes from "./children/TypeListshoes.vue";
import WdnaStyle from "./children/WdnaStyle.vue";
import SwiperTab from "./children/SwiperTab.vue"
import Footer from "./children/Footer.vue";
import { getSpu } from "../../api/home";
import { getTypeOTwoList, getTypeOneList } from "../../api/home";

export default {
  name: "Home",
  data() {
    return {
      TopSwiper: [],
      AnCard_list: [],
      SwiperList_list: [],
      SwiperCarousel_list: [],
      list_list: [],
      SwiperAndList_list: [],
      TypeList_list: [],
      TypeListshoes_list: [],
      TypeListacc_list: [],
      TypeListchren_list: [],
      WdnaStylewoman_list: [],
      SwiperTab_list:[],
      WdnaStylejacket_list: [],
      WdnaStylecoat_list: [],
      WdnaStyleshorts_list: [],
      WdnaStylevest_list: [],
    };
  },
  components: {
    SwiperHreaderTwo,
    Title,
    AnCard,
    SwiperList,
    SwiperCarousel,
    SwiperColors,
    List,
    SwiperAndList,
    TypeList,
    TypeListshoes,
    TypeListacc,
    TypeListchren,
    SwiperTab,
    WdnaStyle,
    Footer,
  },
  methods: {
    getSpu_init() {
      getSpu("休闲上衣").then((res) => {
        if (res.code != 200) return;
        this.TopSwiper = res.res;
        // console.log(this.TopSwiper);
      });
    },
    AnCard_init() {
      getTypeOTwoList("篮球鞋").then((res) => {
        if (res.code != 200) return;
        this.AnCard_list = res.data;
      });
    },
    SwiperList_init() {
      getTypeOTwoList("板鞋").then((res) => {
        if (res.code != 200) return;
        this.SwiperList_list = res.data;
      });
    },
    SwiperCarousel_init() {
      getTypeOTwoList("跑鞋").then((res) => {
        if (res.code != 200) return;
        this.SwiperCarousel_list = res.data;
      });
    },
    list_init() {
      getTypeOTwoList("休闲鞋").then((res) => {
        if (res.code != 200) return;
        // console.log(res.data);
        this.list_list = res.data;
      });
    },
    SwiperAndList_init() {
      getTypeOTwoList("篮球鞋").then((res) => {
        if (res.code != 200) return;
        // console.log(res.data);
        this.SwiperAndList_list = res.data; 
      });
    },
    TypeList_init() {
      getTypeOneList("服饰").then((res) => {
        if (res.code != 200) return;
        // console.log(res.res);
        this.TypeList_list = res.res;
      });
    },
    TypeListshoes_init() {
      getTypeOneList("鞋类").then((res) => {
        if (res.code != 200) return;
        // console.log(res.res);
        this.TypeListshoes_list = res.res;
      });
    },
    TypeListacc_init() {
      getTypeOneList("配件").then((res) => {
        if (res.code != 200) return;
        // console.log(res.res);
        this.TypeListacc_list = res.res;
      });
    },
    TypeListchren_init() {
      getTypeOneList("儿童专区").then((res) => {
        if (res.code != 200) return;
        // console.log(res.res);
        this.TypeListchren_list = res.res;
      });
    },
        SwiperTab_init(){
       getTypeOneList("配件").then((res) => {
        if (res.code != 200) return;
        // console.log(res.res);
        this.SwiperTab_list = res.res;
      });
    },
        WdnaStylewoman_init() {
      getTypeOTwoList("连帽卫衣").then((res) => {
        if (res.code != 200) return;
        // console.log(res.data);
        this.WdnaStylewoman_list = res.data;
      });
    },
        WdnaStylejacket_init() {
      getTypeOTwoList("单茄克").then((res) => {
        if (res.code != 200) return;
        // console.log(res.data);
        this.WdnaStylejacket_list = res.data;
      });
    },
        WdnaStylecoat_init() {
      getTypeOTwoList("单风衣").then((res) => {
        if (res.code != 200) return;
        // console.log(res.data);
        this.WdnaStylecoat_list = res.data;
      });
    },
        WdnaStyleshorts_init() {
      getTypeOTwoList("针织短裤").then((res) => {
        if (res.code != 200) return;
        // console.log(res.data);
        this.WdnaStyleshorts_list = res.data;
      });
    },
        WdnaStylevest_init() {
      getTypeOTwoList("运动背心").then((res) => {
        if (res.code != 200) return;
        // console.log(res.data);
        this.WdnaStylevest_list = res.data;
      });
    },
  },
  created() {
    this.getSpu_init();
    this.AnCard_init();
    this.SwiperList_init();
    this.SwiperCarousel_init();
    this.list_init();
    this.SwiperAndList_init();
    this.TypeList_init();
    this.TypeListshoes_init();
    this.TypeListacc_init();
    this.TypeListchren_init();
    this.WdnaStylewoman_init();
    this.SwiperTab_init();
    this.WdnaStylejacket_init();
    this.WdnaStylecoat_init();
    this.WdnaStyleshorts_init();
    this.WdnaStylevest_init();
  },
};
</script>

<style lang="scss" scoped>
.margin {
  margin-top: 20px;
}
</style>
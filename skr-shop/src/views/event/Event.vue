<template>
  <div class="event">
    <top-title><p>EVENT</p></top-title>
    <carousel />
    <cet-nav />
    <hot-key-word />
    <tab-btn @listBtn="getChild" />
    <thumnail :list="msg" />
  </div>
</template>

<script>
import TopTitle from "@/components/common/title.vue";
import Carousel from "./children/Carousel";
import CetNav from "./children/CetNav";
import HotKeyWord from "./children/HotKeyWord";
import TabBtn from "./children/TabBtn";
import Thumnail from "./children/Thumnail";
export default {
  name: 'Event',
  components: {
    TopTitle,
    Carousel,
    CetNav,
    HotKeyWord,
    TabBtn,
    Thumnail,
  },
  data() {
    return {
      msg: "All",
    };
  },
  methods: {
    getChild(val) {
      // console.log("val",val);
      this.msg = val;
    },
  }
}
</script>

<style lang="scss" scoped>
.event{
  width: 97%;
  margin: auto;
}
</style>
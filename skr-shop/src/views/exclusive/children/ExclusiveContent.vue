<template>
  <div class="exclusiveContent">
    <ContentTop />
    <ContentMain />
    <ContentBottom :shopImgList="shopImgList"/>
  </div>
</template>

<script>
import ContentTop from "./children/ContentTop.vue";
import ContentMain from "./children/ContentMain.vue";
import ContentBottom from "./children/ContentBottom.vue";
import { getImg } from "@/api/gitImg";
export default {
  name: "ExclusiveContent",
  components: { ContentTop, ContentMain, ContentBottom },
  data() {
    return {
      shopImgList:[]
    };
  },
  methods: {
    getImg() {
      getImg({ parent_name: "服饰", start: 10, end: 15 }).then((data) => {
        if(data.code==200) this.shopImgList = data
      }).catch((data)=>{
        return false
      });
    },
  },
  created() {
    this.getImg();
  },
};
</script>

<style>
</style>
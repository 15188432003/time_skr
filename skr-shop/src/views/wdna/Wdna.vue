<template>
  <div class="wdna_main">
    <WdnaTop :list_list="list_list" v-if="list_list" />
    <!-- <WdnaOn/>
      <WdnaContainer/> -->
  </div>
</template>

<script>
import WdnaTop from "./children/WdnaTop.vue";
import { getTypeOTwoList } from "../../api/home";
export default {
  data() {
    return {
      list_list: [],
    };
  },
  created() {
    this.list_init();
  },
  methods: {
    list_init() {
      getTypeOTwoList("休闲鞋").then((res) => {
        if (res.code != 200) return;
        this.list_list = res.data;
      });
    },
  },
  components: { WdnaTop },
};
</script>
<style lang="scss" scoped>
.wdna_main {
  padding-top:1%;
}
</style>
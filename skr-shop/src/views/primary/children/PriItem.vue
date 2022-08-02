<template>
  <div class="priItem">
    <Aslide :hostList="hostList" />
    <div class="primaryList">
      <PriItemSort :TypeOneLength="TypeOneLength" />
      <ShopList :pageList="pageList" :pageSize="pageSize" :page="page" />
      <div class="page">
        <el-pagination
          layout="prev, pager, next"
          :total="TypeOneLength"
          :page-size="pageSize"
          :current-page="page"
          @current-change="pageChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import PriItemSort from "@/components/content/sort/PriItemSort.vue";
import ShopList from "@/components/content/sort/ShopList.vue";
import Aslide from "./Aslide.vue";
import { getproduct } from "@/api/typeOnePage";
export default {
  components: { Aslide, ShopList, PriItemSort },
  name: "PriItem",
  data() {
    return {
      page: 1,
      pageSize: 30,
      TypeOneLength: 0,
      hostList: [],
      SortChange_list: [],
      pageList: [],
    };
  },
  methods: {
    pageChange(num) {
      this.page = num;
    },
    getproduct() {
      getproduct({ parent_name: this.$route.params.parent_name }).then(
        (res) => {
          if (res.code != 200) return;
          let TypeOne = [];
          TypeOne = res.res;
          this.TypeOne = TypeOne;
          this.TypeOneLength = res.res.length;
          // 价格从高到低的数据
          let TypeOneHeight = [];
          let data = JSON.parse(JSON.stringify(res.res));
          TypeOneHeight = data.sort((a, b) => a.price - b.price);
          let data_ = JSON.parse(JSON.stringify(res.res));
          // 价格从低到高的数据
          let TypeOneLow = [];
          TypeOneLow = data_.sort((a, b) => b.price - a.price);
          // 销量从高到低
          let datas_ = JSON.parse(JSON.stringify(res.res));
          let TypeOneCount = [];
          TypeOneCount = datas_.sort((a, b) => b.sale - a.sale);
          this.hostList = TypeOneCount.slice(0, 10);
          // 热销商品截取展示
          this.SortChange_list = [
            TypeOne,
            TypeOneLow,
            TypeOneHeight,
            TypeOneCount,
          ];
          this.pageList = this.SortChange_list[0];
        }
      );
    },
  },
  created() {
    this.getproduct();
  },
  mounted() {
    this.$bus.$on("numChange", (data) => {
      this.pageSize = data;
    });
    this.$bus.$on("orderChange", (data) => {
      this.pageList = this.SortChange_list[data];
    });
  },
  watch: {
    $route: {
      deep: true,
      handler(to, from) {
        if (to.path !== from.path) {
          this.getproduct();
          this.page = 1;
          this.pageSize = 30;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.priItem {
  display: flex;
  padding: 0 38px;
  justify-content: space-between;

  .primaryList {
    width: 80%;

    .page {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
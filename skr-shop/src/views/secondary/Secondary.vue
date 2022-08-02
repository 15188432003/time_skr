<template>
  <div class="secondary">
    <Title
      ><p>{{ $route.params.name }}</p></Title
    >
    <div class="crubm">
      <span class="crubmHome"><a href="/home">Home</a></span>
      <span class="divide">/</span>
      <span>Secondary</span>
    </div>
    <div class="brand">
      <div class="brandInfo">
        <p>{{ $route.params.name }}专区</p>
        <span>www.stride.fun</span>
      </div>
    </div>
    <div class="cpmponent">
      <PriItemSort :TypeOneLength="TypeOneLength" />
      <ShopList :pageList="pageList" :pageSize="pageSize" :page="page" />
    </div>
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
</template>

<script>
import Title from "@/components/content/title/Title.vue";
import PriItemSort from "@/components/content/sort/PriItemSort.vue";
import ShopList from "@/components/content/sort/ShopList.vue";
import { getSpu } from "@/api/typeOnePage";
export default {
  name: "Secondary",
  components: { PriItemSort, ShopList, Title },
  data() {
    return {
      page: 1,
      pageSize: 30,
      TypeOneLength: 0,
      SortChange_list: [],
      pageList: [],
    };
  },
  methods: {
    pageChange(num) {
      this.page = num;
    },
    getSpu() {
      getSpu({ name: this.$route.params.name }).then((res) => {
        if (res.code != 200) return;
        let TypeOne = [];
        TypeOne = res.data;
        this.TypeOne = TypeOne;
        this.TypeOneLength = res.data.length;
        // 价格从高到低的数据
        let TypeOneHeight = [];
        let data = JSON.parse(JSON.stringify(res.data));
        TypeOneHeight = data.sort((a, b) => a.price - b.price);
        let data_ = JSON.parse(JSON.stringify(res.data));
        // 价格从低到高的数据
        let TypeOneLow = [];
        TypeOneLow = data_.sort((a, b) => b.price - a.price);
        // 销量从高到低
        let datas_ = JSON.parse(JSON.stringify(res.data));
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
      });
    },
  },
  created() {
    this.getSpu();
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
        // console.log(to, from);
        if (to.name != "Primary" || to.name != "Secondary") {
          return;
        } else {
          this.getSpu();
          this.page = 1;
          this.pageSize = 30;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.crubm {
  height: 42px;
  span {
    color: #666;
  }
  .crubmHome {
    a {
      color: #666;
      &:hover {
        color: #1890ff;
      }
    }
  }
  .divide {
    margin: 0 8px;
    color: rgba(0, 0, 0, 0.45);
  }
}
.brand {
  .brandInfo {
    text-align: left;
    width: 80%;
    margin: 0 auto;
    background: #5a5a5a;
    color: #fff;
    height: 296px;
    padding: 45px 35px 0 47px;
    p {
      font-size: 40px;
      font-weight: 200;
      padding-bottom: 30px;
    }
    span {
      color: #fff;
    }
  }
}
.cpmponent {
  width: 80%;
  margin: 0 auto;
}
</style>
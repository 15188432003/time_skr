<template>
  <div class="search">
    <div class="againSearch">
      <section>
        <p>
          {{ name }}有 <span>{{ length }}</span> 个搜索结果
        </p>
      </section>
    </div>
    <div class="nav">
      <nav>
        <router-link to="/search/pro" class="leftt">产品({{ length }})</router-link>
        <router-link to="/search/active">活动(0)</router-link>
        <router-link to="/search/show">买家秀(120)</router-link>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { getItem } from "@/utils/sessionStorage";
import { getSpu } from "@/api/typeOnePage";
export default {
  name: "Search",
  data() {
    return {
      shopList: [],
      length: 0,
      name: "",
    };
  },
  methods: {
    getSpu() {
      let name = getItem("name");
      this.name = name;
      this.$store.dispatch("route/paramsName", name);
      getSpu({ name }).then((res) => {
        if (res.code != 200) return;
        this.shopList = res.data;
        this.$store.dispatch("route/paramsShop", this.shopList);
        this.length = this.shopList.length;
        if (this.$route.name == "Search") {
          this.$router.replace({ path: "/search/pro" }).catch((data) => {
            return false;
          });
          return;
        }
      });
    },
  },
  created() {
    this.getSpu();
  },
  watch: {
    $route: function () {
      // 当路由是搜索时重新搜索
      if (this.$route.name === "Pro") {
        this.getSpu();
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.againSearch {
  display: flex;
  align-items: center;
  justify-content: center;
  section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 7.4vh;
    background-color: #fafafa;
    border-top: 1px solid #e1e1e1;
    width: 64.5vw;
    height: 17.6vh;
    font-size: 3.6vh;
    p {
      span {
        color: #0ec3b2;
      }
    }
  }
}
.nav {
  margin-top: 10vh;
  padding: 0 17.3vw;
  nav{
    display: flex;
    align-items: center;
    justify-content: space-around;
    .leftt{
      border-left: 1px solid #000;
    }
    
    a{
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      border-right: 1px solid #000;
      padding: 1.6vh 0;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    
    cursor: pointer;
    font-size: 1.9vh!important;
    color: #5a5a5a;
    }
  }
}
.router-link-exact-active{
      background-color: #333;
      color: #fff !important;
      // border-left: 1px solid #000;

    // border: none;
}
</style>
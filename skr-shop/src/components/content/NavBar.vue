<template>
  <div class="navBar" :class="{ fixNav: navBarFixed }">
    <div class="img" v-show="navBarFixed">
      <img :src="logo" alt="" />
    </div>
    <div class="utility" v-show="navBarFixed">
      <div class="icons" @click="search">
        <svg-icon
          icon-class="search"
          className="icon"
          height="20px"
          width="20px"
        ></svg-icon>
        <p>SEARCH</p>
      </div>
      <div class="icons" @click="MY">
        <svg-icon
          icon-class="mycenter"
          className="icon"
          height="20px"
          width="20px"
        ></svg-icon>
        <p>MY</p>
      </div>
      <div class="icons" @click="shopCar">
        <svg-icon
          icon-class="shopcar"
          className="icon"
          height="20px"
          width="20px"
        ></svg-icon>
        <p>{{$store.state.shopCar.shoplength}}</p>
      </div>
    </div>
    <div class="hiddle"   v-show="$store.state.common.searchShow">
      <SearchH />
    </div>
    <nav-header :typeOne="typeOne" ></nav-header>
  </div>
</template>

<script>
import SearchH from "./SearchH.vue";
import logo from "@/assets/image/logo/log1.png";
import NavHeader from "./NavHeader.vue";
import { getTypeOne, getTypeTwo } from "../../api/navbar";
export default {
  components: { NavHeader,SearchH },
  name: "NavBar",
  data() {
    return {
      typeOne: [],
      typeTwo: [],
      navBarFixed: false, //控制吸顶样式
      navBarTop: 0, //导航栏到顶部的距离
      timer: null,
      logo: logo,
      searchShow:false,
    
    };
  },
  methods: {
    getTypeOne() {
      getTypeOne({ store_id: 1 }).then((data) => {
        this.typeOne = data.data;
      });
    },
    watchScroll() {
      // 滚动条：滚动的距离
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //  滚动的距离>元素到顶部的距离时，实现吸顶效果
      this.navBarFixed = scrollTop > this.navBarTop ? true : false;
    },
    MY() {
      if (this.$store.state.user.token) {
        this.$router.push("/mycenter");
      } else {
        this.$router.push("/login");
      }
    },
    shopCar() {
      if (this.$store.state.user.token) {
        this.$router.push("/shopcar");
      } else {
        this.$router.push("/login");
      }
    },
    search(){
      this.$store.dispatch('common/searchShow',true)
    }
  },

  watch: {
    // 一级获取到获取二级目录
    typeOne(val) {
      let query = [];
      if (!val) return;
      val.forEach((item) => {
        query.push(getTypeTwo({ parent_name: item }));
      });

      Promise.all(query).then((res) => {
        res.forEach((item) => {
          if (item.code == 200) {
            this.typeTwo.push(item.data);
          }
        });
      });
    },
  },
  created() {
    this.getTypeOne();
  },
  mounted() {
    this.$bus.$emit("TypeTwo", this.typeTwo);
    window.addEventListener("scroll", this.watchScroll);
    this.timer = setInterval(() => {
      let navDom = document.getElementsByClassName("navTop")[0];
      //页面数据渲染完毕，获取导航栏到顶部的距离
      if (document.readyState === "complete" && navDom) {
        this.navBarTop = navDom.offsetTop;
        window.clearInterval(this.timer); //清除定时器
      }
    }, 500);
  },
  // 移除事件监听
  destroyed() {
    window.removeEventListener("scroll", this.watchScroll);
  },
};
</script>

<style lang="scss" scoped>
.navBar {
  width: 100%;
  height: 65px;
  line-height: 65px;
  background-color: #000;
  color: #fff;
  // 一级标题样式结构
  .hiddle {
    width: 15%;
    min-width: 150px;
    position: absolute;
    background-color: red;
    top: 12px;
    right: 5%;
    z-index: 10000;
    border-radius: 10px;
  }
}
.fixNav {
  width: 100%;
  // position: sticky;
  position: fixed;
  top: 0;
  z-index: 999;
}
.img {
  position: absolute;
  left: 2%;
  vertical-align: middle;
  top: 0px;
  width: 172px;
  height: 65px;
  z-index: 999;
  img {
    position: relative;
    height: 60px;
  }
}
.utility {
  z-index: 1000;
  height: 65px;
  width: 10%;
  min-width: 150px;
  position: absolute;
  top: 0px;
  right: 5%;
  display: flex;
  padding-top: 3px;
  .icons {
    padding-top: 10px;
    line-height: normal;
    cursor: pointer;
    flex: 1;
    text-align: center;
    color: #fff;
    // color: red;

    p {
      line-height: 20px;
    }
  }
}
</style>
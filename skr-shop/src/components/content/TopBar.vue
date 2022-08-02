<template>
  <nav class="topbar">
    <img @click="imghandle" :src="log" alt="" />
    <Secrch />
    <ul class="rou_goto">
      <li @click="lagout" v-if="$store.state.user.topbarchange">
        <svg-icon
          icon-class="layout"
          className="icon"
          height="20px"
          width="20px"
        ></svg-icon>
        <p>LOGOUT</p>
      </li>
      <li @click="toResgest" v-else>
        <svg-icon
          icon-class="adduser"
          className="icon"
          height="20px"
          width="20px"
        ></svg-icon>
        <p>加入</p>
      </li>
      <li @click="myCenter" v-if="$store.state.user.topbarchange">
        <svg-icon
          icon-class="mycenter"
          className="icon"
          height="20px"
          width="20px"
        ></svg-icon>
        <p>MY</p>
      </li>
      <li @click="toLogin" v-else>
        <svg-icon
          icon-class="login"
          className="icon"
          height="20px"
          width="20px"
        ></svg-icon>
        <p>登录</p>
      </li>
      <li @click="toShopCar">
        <svg-icon
          icon-class="shopcar"
          className="icon"
          height="20px"
          width="20px"
        ></svg-icon>
        <p>{{$store.state.shopCar.shoplength}}</p>
      </li>
    </ul>
  </nav>
</template>
<script>
import log from "@/assets/image/logo/log.png";
import Secrch from "./Secrch.vue";
export default {
  name: "TopBar",
  components: { Secrch },
  data() {
    return {
      log: log,
    };
  },
  methods: {
    //阻止相同页面重复跳转
    imghandle() {
        this.$router.push("/home");
    },
    toResgest() {
      this.$router.push("/regester")
    },
    toLogin() {
      this.$router.push("/login")
    },
    toShopCar() {
      if(this.$store.state.user.token){
        this.$router.push("/shopcar");
      }else {
          //解决多次点击显示多个弹窗
        this.$message({
          message: "请先登录！",
          type:'warning'
        });
        this.$router.push("/login");
      }

    },
    lagout() {
      this.$confirm("即将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("user/logOut").then((data) => {
            this.$store.dispatch('shopCar/setShopList',[])
            this.$message({
              type: "success",
              message: "退出登陆成功",
            });
            this.$router.replace("/home").catch((err) => {
              return false;
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    myCenter() {
      this.$router.push("/mycenter").catch((data) => {
        return false;
      });
    },
  },
  created() {
  },
};
</script>

<style lang="scss" scoped>
.topbar {
  width: 100%;
  padding: 0 5% 0 2%;
  display: flex;
  justify-content: space-between;
  & > img {
    cursor: pointer;
  }
  .rou_goto {
    display: flex;
    justify-content: space-between;
    width: 225px;
    padding: 10px;
    li {
      cursor: pointer;
      width: 75px;
      p {
        line-height: 20px;
      }
    }
  }
}
</style>
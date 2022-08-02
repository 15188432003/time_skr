<template>
  <div id="app">
    <TopBar />
    <NavBar />
    <!-- 所有主体内容区域显示 -->
    <!-- <keep-alive exclude="Login,Details"> -->
      <router-view :key="Date.now()" />
    <!-- </keep-alive> -->
    <FooterBar />
    <SideMenu />
  </div>
</template>

<script>
import SideMenu from '@/components/content/SideMenu.vue';
import TopBar from "@/components/content/TopBar.vue";
import NavBar from "./components/content/NavBar.vue";
import FooterBar from "@/components/content/footer/FooterBar.vue";
export default {
  name: "App",
  components: { TopBar, NavBar, FooterBar, SideMenu },
  data() {
    return {};
  },
};
</script>

<style lang="scss">

</style>

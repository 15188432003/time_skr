<template>
  <div class="best">
    <Title>
      <p>最好的</p>
    </Title>
    <div class="topseller">
      <Tab />
      <ShopList />
    </div>
  </div>
</template>

<script>
import Title from "@/components/content/title/Title.vue";
import Tab from "./children/Tab.vue";
import ShopList from "./children/ShopList.vue";
export default {
  name: "Best",
  components: { Title, Tab, ShopList },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
  .topseller{
        width: 100%;
    margin: 10px auto;
  }
</style>
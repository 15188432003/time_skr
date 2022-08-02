<template>
  <div class="tag">
    <div class="tagItem">
      <div class="hotTag">
        <span>热门标签</span>
      </div>
      <div class="hotTagItem">
        <el-button
          round
          v-for="(item, index) in list"
          :key="index"
          @click="search(item)"
          ># {{ item }}</el-button
        >
      </div>
    </div>
    <div class="tagSearch"></div>
  </div>
</template>

<script>
import { setItem } from "@/utils/sessionStorage";
export default {
  name: "PriTag",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    search(item){
      setItem('name',item)
      this.$router.push({
        name:'Search',
        params:{
          name:item
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.tag {
  display: flex;
  justify-content: space-between;
  padding: 0 38px;
  line-height: 50px;
  align-items: center;
  .tagItem {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .hotTag {
      width: 20%;
      text-align: left;
    }
    .hotTagItem {
      width: 70%;
      text-align: left;
      el-button {
        margin: 0 10px;
        span {
          display: inline-block;
          transition: margin-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          pointer-events: none;
        }
      }
    }
  }
}
</style>
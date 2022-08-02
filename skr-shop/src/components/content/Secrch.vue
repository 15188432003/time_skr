<template>
  <div class="sarch">
    <svg-icon
      v-show="isShow"
      @click="clear"
      icon-class="clear"
      className="icon"
      class="icon_clear"
      width="15px"
      height="15px"
    ></svg-icon>
    <svg-icon
      @click="search"
      icon-class="search"
      className="icon"
      class="icon_search"
    ></svg-icon>
    <input type="text" placeholder="潮流，从搜索开始" v-model="ipt" />
  </div>
</template>

<script>
import { setItem } from "@/utils/sessionStorage";
export default {
  name: "Secrch",
  data() {
    return {
      isShow: false,
      ipt: "",
    };
  },
  methods: {
    clear() {
      this.ipt = "";
    },
    search() {
      setItem('name',this.ipt)
      this.$router.push({
        name:'Search',
      });
    },
  },
  watch: {
    ipt(val) {
      if (val) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sarch {
  width: 25%;
  position: relative;
  line-height: 65px;
  .icon_clear {
    position: absolute;
    right: 40px;
    top: 20px;
    color: #ccc;
  }
  .icon_search {
    position: absolute;
    right: 18px;
    top: 20px;
    color: #ccc;
  }
  input {
    border: none;
    width: 100%;
    outline: none;
    padding: 4px 11px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.65);
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    transition: all 0.2s linear;
    &:focus {
      font-size: 16px;
    }
  }
}
</style>
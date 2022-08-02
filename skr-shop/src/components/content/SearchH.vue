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
    <input
      type="text"
      placeholder="潮流，从搜索开始"
      v-model="ipt"
      ref="ipt"
      @search="onSearch"
      @blur="changeFcous"
    />
  </div>
</template>

<script>
import { setItem } from "@/utils/sessionStorage";
export default {
  name: "SecrchH",
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
    onSearch(val) {
      if (val.length != 0) {
        setItem("name", ipt);
        this.$router.push({ name: "Search", params: { name: ipt } });
      }
    },
    changeFcous() {
      this.$store.dispatch("common/searchShow", false);
    },
    search() {
      setItem("name", this.ipt);
      this.$router.push({
        name: "Search",
      });
      this.$store.dispatch("common/searchShow", false);
    },
  },
  mounted() {
    this.$refs.ipt.focus();
  },
  watch: {
    ipt(ipt) {
      if (ipt) {
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
  border-radius: 20px;
  width: 100%;
  position: relative;
  line-height: 100%;
  .icon_clear {
    position: absolute;
    right: 40px;
    top: 10px;
    color: #ccc;
  }
  .icon_search {
    position: absolute;
    right: 18px;
    top: 10px;
    color: #ccc;
    vertical-align: middle;
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
    border-radius: 5px;
    height: 40px;
  }
}
</style>
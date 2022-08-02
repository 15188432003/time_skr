<template>
  <div class="navTop" >
   
    <div class="content">
      <ul class="left">
        <li
          v-for="(item, index) in typeOne"
          :key="index"
          @mouseover="typeTwoShow(item, index)"
          @mouseout="typeTwoHid"
          @click="into(item)"
        >
          {{ item }}
        </li>
      </ul>
      <ul class="right">
        <li><router-link to="/wdna">POP</router-link></li>
        <li><router-link to="/exclusive">EXCLUSIVE</router-link></li>
        <li><router-link to="/event">EVENT</router-link></li>
        <li><router-link to="/best">BEST</router-link></li>
      </ul>
    </div>
    <NavEng :imgsList="imgsList" :typeIndex="typeIndex" :Show="isShow" />
  </div>
</template>

<script>
import NavEng from "./NavEng.vue";
import { getImg } from "../../api/navbar";
export default {
  components: { NavEng },
  props: ["typeOne"],
  name: "NavHeader",
  data() {
    return {
      imgsList: [],
      isShow: false,
      typeIndex: 0,
      
      
    };
  },
  methods: {
    async getImg_(item) {
      const res = await getImg(item);
      this.imgsList.push(res);
    },
    typeTwoShow(item, index) {
      this.isShow = true;
      this.typeIndex = index;
      this.$store.dispatch("common/commitShow", true);
    },
    typeTwoHid() {
      this.isShow = false;
      this.$store.dispatch("common/commitShow", false);
    },
    into(item) {
      this.$router
        .push({
          name: "Primary",
          params: {
            parent_name: item,
          },
        })
        .catch((data) => {
          return false;
        });
    },
    
  },
  created() {
    this.getImg_({ parent_name: "鞋类", start: 7, end: 10 });
    this.getImg_({ parent_name: "服饰", start: 7, end: 10 });
    this.getImg_({ parent_name: "配件", start: 16, end: 18 });
    this.getImg_({ parent_name: "儿童专区", start: 7, end: 10 });
  },
 
};
</script>

<style lang="scss" scoped>

.content {
  width: 55%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .left {
    width: 100%;
    display: flex;
    margin: 0 15px;
    li {
      flex: 1;
      text-align: center;
      letter-spacing: 2px;
      &:hover {
        color: #04bd9e;
      }
    }
  }
  .right {
    width: 100%;
    display: flex;
    margin: 0 15px;
    li {
      a {
        color: #fff;
        &:hover {
          color: #04bd9e;
        }
      }
      flex: 1;
      text-align: center;
      letter-spacing: 2px;
    }
  }
}
.icon {
  color: #fff;
}
</style>
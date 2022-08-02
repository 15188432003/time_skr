<template>
  <div class="contentMain">
    <Title style="transform: translateY(-100%)">
      <div class="title-wrap">
        <p>WANT.NEED</p>
        <el-button size="small" class="btn">
          <span>+ ALL</span>
          <span>(10943)</span>
        </el-button>
      </div>
    </Title>
    <Wantneed :shopList="shopList"/>
  </div>
</template>

<script>
import { getproduct } from "@/api/typeOnePage.js";
import Title from "@/components/content/title/Title.vue";
import Wantneed from './Wantneed.vue'
export default {
  name: "ContentMain",
  components: { Title,Wantneed },
  data() {
    return {
      shopList:[]
    }
  },
  methods: {
    getproduct(){
      getproduct({parent_name:'服饰'}).then((data)=>{
        // console.log(data);
        this.shopList = data.res.slice(204,212)
        // console.log(this.shopList);
      })
    }
  },
  created() {
    this.getproduct()
  },
};
</script>

<style lang="scss" scoped>
.contentMain{
      min-width: 1240px;
    margin-top: 7%;

}
.btn {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  color: #aaa7a7;
  span {
    display: inline-block;
    transition: margin-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
</style>
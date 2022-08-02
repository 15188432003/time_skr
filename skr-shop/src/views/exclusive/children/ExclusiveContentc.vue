<template>
  <div class="exclusiveContentc">
    <Title style="transform: translateY(-100%)">
      <div class="title-wrap">
        <p>WANT.NEED</p>
        <el-button size="small" class="btn" @click="POP">
          <span>+ ALL</span>
          <span>(10943)</span>
        </el-button>
      </div>
    </Title>
    <div class="wanted">
    <ul>
      <div class="shopList" v-for="(item, index) in shopList" :key="index" @click="detail(item.id)">  
        <div class="img">
          <img :src="item.img" alt="" />
        </div>
        <div class="detail">
          <p class="title">{{ item.title }}</p>
          <p>www.stride.fun</p>
        </div>
      </div>
    </ul>
  </div>
  </div>
</template>

<script>
import { getImg } from "@/api/gitImg";
import Title from "@/components/content/title/Title.vue";
export default {
  name: "ExclusiveContentc",
  components: { Title },
  data() {
    return {
      shopList: [],
    };
  },
  methods: {
    getImg() {
      // 轮播图6-9
      getImg({ parent_name: "服饰", start: 19, end: 26 }).then((data) => {
        // console.log(data);
        this.shopList = data;
        
      });
    },
    detail(id){
      this.$router.push(`/details/${id}`)
    },
    POP(){
      this.$router.push('/wdna')
    }
  },
  created() {
    this.getImg();
  },
};
</script>



<style lang="scss" scoped>
.exclusiveContentc {
  min-width: 1240px;
  margin-top: 7%;
  .wanted {
  text-align: left;
  width: 100%;
  ul {
    width: 100%;
    display: flex;
    .shopList {
      border: 1px solid #e8e8e8;
      background: #fff;
      border-radius: 2px;
      transition: all 0.3s;
      width: calc(12.5% - 20px);
      margin: 0 10px;
      &:hover {
        border-color: rgba(0, 0, 0, 0.09);
        box-shadow: 0 2px 8px rgb(0 0 0 / 9%);
      }
      .img {
        width: 100%;
        border-radius: 2px 2px 0 0;
        img {
          width: 100%;
        }
      }
      .detail {
        padding: 8px 0 0 0;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        .title {
          color: #000;
        }
      }
    }
  }
}
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
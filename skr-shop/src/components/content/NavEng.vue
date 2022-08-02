<template>
  <div class="navEng">
    <div class="main" v-show="$store.state.common.isShow" @mouseover="typeTwoShow"
          @mouseout="typeTwoHid">
      <div class="main-content">
        <ul class="left">
          <li v-for="(item, index) in typeTwo[typeIndex]" :key="index" @click="into(item)">{{ item }}</li>
        </ul>
        <div class="right">
          <ul>
            <li v-for="(item, index) in imgsList[typeIndex]" :key="index">
              <img :src="item.img" alt="" />
              <h2>{{ item.title }}</h2>
              <p>
                <span>www.stride.fun</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    typeIndex: {
      type: Number,
      default: 0,
    },
    imgsList: {
      type: Array,
      default: () => [],
    },
    // isShow:String
  },
  name: "NavEng",
  data() {
    return {
      typeTwo: [],
      isShow:true
    };
  },
  methods: {
    typeTwoShow(){
        this.$store.dispatch('common/commitShow',true)
    },typeTwoHid(){
        this.$store.dispatch('common/commitShow',false)

    },
    into(item){
      this.$router.push({
        name:'Secondary',
        params:{
          name:item
        }
      }).catch(data=>{
        return false
      })
    }
  },
  mounted() {
    this.$bus.$on("TypeTwo", (data) => {
      this.typeTwo = data;
    });
  },
};
</script>

<style lang="scss" scoped>
//二级标题样式结构
.navEng{
  position: relative;
  z-index: 10;
}
.main {
 
  width: 100%;
  height: 300px;
  background-color: #fff;
  box-shadow: 1px 1px 1px #fff;
  .main-content {
    width: 70%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    .left {
      box-sizing: border-box;
      width: 49%;
      height: 100%;
      padding: 25px 60px 25px 25px;
      overflow: hidden;
      li {
        text-align: left;
        float: left;
        color: #4e4d4d;
        height: 30px;
        line-height: 30px;
        width: 25%;
        cursor: pointer;
        font-size: 12px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .right {
      float: right;
      width: 50%;
      height: 100%;
      display: flex;
      ul {
        flex: 1;
        padding: 25px 0;
        display: flex;
        overflow: hidden;
        li {
          width: 140px;
          display: flex;
          height: 100%;
          flex-direction: column;
          margin-right: 20px;
          img {
            width: 100%;
            height: 173px;
            display: block;
          }
          h2 {
            color: rgba(0, 0, 0, 0.85);
            line-height: 30px;
            text-align: center;
            font-weight: 700;
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          p {
            line-height: 30px;
            span {
              font-size: 12px;
              color: #333;
              display: block;
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>
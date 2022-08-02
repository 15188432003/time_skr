<template>
  <div class="TypeList">
    <div class="leftTitle">
      <p class="fushi">鞋类</p>
      <p class="more">
        more
        <svg-icon
          icon-class="rightarrow"
          className="icon"
          height="20px"
          width="20px"
        ></svg-icon>
      </p>
    </div>
    <div class="rightcard">
      <el-card
      :body-style="{ padding: 0 }"
        class="card"
        v-for="(item, index) in TypeList_list"
        :key="index"

      >
        <img :src="item.img" alt="" />

        <div class="eltitle">
          <span>{{item.title}}</span>
        </div>
                <span class="description">www.stride.fun</span>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name:"TypeListshoes",
  props:{
    TypeList_list:{
      type:Array,
      default:()=>[],
    }
  }
};
</script>

<style lang="scss" scoped>
.TypeList {
  width: 100%;
  padding: 20px;
  height: 249px;
}
.leftTitle {
  width: 12%;
  float: left;
  padding: 10px;
}
.fushi {
  color: #333;
  font-family: ProximaNova-Thin;
  font-size: 38px;
  text-transform: uppercase;
  text-align: right;
  font-weight: 100;
  cursor: pointer;
}
.eltitle{
    overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
    color: #333;
  font-family: "ProximaNova-Bold";
  font-size: 20px;
}
  .description {
    color: #666;
    font-family: "yg740";
    font-size: 12px;
    line-height: 1.5;
    display: block;
    padding: 10px 0 10px;
    word-break: keep-all;
  }
.rightcard{
  float: right;
  width: 87.5%;


}
.card{
  float: left;
              cursor: pointer;
    width: calc((100% / 7) - 8px);
    margin: 4px;
}
img{
  width: 100%;
}
.more {
  color: #333;
  font-family: ProximaNova-Thin;
  font-size: 18px;
  text-transform: uppercase;
  text-align: right;
  font-weight: 100;
  cursor: pointer;
}

</style>
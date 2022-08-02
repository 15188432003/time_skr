<template>
  <div class="tabbtn">
    <ul>
      <li v-for="(item,index) in nav" :key="index" @click="onbtn(index)" :class="{btn_bd:selectIndex == index ? true :false }">
        <button>{{item}}</button>
      </li>
    </ul>
    <div class="sort">
      <ul>
        <li v-for="(item,index) in sort" :key="index">
          <a href="">{{item}}</a>
        </li>
      </ul>
      <el-select size="mini" v-model="value" placeholder=" 진행중 이벤트 ">
        <el-option
          v-for="(item,index) in options"
          :key="index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      selectIndex:0,
      nav:["ALL","鞋类","服饰","配件","儿童专区"],
      sort:["全部","收藏","趋势","社论","销售","事件"],
      options: [{
        value: '选项1',
        label: '진행중 이벤트'
      }, {
        value: '选项2',
        label: '진행중 이벤트'
      }],
      value:'',
    }
  },
  methods:{
    onbtn(index){
      this.selectIndex = index;
      this.$emit('listBtn',this.nav[index])
    }
  }
}
</script>

<style lang='scss' scoped>
.tabbtn {
  width: 100%;
  height: 60px;
  margin-bottom: 100px;
  > ul {
    display: flex;
    width: 85%;
    margin: auto;

    > li {
      width: 20%;
      height: 100%;
      text-align: center;
      line-height: 60px;
      border: 1px solid #b5b5b5;
      border-bottom: 2px solid #000;
      button {
        width: 100%;
        font-size: 18px;
        font-weight: 600;
        background-color: #fff;
        outline-style: none;
        border: none;
        cursor: pointer;
      }
    }
    .btn_bd {
      border: 2px solid #000;
      border-bottom: none;
    }
  }
}
.tabbtn {
  .sort {
    display: flex;
    justify-content: space-between;
    width: 85%;
    height: 32px;
    margin: 24px auto;
    ul {
      display: flex;
      width: 100%;
      height: 100%;
      li {
        height: 100%;
        padding: 6px 20px 6px 21px;
        border-right: 1px solid #ccc;
        a{
          color: #666;
        }
      }
      li:last-of-type {
        border: none;
      }
    }
    
  }
}

</style>
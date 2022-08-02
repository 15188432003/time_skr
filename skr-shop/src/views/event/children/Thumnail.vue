<template>
  <div class="thumnail">
    <div class="issue_lst">
      <ul>
        <li v-for="(item, index) in shopList" @click="onDetail(item.id)" :key="index">
          <a href="javascript: void(0);"
            ><img :src="item.img" alt="" />
            <p class="multiline">{{ item.title }}</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="100" :current-page="pages" @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getImg } from "@/api/navbar"
export default{
  name:"thumnail",
  props:{
    list:{
      type:String,
      default:"",
    }
  },
  data() {
    return {
      shopList: [],
      listAll: [],
      pages: 1,
    };
  },
  created() {  
    if (this.list == "All") {
      this.get_Img("鞋类", 5, 7);
      this.get_Img("服饰", 5, 7);
      this.get_Img("配件", 5, 6);
      this.get_Img("儿童专区", 5, 6);
    } else {
      this.get_Img(this.list,1, 10);
    }
  },
  methods: {
    async get_Img(parent_name, start, end) {
      const res = await getImg({ parent_name, start, end });
      if (this.list == "All") {
        this.shopList = this.shopList.concat(res);
        this.listAll = this.shopList;
      } else {
        (this.shopList = []), (this.shopList = this.shopList.concat(res));
      }
      // console.log(this.shopList);
      // console.log(this.listAll);
    },
    
    onDetail(Id) {
      this.$router.push(`/details/${Id}`);
    },
    pageChange(num){
      this.pages = num;
      if (this.list != "All") {
        let starts = (this.pages - 1) * 10 + 1;
        let ends = starts + 10 - 1;
        this.get_Img(this.list, starts, ends);
      }
      // console.log(this.shopList);
    }
  },
  watch: {
    list() {
      this.pages = 1;
      let list = "ALL"
      if (this.list == list) {
        this.shopList = this.listAll;
        // console.log("this.shopList",this.shopList);
      } else {
        this.get_Img(this.list, 1, 10);
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.thumnail {
  width: 100%;
  height: auto;
}
.issue_lst {
  width: 85%;
  margin: auto;
  ul {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    li {
      width: 18%;
      margin-bottom: 10px;
      a {
        width: 100%;
        img {
          width: 100%;
        }
        .multiline {
          text-align: center;
          margin-top: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}
.pagination {
  width: 85%;
  margin: auto;
  #components-pagination-demo-mini .ant-pagination:not(:last-child) {
    margin-bottom: 24px;
  }
  .ant-pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
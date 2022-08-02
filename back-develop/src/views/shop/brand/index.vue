<template>

  <div>
    <div
      style="
        width: 96%;
        margin: auto;
        line-height: 70px;
        height: 70px;
        margin-top: 30px;
        margin-bottom: 30px;
        border: 1px solid #ddd;
      "
    >
      <span style="margin-left: 20px">数据列表</span>
      <el-button size="mini" style="margin-left: 1100px" @click="addBrand"
        >添加</el-button
      >
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 96%; margin: auto"
      class="brang"
    >
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column label="LOGO" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="品牌名牌"></el-table-column>
      <el-table-column prop="letter" label="品牌首字母"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" style="margin-left: 80px">更新</el-button>
          <el-button
            size="mini"
            style="margin-left: 40px"
            @click="deleteShop(scope.row.id)"
            type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getBrands, deleteBrand } from "@/api/shopList";
export default {
  data() {
    let tableData = tableData;
    return {
      tableData: [],
      store_id: 1,
    };
  },
  created() {
    this.getBrand();
  },
  methods: {
    getBrand() {
      getBrands({ store_id: this.store_id }).then((data) => {
        console.log(data);
        this.tableData = data.data;
      });
    },
    /* 
    1:点击删除按钮
    2:通过传参知道点击的那个商品
    3:提示是否删除商品
    4:发送删除请求
    5:删除成功, 提示成功, 重新获取列表
    */
    //删除品牌

    deleteShop(id) {
      let data={
        id
      }
      deleteBrand({data}).then((data) => {
        console.log(data);
      });

      console.log(id);
            this.$confirm( '是否删除该品牌?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
    },

    //跳转到addBrand
    addBrand() {
      console.log(11111);
      this.$router.push("./addBrand/1");
    },

  

  },
};
</script>


<style lang="scss" scoped>
</style>




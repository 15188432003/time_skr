<template>
  <div id="shopList">
    <div class="nav">
      <el-card class="box-card">
        <i class="el-icon-search"></i>
        <span>输入搜索</span>

        <el-button
          style="float: right; margin-top: 35px; margin-left: 20px"
          type="primary"
          @click="handleSearchResult()"
          >查询结果</el-button
        >
        <el-button style="float: right; margin-top: 35px" @click="handleReset()"
          >重置</el-button
        >

        <div style="margin-top: 15px">
          <el-form :inline="true" size="small" label-width="140px">
            <el-form-item label="输入搜索：">
              <el-input
                style="width: 200px"
                v-model="keyword"
                placeholder="商品名称"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="dataList" style="margin-top: 20px">
      <el-card class="box-card">
        <i class="el-icon-tickets"></i>
        <span>数据列表</span>
        <el-button
          style="float: right; width: 80px"
          type="primary"
          size="small"
          @click="addNewShop"
          >添加</el-button
        >
      </el-card>
    </div>
    <div class="shopDetail" style="margin-top: 20px; width: 100%;" >
      <template>
        <el-table :data="tableData" border >
          <el-table-column type="selection"  align="center" width="50%">
          </el-table-column>
          <el-table-column label="编号"  prop="id" align="center">
          </el-table-column>
          <el-table-column label="商品图片"  prop="img" align="center">
            <template slot-scope="scope">
              <img style="height: 80px" :src="scope.row.img" />
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="title"  align="center"  min-width="200%">
          </el-table-column>
          <el-table-column label="价格" prop="price" align="center">
          </el-table-column>
          <el-table-column label="SKU库存"  align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="examine(scope.row)"
                circle
              >
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="销量" width="150" align="center">
            <template>1200</template>
          </el-table-column>
          <el-table-column label="操作" width="250" align="center" >
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button size="mini" @click="handleAddCoupon(scope.row)"
                >添加优惠券</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click.native.prevent="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div>
      <el-dialog
        title="产品信息"
        :visible.sync="dialogVisible"
        width="45%"
        :before-close="handleClose"
      >
        <el-table :data="tableDatas" border style="width: 100%" disabled="true">
          <el-table-column prop="price" label="销售价格" width="180"  disabled="true">
          </el-table-column>
          <el-table-column prop="sku" label="商品库存" width="180">
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >关闭</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

</template>

<script>
import {
  getShopList,
  deletShop,
  searchShop,
  editShop,
  getSku,
} from "@/api/shopList.js";
import { getVoucher } from "@/api/market.js";
export default {
  name: "ShopList",
  data() {
    return {
      keyword: "",
      tableData: [],
      checked: false,
      tableDatas: [
        {
          price: "",
          sku: "",
        },
      ],
      dialogVisible: false,
    };
  },
  methods: {
    //关闭库存弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //获取所有列表
    getShopList() {
      getShopList({ store_id: 1 }).then((data) => {
        this.tableData = data.data;
      });
    },
    //重置
    handleReset() {
      this.keyword = "";
      this.getShopList();
    },
    //搜索
    handleSearchResult() {
      searchShop({ keyword: this.keyword }).then((data) => {
        this.tableData = data.data;
      });
    },
    //跳转添加页面
    addNewShop() {
      this.$router.replace("/shop/addShop");
    },
    //编辑
    handleEdit(item) {
      this.$router.replace({
        // path: "/shop/addShop",
        name: "addShop",
        params: {
          title: item.title,
          price: item.price,
          img: item.img,
          id: item.id,
          spgId: item.spg_id,
        },
      });
    },
    //删除
    handleDelete(itemId) {
      let data = {
        id: itemId,
      };
      this.$confirm("确定要将此商品从列表中删除么, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletShop(data).then((data) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getShopList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加优惠卷
    handleAddCoupon(item) {
      getVoucher({ store_id: 1 }).then((data) => {
        if (data.code == 200) {
          this.$router.replace({
            path: "/market/marketCoupon",
            query: {
              spg_id: item.spg_id,
            },
          });
        } else {
          this.$router.replace({
            path: "/market/addCoupon",
            query: {
              spg_id: item.spg_id,
            },
          });
        }
      });
    },
    //展示库存显示价格
    examine(item) {
      this.dialogVisible = true;
      let data = {
        spu_id: item.id,
      };
      getSku(data).then((data) => {
        this.tableDatas[0].price = data.data[0].price;
        this.tableDatas[0].sku = JSON.parse(data.data[0].stock)[0];
      });
    },
  },
  created() {
    this.getShopList();
  },
};
</script>

<style lang="scss" scoped >
#shopList {
  // min-width: 1200px;
  width: 100%;
  padding: 0 10px 0;
}
</style>
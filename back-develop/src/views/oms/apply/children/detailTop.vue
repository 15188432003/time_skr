<template>
  <div class="detail">
    <el-card class="box-card" shadow="never">
      <div class="title">
        <span>退货商品</span>
      </div>

      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="getRowClass"
        :cell-style="{ background: '#ffff', height: '60px', padding: '5px' }"
      >
        <el-table-column prop="skus[0].id" label="商品编号" align="center" width="100px">
        </el-table-column>
        <el-table-column label="商品图片" align="center">
          <img :src="this.imgs.small" alt="" />
        </el-table-column>
        <el-table-column prop="skus[0].title" label="商品名称" align="center">
        </el-table-column>
        <el-table-column
          prop="skus[0].actual_price"
          label="商品单价"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="skus[0].num" label="数量" align="center">
        </el-table-column>
        <el-table-column label="总价" align="center">
          <span>{{ skus.actual_price * skus.num }}</span>
        </el-table-column>
      </el-table>
      <div :style="{ margin: '20px 0px 0 0' }" class="total">
        <span>合计：</span>
        <span style="color: red">￥{{ skus.actual_price * skus.num }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "DetailTop",
  props: ["tableData", "imgs", "skus"],
  data() {
    return {};
  },
  methods: {
    getRowClass(rowIndex) {
      return "background: #F2F6FC";
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  margin-top: 50px;
  .total {
    padding: 0 20px 0 0;
    text-align: right;
    font-size: 16px;
  }
  .title {
    margin: 20px 0;
    span {
      font-size: 14px;
      color: #606266;
    }
  }
}
img {
  width: 80px;
  vertical-align: middle;
}
</style>
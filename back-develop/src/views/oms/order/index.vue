<template>
  <div class="order">
    <div class="order-header">
      <el-card class="box-card" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>数据列表</span>
      </el-card>
    </div>
    <div class="order-main">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="编号" align="center">
        </el-table-column>
        <el-table-column prop="code" label="订单编号" align="center">
        </el-table-column>
        <el-table-column prop="update_time" label="提交时间" align="center">
        </el-table-column>
        <el-table-column prop="money" label="订单金额" align="center">
        </el-table-column>
        <el-table-column prop="payment_type" label="支付方式" align="center">
          <template slot-scope="scope">
            <span v-show="scope.row.payment_type == 1">微信</span>
            <span v-show="scope.row.payment_type == 2">支付宝</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" align="center">
          <template slot-scope="scope">
            <span v-show="scope.row.status == 0">待付款</span>
            <span v-show="scope.row.status == 1">待发货</span>
            <span v-show="scope.row.status == 2">已发货</span>
            <span v-show="scope.row.status == 3">已完成</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="290">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="checkOrder(scope.row.id, scope.row.status)"
              >查看订单</el-button
            >
            <el-button
              type="danger"
              size="mini"
              v-show="scope.row.status == '3'"
              @click="deleteOrder(scope.row.id)"
              >删除订单</el-button
            >
            <el-button
              size="mini"
              v-show="scope.row.status == '2'"
              >订单追踪</el-button
            >
            <el-button
              size="mini"
              v-show="scope.row.status == '1'"
              @click="deliver(scope.row.id,scope.row.status)"
              >订单发货</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getOrder, deleteOrder } from "@/api/oms";
export default {
  name: "Order",
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    getOrder() {
      let data = {
        store_id: 1,
        count: 30,
        page: 1,
      };
      getOrder(data).then((data) => {
        console.log(data.data[0]);
        this.tableData = data.data[0];
      });
    },
    checkOrder(id, status) {
      console.log(id, status);
      this.$router.push(`./orderDetail/${id}/${status}`);
    },
    deleteOrder(id) {
      this.$confirm("此操作将永久删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteOrder({ id }).then((data) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getOrder();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deliver(id) {
      console.log(id);
      this.$router.push(`./deliverOrderList/${id}`);
    },
  },
  created() {
    this.getOrder();
   
  },
};
</script>
<style lang="scss" scoped>
.order {
  padding: 0 20px;
  .order-header {
    margin: 20px 0;
  }
  .order-main {
    margin-bottom: 30px;
  }
}
</style>
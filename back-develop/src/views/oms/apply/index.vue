<template>
  <div class="apply">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      empty-text="暂无数据"
    >
      <el-table-column prop="id" label="服务单号" align="center">
      </el-table-column>
      <el-table-column label="申请时间" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.create_time | formatDate("YYYY-MM-DD HH:mm:ss")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="money" label="退款金额" align="center">
      </el-table-column>
      <el-table-column label="申请状态" align="center">
        <template slot-scope="scope">
          <span v-show="scope.row.status == 0">代付款</span>
          <span v-show="scope.row.status == 1">待发货</span>
          <span v-show="scope.row.status == 2">已发货</span>
          <span v-show="scope.row.status == 3">已完成</span>
        </template>
      </el-table-column>
      <el-table-column label="处理时间" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.update_time | formatDate("YYYY-MM-DD HH:mm:ss")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="checkOrder(scope.row.id, scope.row.order_id)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from "@/utils/data";
import { getBackStock, getBackStockDetail } from "@/api/oms";
export default {
  name: "Apply",
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    getBackStock() {
      getBackStock({ store_id: 1 }).then((data) => {
        this.tableData = data.data;
      });
    },

    checkOrder(id, order_id) {
      this.$router.push(`./returnApplyDetail/${id}/${order_id}`);
    },
  },
  created() {
    this.getBackStock();
    // this.getBackStockDetail();
  },
};
</script>

<style lang="scss" scoped>
.apply {
  padding: 20px;
}
</style>
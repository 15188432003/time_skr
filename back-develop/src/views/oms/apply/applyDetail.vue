<template>
  <div class="applyDetail">
    <DetailTop :tableData="tableData" :imgs="imgs" :skus="skus" />
    <DetailMiddle :tableData="tableDatas" />
    <div class="success">
      <el-button type="primary" @click="success" v-show="tableDatas.status == 1"
        >接受退款</el-button
      >
      <el-button
        type="primary"
        @click="deleteOrder"
        v-show="tableDatas.status == 3"
        >删除信息</el-button
      >
    </div>
  </div>
</template>

<script>
import DetailMiddle from "./children/detailMiddle.vue";
import DetailTop from "./children/detailTop.vue";
import { getBackStockDetail, updateBackStock, deleteOrder } from "@/api/oms";
export default {
  components: { DetailTop, DetailMiddle },
  name: "ApplyDetail",
  data() {
    return {
      tableDatas: {},
      tableData: [],
      imgs: [],
      skus: [],
    };
  },
  methods: {
    getBackStockDetail() {
      getBackStockDetail({ order_id: this.$route.params.order_id }).then(
        (data) => {
          this.tableDatas = data.data;
          this.tableData.push(data.data);
          this.skus = this.tableData[0].skus[0];
          this.imgs = JSON.parse(this.tableData[0].skus[0].imgs)[0];
        }
      );
    },
    success() {
      this.$confirm("确定同意退款吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateBackStock({ id: this.$route.params.id, status: 3 }).then(
            (data) => {
              this.$message({
                type: "success",
                message: "退款成功!",
              });
              this.$router.push("/oms/returnApply");
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退款",
          });
        });
      this.getBackStockDetail();
    },
    deleteOrder() {
      this.$confirm("此操作将永久删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteOrder({ id: this.$route.params.order_id }).then((data) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.$router.push("/oms/returnApply");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.getBackStockDetail();
  },
};
</script>

<style lang="scss" scoped>
.applyDetail {
  padding: 0 20px;
  .success {
    text-align: center;
  }
}
</style>
<template>
  <div class="DeliverOrderList">
    <div class="mark-header-top">
      <el-card class="box-card" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>发货列表</span>
      </el-card>
    </div>
    <el-table :data="deliverList" border style="width: 100%">
      <el-table-column prop="id" label="订单编号" align="center">
      </el-table-column>
      <el-table-column prop="name" label="收货人" align="center">
      </el-table-column>
      <el-table-column prop="tel" label="手机号码" align="center">
      </el-table-column>
      <el-table-column prop="address" label="收货地址" align="center">
      </el-table-column>
      <el-table-column label="配送方式" align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.ecp"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="物流单号" align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.postid"></el-input>
        </template>
      </el-table-column> </el-table
    ><br />
    <div class="btn">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<script>
import { getOrderDetail, updateOrder } from "@/api/oms";
export default {
  name: "DeliverOrderList",
  data() {
    return {
      deliverList: [],
      inputOne: "",
      inputTwo: "",
    };
  },
  methods: {
   cancel() {
      for (let item of this.deliverList) {
        this.$set(item, "ecp", "");
        this.$set(item, "postid", "");
      }
       this.$router.back();
    },
    confirm() {
      let data = Object.assign(this.deliverList[0], { status: 2 });
      this.$confirm("是否确认发货", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateOrder(data).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$router.back();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发货",
          });
        });
    },
  },
  created() {
    getOrderDetail({ order_id: this.$route.params.order_id }).then((data) => {
      let message = [];
      message.push(data.data);
      message = message.map((item) => {
        return Object.assign(item, { ecp: "", postid: "" });
      });
      this.deliverList = message;
    
      console.log(this.deliverList);
    });
  },
};
</script>

<style lang="scss" scoped>
.DeliverOrderList {
  padding: 0 20px;

  .mark-header-top {
    margin: 50px 0 20px 0;
  }
  .btn {
    text-align: center;
  }
}
</style>
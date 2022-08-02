<template>
  <div class="detail">
    <div class="header">
      <el-steps :active="active" align-center>
        <el-step
          title="提交订单"
          :description="create_time | formatDate('YYYY-MM-DD HH:mm:ss')"
        ></el-step>
        <el-step title="支付订单"></el-step>
        <el-step title="平台发货"></el-step>
        <el-step title="确认收货"></el-step>
      </el-steps>
    </div>
    <div class="main">
      <el-card
        class="box-card"
        :body-style="{ fontSize: '14px', color: '#606266' }"
      >
        <div slot="header" class="main-top">
          <i class="el-icon-warning"></i>
          <!-- <span>当前订单状态：</span> -->
          <span v-show="$route.params.status == 0">当前订单状态：待付款</span>
          <span v-show="$route.params.status == 1">当前订单状态：待发货</span>
          <span v-show="$route.params.status == 2">当前订单状态：已发货</span>
          <span v-show="$route.params.status == 3">当前订单状态：已完成</span>
        </div>

        <div :style="{ margin: '0px 0px 20px 0px' }">
          <i class="el-icon-collection-tag"></i>
          <span>基本信息</span>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="getRowClass"
          :cell-style="{ background: '#ffff', height: '60px' }"
        >
          <el-table-column prop="id" label="订单编号" align="center">
          </el-table-column>
          <el-table-column prop="code" label="订单流水号" align="center">
          </el-table-column>
          <el-table-column prop="payment_type" label="支付方式" align="center">
            <template slot-scope="scope">
              <span v-show="scope.row.payment_type == 1">微信</span>
              <span v-show="scope.row.payment_type == 2">支付宝</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          :data="tableData"
          border
          :style="{ width: '100%', borderTop: 'none' }"
          :header-cell-style="getRowClass"
          :cell-style="{ background: '#ffff', height: '60px' }"
        >
          <el-table-column prop="postage" label="配送方式" align="center">
            <span>暂无</span>
          </el-table-column>
          <el-table-column prop="name" label="物流单号" align="center">
            <span>暂无</span>
          </el-table-column>
          <el-table-column label="自动确认收货时间" align="center">
            <span>15天</span>
          </el-table-column>
        </el-table>

        <div :style="{ margin: '20px 0px ' }">
          <i class="el-icon-collection-tag"></i>
          <span>基本信息</span>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="getRowClass"
          :cell-style="{ background: '#ffff', height: '60px' }"
        >
          <el-table-column prop="name" label="收货人" align="center">
          </el-table-column>
          <el-table-column prop="tel" label="手机号" align="center">
          </el-table-column>
          <el-table-column prop="address" label="收货地址" align="center">
          </el-table-column>
        </el-table>
        <div :style="{ margin: '20px 0px' }">
          <i class="el-icon-collection-tag"></i>
          <span>基本信息</span>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="getRowClass"
          :cell-style="{ background: '#ffff', height: '60px' }"
        >
          <el-table-column prop="skus[0].id" label="商品编号" align="center">
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
          <el-table-column
            label="总价"
            align="center"
          >
          <span>{{skus.actual_price * skus.num}}</span>
          </el-table-column>
        </el-table>
        <div :style="{ margin: '20px 0px 0 0' }" class="total">
          <span>合计：</span>
          <span style="color: red">￥{{ skus.actual_price * skus.num }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/data";
import { getOrderDetail } from "@/api/oms";
export default {
  name: "OrderDetail",
  data() {
    return {
      active: 0,
      create_time: "",
      oederDetail: {},
      tableData: [],
      imgs: [],
      skus: [],
    };
  },
  methods: {
    getOrderDetail(order_id, status) {
      getOrderDetail({ order_id, status }).then((data) => {
        this.oederDetail = data.data;
        this.tableData.unshift(data.data);
        this.create_time = data.data.create_time;
        this.active = data.data.status + 1;
        this.skus = this.tableData[0].skus[0];
        this.imgs = JSON.parse(this.tableData[0].skus[0].imgs)[0];
      });
    },
    getRowClass(rowIndex) {
      return "background: #F2F6FC";
    },
  },
  created() {
    let { order_id, status } = this.$route.params;
    this.getOrderDetail(order_id, status);
  },
};
</script>

<style lang="scss" scoped>
.detail {
  padding: 50px 20px;
  margin: 0 150px;
  .main {
    margin-top: 50px;
  }
}
.main-top {
  height: 44px;
  line-height: 44px;
  color: red;
  span {
    color: #f56c6c;
  }
}
.el-icon-collection-tag {
  color: rgb(96, 98, 102);
}
.total {
  padding: 0 20px 0 0;
  text-align: right;
  font-size: 16px;
}
img {
  width: 100px;
  height: 100px;
}
</style>
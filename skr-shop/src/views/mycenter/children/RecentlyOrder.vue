<template>
  <div class="recently_order">
    <div class="order_top">
      <span>最近订单</span>
      <span>more+</span>
    </div>
    <div class="order_body">
      <el-table
        style="width: 100%"
        :data="tableData"
        @row-click="(row) => orderDetail(row)"
        :header-row-style="{
          height: '68px',
          color: 'black',
          padding: ' 0 14px',
        }"
      >
        <el-table-column prop="time" label="订单日期" width="248">
        </el-table-column>
        <el-table-column prop="code" label="订单号" width="248">
        </el-table-column>
        <el-table-column prop="title" label="商品信息" width="372">
        </el-table-column>
        <el-table-column prop="num" label="数量" width="124"> </el-table-column>
        <el-table-column prop="price" label="商品价格" width="124">
        </el-table-column>
        <el-table-column prop="statu" label="进度" width="124">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getUserOrder, getBackStockDetail } from "@/api/order.js";
import getFormDate from "@/utils/data.js";
export default {
  name: "RecentlyOrder",
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    getUserOrder() {
      let customer_id = this.$store.state.user.userInfo.id;
      getUserOrder({ customer_id }).then((data) => {
        if (data.code == 200) {
          const orderData = data.data;
          orderData.forEach(async (item, index) => {
            let time = getFormDate(item.update_time);
            let skus = item.skus[0];
            let statu = "";
            let res = await getBackStockDetail({ order_id: item.id });
            if (res.data.reason) {
              if (res.data.status == 1) {
                statu = "退货中";
              } else {
                statu = "退货完成";
              }
            } else {
              if (item.status == 0) {
                statu = "待支付";
              } else if (item.status == 1) {
                statu = "待发货";
              } else if (item.status == 2) {
                statu = "等待收货";
              } else if (item.status == 3) {
                statu = "已收货";
              }
            }

            let option = {
              time,
              code: item.code,
              title: skus.title,
              num: skus.num,
              price: skus.price,
              statu: statu,
              order_id: item.id,
              status: item.status,
            };
            this.tableData.push(option);
          });
        }
      });
    },
    orderDetail(row) {
      this.$router.push(`/orderdetail/${row.status}/${row.order_id}`);
    },
  },
  created() {
    this.getUserOrder();
  },
};
</script>

<style lang="scss" scoped>
.recently_order {
  width: 1240px;
  margin: 0 auto;
  .order_top {
    height: 36px;
    line-height: 36px;
    display: flex;
    justify-content: space-between;
    span {
      &:first-child {
        font-size: 24px;
        color: #000;
      }
      &:last-child {
        padding-right: 9px;
        font-size: 16px;
        color: #000;
        font-weight: 300;
      }
    }
  }
  .order_body {
    border-top: 2px solid #171717;
    border-bottom: 1px solid #171717;
    margin-bottom: 60px;
  }
}
</style>
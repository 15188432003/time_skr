<template>
  <div class="order_detail">
    <div class="title">
      <span> 订单号:{{ orderInfo.code }} </span>
      <span>
        {{ orderInfo.update_time }}
      </span>
    </div>
    <div class="card">
      <div class="step">
        <div class="step_wrapper">
          <el-steps
            :space="240"
            :active="orderInfo.status + 1"
            finish-status="success"
            :align-center="true"
          >
            <el-step title="待支付"></el-step>
            <el-step title="待发货"></el-step>
            <el-step title="等待收货"></el-step>
            <el-step title="已完成"></el-step>
          </el-steps>
        </div>
        <div class="step_return">
          <template v-if="!reasonGoing">
            <div class="btn_order" v-if="orderInfo.status == 0">
              <el-button type="danger" @click="payInto">立即付款</el-button>
              <p @click="delOrder">取消订单</p>
            </div>
            <div class="btn_return" v-else-if="orderInfo.status == 1">
              <el-button type="danger" @click="optionsShow = true"
                >退货</el-button
              >
            </div>
            <div class="btn_order" v-else-if="orderInfo.status == 2">
              <el-button type="danger" @click="optionsShow = true"
                >退货</el-button
              >
              <el-button type="primary" @click="isReceive">确认收货</el-button>
            </div>
            <div class="btn_order" v-else-if="orderInfo.status == 3">
              <span class="aleady">已收货</span>
              <el-button type="danger" @click="optionsShow = true">
                退货
              </el-button>
            </div>
          </template>
          <template v-else>
            <span v-if="reasonInfo.status == 1">退货中</span>
            <span v-else>退货完成</span>
          </template>
        </div>
      </div>
    </div>
    <div class="title">
      <span>商品清单</span>
    </div>
    <div class="card">
      <div class="list">
        <div class="list_img">
          <img :src="orderList.img" alt="" />
          <ul>
            <li>
              {{ orderList.title }}
            </li>
            <li>颜色:{{ orderList.param }}</li>
            <li>数量{{ orderList.num }}</li>
          </ul>
        </div>
        <div class="list_price">
          <p>¥{{ orderList.actual_price }}</p>
          <p>¥{{ orderList.price }}</p>
        </div>
      </div>
    </div>
    <div class="returnReason" v-if="reasonOption">
      <div class="title">
        <span>退货详情</span>
      </div>
      <div class="card card_reason">
        <p>订单编号: {{ orderInfo.id }}</p>
        <p>创建时间: {{ reasonInfo.time }}</p>
        <p>退货原因: {{ reasonInfo.value }}</p>
      </div>
    </div>
    <div class="card card_last">
      <div class="card_footer">
        <ul>
          <li>收货人信息</li>
          <li>姓名: {{ orderInfo.name }}</li>
          <li>电话: {{ orderInfo.tel }}</li>
          <li>地址: {{ orderInfo.address }}</li>
        </ul>
        <ul>
          <li>配送信息</li>
          <li>配送方式:{{ orderInfo.ecp || "------" }}</li>
          <li>运单号:{{ orderInfo.postid || "------" }}</li>
          <li>运费: ¥------</li>
        </ul>
        <ul>
          <li>付款信息</li>
          <li>商品数量:{{ orderList.num }}</li>
          <li>商品总额: ¥{{ tatolPrice }}</li>
          <li>应付金额: ¥{{ tatolReal }}</li>
        </ul>
      </div>
    </div>
    <div class="chooseWrapper" v-if="optionsShow">
      <div class="choose">
        <div class="choose_top">
          <span>填写退货信息</span>
          <span @click="showArea">x</span>
        </div>
        <div class="choose_body">
          <span>退款原因</span>
          <el-select v-model="value" placeholder="请选择退货原因">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            v-if="value === '其他'"
            class="textarea"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
        </div>
        <div class="choose_footer">
          <el-button @click="showArea">取消</el-button>
          <el-button type="primary" @click="isReturn">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getOrderDetail,
  deleteOrder,
  getBackStockDetail,
  addBackStock,
  updateOrder,
} from "@/api/order.js";
import getFormDate from "@/utils/data.js";
import { setItem } from "@/utils/sessionStorage.js";
import { getItem } from "@/utils/localStorage.js";
export default {
  name: "OrderDetail",
  data() {
    return {
      value: "",
      textarea: "",
      optionsShow: false,
      reasonOption: false,
      reasonGoing: false,
      orderInfo: [],
      options: [
        {
          value: "多拍/错拍",
          label: "多拍/错拍",
        },
        {
          value: "不想要了",
          label: "不想要了",
        },
        {
          value: "尺码/颜色错误",
          label: "尺码/颜色错误",
        },
        {
          value: "地址错误",
          label: "地址错误",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      orderList: {
        img: "",
        title: "",
        num: 0,
        param: "",
        actual_price: "",
        price: "",
      },
      reasonInfo: {
        time: "",
        value: "",
        status: 0,
      },
    };
  },
  computed: {
    tatolPrice() {
      return Number(this.orderList.num) * Number(this.orderList.price);
    },
    tatolReal() {
      return Number(this.orderList.num) * Number(this.orderList.actual_price);
    },
  },
  methods: {
    getOrderDetail() {
      let data = this.$route.params;
      getOrderDetail(data).then((data) => {
        this.orderInfo = data.data;
        this.orderInfo.update_time = getFormDate(
          this.orderInfo.update_time,
          "/"
        );
        this.orderList.img = JSON.parse(this.orderInfo.skus[0].imgs)[0].normal;
        this.orderList.param = JSON.parse(this.orderInfo.skus[0].param)[0];
        this.orderList.title = this.orderInfo.skus[0].title;
        this.orderList.actual_price = this.orderInfo.skus[0].actual_price;
        this.orderList.price = this.orderInfo.skus[0].price;
        this.orderList.num = this.orderInfo.skus[0].num;
        this.getBack();
      });
    },
    delOrder() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await deleteOrder({
          id: this.orderInfo.id,
        });
        if (res.code == 200) {
          this.$message.success("成功取消订单");
          setTimeout(() => this.$router.replace("/mycenter"), 1500);
        }
      });
    },
    //立即付款
    payInto() {
      let buyShopList = [];
      let params = [this.orderList.param];
      params.push("x");
      this.orderInfo.skus.forEach((item, index) => {
        let obj = {};
        obj.customer_id = getItem("userInfo").id;
        obj.id = index + "*";
        obj.img = JSON.parse(item.imgs)[JSON.parse(item.imgs).length - 1].small;
        obj.num = item.num;
        obj.params = params;
        obj.price = item.price;
        obj.sku_id = item.id;
        obj.store_id = 1;
        obj.special_price = item.actual_price;
        obj.title = item.title;
        buyShopList.push(obj);
      });
      let payList = JSON.stringify(buyShopList);
      setItem("payList", payList);
      this.$router.push("/paytotal");
    },
    //控制退货其他原因显示
    showArea() {
      this.optionsShow = false;
    },
    //退货处理
    isReturn() {
      if (!this.textarea && !this.value) {
        this.$message({
          type: "warning",
          message: "请选择退货原因",
        });
      } else {
        addBackStock({
          order_id: this.orderInfo.id,
          reason: this.value || this.textarea,
          money: this.orderInfo.money,
          imgs: JSON.stringify(this.orderList.img),
        }).then((data) => {
          if (data.code == 200) {
            this.$message.success("退货发起成功,等待商家处理");
            this.getOrderDetail();
            this.optionsShow = false;
          }
        });
      }
    },
    //获得退款原因
    getBack() {
      getBackStockDetail({ order_id: this.orderInfo.id }).then((data) => {
        if (data.data.reason) {
          this.reasonOption = true;
          this.reasonInfo.value = data.data.reason;
          let date = new Date().getTime();
          this.reasonInfo.time = getFormDate(date, "/");
          this.reasonGoing = true;
          this.reasonInfo.status = data.data.status;
        }
      });
    },
    //确认收货
    isReceive() {
      let { id, status } = this.orderInfo;
      updateOrder({ id, status: status + 1 }).then((data) => {
        if (data.code == 200) {
          this.getOrderDetail();
        }
      });
    },
    getBackStockDetail() {
      getBackStockDetail({ id: this.orderInfo.id }).then((data) => {
        console.log(data);
        if (data.data.reason) {
        }
      });
    },
  },
  created() {
    this.getOrderDetail();
  },
};
</script>

<style lang="scss" scoped>
.order_detail {
  width: 60%;
  margin: 30px auto;
  text-align: left;
  .title {
    margin-top: 10px;
    width: 100%;
    background-color: #f5f5f5;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
  }
  .card {
    width: 100%;
    padding: 20px;
    border: 1px solid #cccccc;
  }
  .step {
    display: flex;
    justify-content: space-between;
    height: 130px;
    .step_return {
      border-left: 1px solid #ccc;
      width: 20%;
      padding-top: 40px;
      text-align: center;
      .el-button {
        padding: 8px;
      }
      p {
        cursor: pointer;
        padding: 5px 10px;
        color: #1890ff;
      }
      .aleady {
        margin-right: 10px;
        color: #1890ff;
      }
    }
    .step_wrapper {
      width: 70%;
      padding-top: 40px;
    }
  }
  .list {
    display: flex;
    justify-content: space-between;
    .list_img {
      display: flex;
      justify-content: space-between;
      width: 70%;
      text-align: left;
      ul {
        width: 500px;
        padding-top: 10px;
        color: #999999;
        li {
          margin-top: 5px;
          &:first-child {
            color: #000000;
          }
        }
      }
      img {
        width: 100px;
        height: 100px;
        margin: 5px 10px;
      }
    }
    .list_price {
      padding-top: 30px;
      p {
        padding: 5px 0;
        &:last-child {
          text-decoration: line-through;
        }
      }
    }
  }
  .card_last {
    margin-top: 20px;
    padding: 40px;
    border: 1px solid #cccccc;
    .card_footer {
      display: flex;
      justify-content: space-between;
      ul {
        li {
          color: #999999;
          margin-bottom: 5px;
          &:first-child {
            font-size: 18px;
            font-weight: bold;
            color: #000;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
  .returnReason {
    .card_reason {
      p {
        margin: 4px 0;
        font-size: 15px;
      }
    }
  }
}

.chooseWrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  .choose {
    width: 520px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
    .choose_top {
      padding: 16px 24px;
      color: rgba(0, 0, 0, 0.65);
      background: #fff;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      justify-content: space-between;
      span {
        &:last-child {
          font-size: 16px;
          font-style: normal;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .choose_body {
      padding: 24px;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
      .textarea {
        margin-left: 77px;
        margin-top: 10px;
        width: 300px;
      }
      span {
        margin-right: 20px;
      }
    }
    .choose_footer {
      padding: 10px 16px;
      text-align: right;
      background: transparent;
      border-top: 1px solid #e8e8e8;
    }
  }
}
</style>


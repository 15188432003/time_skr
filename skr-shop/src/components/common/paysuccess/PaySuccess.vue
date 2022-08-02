<template>
  <div class="paySuccess">
    <div class="container">
      <div class="success">
        <div>
          <svg-icon
            icon-class="success"
            className="icon"
            height="20px"
            width="20px"
          ></svg-icon
          >支付成功
          <div>{{ time }}秒之后返回首页</div>
        </div>
        <div>
          <el-button type="success" @click="$router.replace('/home')">返回首页 {{ time }}</el-button>
          <el-button @click="$router.replace('/mycenter')">查看订单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { updateOrder } from "@/api/order";
import {removeItem} from '@/utils/sessionStorage'
import {getItem} from '@/utils/localStorage'
export default {
  data() {
    return {
      time: 5,
    };
  },
  created() {
    this.backIndex();
    let orderIds = JSON.parse(getItem("idLocal"));
    orderIds.forEach((val) => {
      updateOrder({
        id: val,
        status: 1,
      }).then((res) => {
        if (res.code == 200) {
          removeItem("payList");
        }
      });
    });
  },
  methods: {
    backIndex() {
      let timer = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(timer);
          this.$router.replace("/home");
        }
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.paySuccess {
  height: 470px;

  .container {
    width: 600px;
    margin: 0 auto;
    height: 100%;
    position: relative;

    .success {
      padding-top: 100px;
      text-align: center;

      div {
        font-size: 20px;
        margin-top: 30px;

        button {
          margin-left: 20px;
        }
      }
    }
  }
}
.icon{
    color: green;
}
</style>
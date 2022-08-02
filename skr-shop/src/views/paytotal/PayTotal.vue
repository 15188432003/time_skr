<template>
  <div class="pay_total">
    <h1>结算</h1>
    <div class="pay_body">
      <div class="pay_body_left">
        <ul>
          <li class="left_title">收货地址</li>
          <li class="left_section left_first">
            <div>
              <p>收货人:{{ defaultAddress.name }}-{{ defaultAddress.tel }}</p>
              <p>地址:{{ defaultAddress.address }}</p>
            </div>
            <div>
              <p v-show="defaultAddress.prime">默认地址</p>
              <p>
                <span @click="changeShow = true">编辑</span>/<span
                  @click="moreShow = true"
                  >更多</span
                >
              </p>
            </div>
          </li>
        </ul>
        <ul>
          <li class="left_title">商品明细(共{{ totalNum }}件)</li>
          <li class="left_section left_second">
            <ListRendom
              v-for="(item, index) in payList"
              :key="index"
              :paylist="item"
            />
          </li>
        </ul>
      </div>
      <div class="pay_body_right">
        <h2>请选择支付方式</h2>
        <div class="payimg">
          <img src="@/assets/image/order/wecart.jpeg" alt="" />
          <img src="@/assets/image/order/alipay.jpeg" alt="" />
        </div>
        <ul class="pay_tab">
          <li>商品小计</li>
          <li class="tab_list">
            <span>商品总价:</span><span>¥ {{ totalPrice }}</span>
          </li>
          <li class="tab_list">
            <span>优惠:</span><span>¥ {{ totalDiscounts }}</span>
          </li>
          <li class="tab_list"><span>其他:</span><span>¥ 0</span></li>
          <li>
            <div>
              <p>总计</p>
              <p>¥ {{ totalSpecialPrice }}</p>
            </div>
            <button @click="payOrder">提交订单</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="address_more" v-if="moreShow">
      <div class="address_title">
        <h2>请选择您的收货地址</h2>
        <div>
          <svg-icon
            @click="moreShow = false"
            icon-class="close"
            className="icon"
            width="24px"
            height="24px"
          ></svg-icon>
        </div>
      </div>
      <ul class="user_list">
        <li v-for="(item, index) in tableData" :key="index">
          <input
            type="radio"
            class="redio"
            name="address"
            :value="index"
            v-model="radio"
          />
          <div class="userinfo">
            <p>
              收货人: {{ item.name }} <span v-if="item.prime">默认地址</span>
            </p>
            <p>地址: {{ item.address }}</p>
          </div>
          <div class="action_address">
            <p @click="changeAddress(index)">编辑</p>
            <p v-if="!item.prime" @click="changeDefault(index)">设为默认地址</p>
          </div>
        </li>
      </ul>
      <div class="user_address_footer">
        <div>
          <label @click="addressShow = true">
            <svg-icon icon-class="add" className="icon"></svg-icon>
            新增收货地址
          </label>
        </div>
        <div><button @click="isAddress">确认</button></div>
      </div>
    </div>

    <AddWrapper
      v-if="addressShow"
      :addShow="addShow"
      :getAddress="getAddress"
    />
    <ChangeAddress
      v-if="changeShow"
      :changeShows="changeShows"
      :getAddress="getAddress"
      :addInfo="changesAddress"
    />
  </div>
</template>

<script>
import { getItem } from "@/utils/sessionStorage.js";
import ListRendom from "./children/ListRendom.vue";
import { getAddress, defaultAddress } from "@/api/address.js";
import AddWrapper from "@/components/common/address/AddressWrapper.vue";
import ChangeAddress from "@/components/common/address/ChangeAddress.vue";
import { setItem, getItem as getItems } from "@/utils/localStorage.js";
import {deleteShopCar} from '@/api/shopCar'
import {addOrder , payOrder} from '@/api/order'
import {getVoucher} from '@/api/voucher.js'
export default {
  name: "PayTotal",
  components: { ListRendom, AddWrapper, ChangeAddress },
  data() {
    return {
      payList: [],
      tableData: [],
      defaultAddress: {},
      changesAddress: {},
      addressShow: false,
      changeShow: false,
      moreShow: false,
      radio: 1,
    };
  },
  computed: {
    totalPrice() {
      return this.payList.reduce((start, item) => {
        return start + item.price * item.num;
      }, 0);
    },
    totalSpecialPrice() {
      return this.payList.reduce((start, item) => {
        return start + item.special_price * item.num;
      }, 0);
    },
    totalDiscounts() {
      return this.totalPrice - this.totalSpecialPrice;
    },
    totalNum() {
      return this.payList.reduce((start, item) => {
        return start + item.num;
      }, 0);
    },
  },
  methods: {
    getAddress() {
      this.id = this.$store.state.user.userInfo.id;
      getAddress({ customer_id: this.id }).then((data) => {
        this.tableData = data.data;
        this.defaultAddress = this.tableData.filter((item, index) => {
          if (item.prime) this.radio = index;
          return item.prime;
        })[0];
        this.changesAddress = this.defaultAddress;
      });
    },
    addShow() {
      this.addressShow = false;
    },
    changeShows() {
      this.changeShow = false;
    },
    changeAddress(index) {
      this.changeShow = true;
      this.changesAddress = this.tableData[index];
    },
    changeDefault(index) {
      const { id, customer_id } = this.tableData[index];
      defaultAddress({ id, prime: 1, customer_id }).then((data) => {
        if (!data.code == 200) {
          this.$message({
            type: "info",
            message: data.message,
          });
        } else {
          this.getAddress();
          this.$message({
            type: "success",
            message: data.message,
          });
        }
      });
    },
    isAddress() {
      this.moreShow = false;
      this.defaultAddress = this.tableData[this.radio];
    },
    payOrder() {
      let store_id_list = [];
      this.payList.forEach((item) => {
        store_id_list.push(item.store_id);
      });
      let order = [];
      store_id_list.forEach((el) => {
        let type = {};
        type.store_id = el;
        type.skus = [];
        type.money = 0;
        this.payList.forEach((item) => {
          if (item.store_id == el) {
            let obj = {};
            type.money += item.special_price - 0;
            obj.sku_id = item.sku_id;
            obj.price = item.price;
            obj.actual_price = item.special_price;
            obj.num = item.num;
            type.skus.push(obj);
          }
        });
        order.push(type);
      });
      let idLocal = [];
      let userInfo = getItems("userInfo");
      order.forEach((item, index) => {
        //设置code订单编号(不能重复)
        let code = userInfo.username + index + userInfo.id + Date.now();
        addOrder({
          code,
          store_id: item.store_id,
          customer_id: userInfo.id,
          money: this.totalPrice,
          skus: JSON.stringify(item.skus),
        }).then((res) => {
          console.log(res);
          if (res.code == 200) {
            idLocal.push(res.orderId);
            setItem(JSON.stringify(idLocal), "idLocal");
          }
        });
      });
      payOrder({
        outTradeNo:
          userInfo.username + userInfo.id + Date.now(),
        totalAmount: this.totalSpecialPrice,
        subject: userInfo.username + "'s shopping order",
        body:
          userInfo.username +
          `is paying for ${this.payList[0].title} ...`,
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("jumping to alipay page");
          setTimeout(() => location.replace(res.data), 1000);
        }
      });
      //删除购物车
      this.payList.forEach((item) => {
        deleteShopCar({ id: item.id }).then(data=>{
          console.log(data);
        })

      });
    },
  },
  created() {
    this.payList = JSON.parse(getItem("payList"));
    this.getAddress();
    getVoucher({store_id:1}).then(data=>{
      console.log(data);
    })
  },
};
</script>

<style lang="scss" scoped>
.pay_total {
  width: 75vw;
  margin: 0 auto;
  text-align: left;
  & > h1 {
    padding: 20px;
    font-weight: 500;
  }
  .pay_body {
    display: flex;
    .pay_body_left {
      flex: 2;
      ul {
        width: 100%;
        .left_title {
          color: #fff;
          width: 100%;
          height: 50px;
          line-height: 50px;
          padding: 0 20px;
          background-color: #4c4c4c;
        }
        .left_first {
          display: flex;
          justify-content: space-between;
          p {
            color: #999999;
            font-size: 16px;
            line-height: 30px;
          }
          div {
            &:first-child {
              padding: 20px 25px;
              width: 85%;
              height: 100px;
            }
            &:last-child {
              padding-top: 30px;
              height: 100px;
              p {
                &:first-child {
                  background-color: #000;
                  color: #ffffff;
                  font-size: 12px;
                  width: 55px;
                  padding: 2px;
                  line-height: 20px;
                  cursor: pointer;
                  border-radius: 2px;
                }
                &:last-child {
                  span {
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
        .left_second {
          width: 100%;
          padding: 20px;
        }
        .left_section {
          border: 1px solid #cccccc;
          margin-bottom: 5px;
        }
      }
    }
    .pay_body_right {
      padding: 0 20px;
      flex: 1;
      h2 {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        font-size: 2em;
      }
      .payimg {
        display: flex;
        justify-content: space-between;
        img {
          width: 50%;
          height: 120px;
          &:last-child {
            border: 1px solid black;
          }
        }
      }
      .pay_tab {
        margin-top: 60px;
        width: 100%;
        border: 1px solid #cccccc;
        li {
          border-bottom: 1px solid #ccc;
          &:first-child {
            font-size: 16px;
            margin: 0;
            padding: 0 10px;
            background-color: #f6f6f6;
            height: 50px;
            line-height: 50px;
          }

          &:last-child {
            border: none;
            height: 100px;
            margin: 0 10px;
            display: flex;
            justify-content: space-between;
            div {
              p {
                &:first-child {
                  line-height: 50px;
                  font-size: 13px;
                }
                &:last-child {
                  font-size: 18px;
                  font-weight: bolder;
                }
              }
            }
            button {
              margin-top: 30px;
              width: 150px;
              height: 40px;
              text-align: center;
              line-height: 40px;
              background-color: #ed4025;
              color: #fff;
              border: none;
              outline: none;
              appearance: none;
              cursor: pointer;
            }
          }
        }
        .tab_list {
          height: 50px;
          line-height: 50px;
          margin: 0 10px;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }
      }
    }
  }
  .address_more {
    position: fixed;
    width: 700px;
    background-color: #fff;
    box-shadow: 2px 2px 5px #cccccc;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    padding: 20px;
    .address_title {
      display: flex;
      justify-content: space-between;
      height: 50px;
      line-height: 50px;
      width: 100%;
      border-bottom: 2px solid #e6e6e6;
      h2 {
        font-weight: 500;
      }
    }
    .user_list {
      li {
        color: rgba(0, 0, 0, 0.65);
        text-align: left;
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #e6e6e6;
        .redio {
          line-height: 100px;
          margin: 0;
        }
        .userinfo {
          flex: 0.8;
          padding: 20px 25px;
          height: 100px;
          p {
            color: #999999;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
            span {
              background-color: #000;
              color: #ffffff;
              font-size: 12px;
              width: 55px;
              padding: 2px;
              border-radius: 2px;
            }
          }
        }
        .action_address {
          flex: 0.18;
          height: 100px;
          padding-top: 30px;
          p {
            height: 20px;
            line-height: 20px;
            cursor: pointer;
          }
        }
      }
    }
    .user_address_footer {
      height: 50px;
      width: 100%;
      line-height: 50px;
      text-align: end;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      div {
        &:first-child {
          label {
            cursor: pointer;
          }
        }
        &:last-child {
          button {
            cursor: pointer;
            background-color: #4c4c4c;
            color: #ffffff;
            padding: 0 25px;
            height: 40px;
            line-height: 38px;
            border: 1px solid #979797;
            border-radius: 0;
            margin: 10px 10px;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="shop_car">
    <div class="shopcar">
      <div class="shopcar_header">
        <span>我的购物车</span> <span>共 {{ toatlLength }} 件</span>
      </div>
      <div class="allcheck">
        <label>
          <input
            type="checkbox"
            @click="allChecked"
            v-model="allCheck"
            class="checkbox"
          />
          <span>&nbsp;全选</span>
        </label>
      </div>
      <div class="shop_list">
        <ul>
          <li v-for="(item, index) in carList" :key="index">
            <div class="checks">
              <input
                v-model="checkList[index]"
                type="checkbox"
                class="checkbox"
              />
            </div>
            <div>
              <img :src="item.img" alt="" />
            </div>
            <div class="infoConetent">
              <ul class="infoConetent_left">
                <li>
                  <h3>{{ item.title }}</h3>
                </li>
                <li>
                  <span>颜色:{{ item.params[0] }}</span> ;
                  <span>尺码:{{ item.params[1] }}</span>
                </li>
                <li>
                  <span>数量:</span
                  ><button @click="reduceShopCar(index)">-</button
                  ><button>{{ nums[index] }}</button
                  ><button @click="addShopCar(index)">+</button>
                </li>
              </ul>
              <ul class="infoConetent_right">
                <li>¥{{ item.special_price }}</li>
                <li>¥{{ item.price }}</li>
                <li @click="deleteShopCar(index)">删除</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="shopcar_footer">
      <div class="footer_body">
        <div class="total_price">
          <p>总价</p>
          <p>¥ {{ toatlPrice }}</p>
        </div>
        <button @click="payInto">结算</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getShopCar, updateShopCar, deleteShopCar } from "@/api/shopCar.js";
import { setItem } from "@/utils/sessionStorage.js";
export default {
  name: "ShopCar",
  data() {
    return {
      carList: [],
      checkList: [],
      allCheck: false,
      useAdd: false,
      nums: [],
      timer: null,
      reduceTimer: null,
    };
  },
  computed: {
    toatlLength() {
      return this.carList.length;
    },
    toatlPrice() {
      let carLists = this.carList.filter((item, index) => {
        return this.checkList[index];
      });
      return carLists.reduce((one, item) => {
        return one + item.special_price * item.num;
      }, 0);
    },
  },
  methods: {
    allChecked() {
      if (this.allCheck) {
        this.checkList = new Array(this.checkList.length).fill(false);
      } else {
        this.checkList = new Array(this.checkList.length).fill(true);
      }
    },
    getShopCar() {
      const customer_id = this.$store.state.user.userInfo.id;
      getShopCar({ customer_id }).then((data) => {
        if (data.code == 200) {
          let carList = data.data;
          carList.forEach((item, index) => {
            item.params = JSON.parse(item.params);
            this.nums[index] = item.num;
          });
          this.carList = carList;
          this.checkList =
            this.$store.state.common.checkList ||
            new Array(carList.length).fill(false);
          if (this.checkList.length < carList.length)
            this.checkList = new Array(carList.length).fill(false);
        } else {
          this.carList = [];
          this.$store.dispatch("common/checkList", null);
          this.allCheck = false;
        }
        this.$store.dispatch('shopCar/setShopList',this.carList)
      });
    },
    addShopCar(index) {
      clearTimeout(this.timer);
      let num = this.nums[index] + 1;
      this.$set(this.nums, index, num);
      this.timer = setTimeout(() => {
        const { id } = this.carList[index];
        const num = this.nums[index];
        updateShopCar({ id, num }).then((data) => {
          if (data.code == 200) {
            this.getShopCar();
            this.$message({
              type: "success",
              message: "购物车修改成功",
            });
          }
        });
      }, 500);
    },
    reduceShopCar(index) {
      if (this.nums[index] == 1) {
        return;
      }
      clearTimeout(this.reduceTimer);
      let num = this.nums[index] - 1;
      this.$set(this.nums, index, num);
      this.reduceTimer = setTimeout(() => {
        const { id } = this.carList[index];
        const num = this.nums[index];
        updateShopCar({ id, num }).then((data) => {
          if (data.code == 200) {
            this.getShopCar();
            this.$message({
              type: "success",
              message: "购物车修改成功",
            });
          }
        });
      }, 500);
    },
    deleteShopCar(index) {
      const { id } = this.carList[index];
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let newList = this.checkList;
          newList.splice(index, index + 1);
          this.checkList = newList;
          deleteShopCar({ id }).then((data) => {
            this.getShopCar();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    payInto() {
      let payList = JSON.stringify(
        this.carList.filter((item, index) => {
          return this.checkList[index];
        })
      );
      setItem("payList", payList);
      this.$router.push("/paytotal");
    },
  },
  created() {
    this.getShopCar();
    this.allCheck = false;
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('common/checkList',null)
    next()
  },
  watch: {
    checkList(val) {
      this.$store.dispatch("common/checkList", val);
      let flag = true;
      val.forEach((item) => {
        if (!item) {
          flag = false;
          return;
        }
      });
      if (flag) {
        this.allCheck = true;
      } else {
        this.allCheck = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.shopcar {
  text-align: left;
  max-width: 1200px;
  margin: 30px auto 80px;
  .shopcar_header {
    position: relative;
    height: 50px;
    line-height: 50px;
    margin-top: 0;
    margin-bottom: 0.5em;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    span {
      &:first-child {
        font-size: 28px;
        font-weight: 600;
        vertical-align: middle;
      }
      &:last-child {
        font-size: 12px;
        color: #999;
        margin-left: 10px;
        display: inline-block;
        line-height: 35px;
        vertical-align: bottom;
        font-weight: 400;
      }
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      display: block;
      width: 55px;
      height: 4px;
      background-color: #000;
    }
  }
  .allcheck {
    margin: 5px 0 15px;
    line-height: 18px;
    span {
      font-size: 12px;
      line-height: 18px;
      vertical-align: top;
    }
  }
  .shop_list {
    & > ul {
      & > li {
        width: 100%;
        height: 140px;
        border-bottom: 1px solid #c3c3c3;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 20px 0;
        & > div {
          &:first-child {
            width: 40px;
          }
          &:nth-child(2) {
            width: 100px;
            height: 100px;
            margin: 0 25px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          &:last-child {
            display: flex;
            flex: 1;
            justify-content: space-between;
            .infoConetent_left {
              li {
                &:last-child {
                  button {
                    width: 30px;
                    height: 26px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    text-align: center;
                    background: #fff;
                    cursor: pointer;
                    &:nth-child(3) {
                      width: 78px;
                      margin: 0 5px;
                      cursor: default;
                    }
                  }
                }
              }
            }
            .infoConetent_right {
              li {
                &:first-child {
                  font-size: 16px;
                  color: #000;
                  font-weight: 500;
                }
                &:nth-child(2) {
                  color: #777;
                  text-decoration: line-through;
                }
                &:last-child {
                  cursor: pointer;
                  margin-top: 5px;
                  font-size: 16px;
                  color: #000;
                  font-weight: 500;
                }
              }
            }
          }
        }
      }
    }
  }
  //全局
  .checkbox {
    height: 15px;
    width: 15px;
    border-radius: 0;
    cursor: pointer;
  }
}
.shopcar_footer {
  width: 100%;
  height: 70px;
  background-color: #3e3e3e;
  .footer_body {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    padding-top: 15px;
    .total_price {
      color: #fff;
      margin-right: 50px;
      width: 80px;
      text-align: left;
      border-right: 1px solid #999;
    }
  }
  button {
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
</style>  
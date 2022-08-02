<template>
  <div>
    <div class="sideMenu" ref="sideMenu">
      <div class="side_M">
        <div class="side_bar" @click="shopCar">
          <svg-icon
            icon-class="menu"
            className="icon"
            class="icon_menu"
            width="14px"
            height="14px"
          ></svg-icon>
        </div>
        <div class="quick_history" @click="historyPage">
          <svg-icon
            icon-class="time"
            className="icon"
            class="icon_time"
            width="18px"
            height="18px"
          ></svg-icon>
        </div>
      </div>
      <div class="arrow_bar">
        <i class="up" @click="backtop" v-show="ON">
          <svg-icon
            icon-class="arrowup"
            className="icon"
            class="icon_arrowup"
            width="14px"
            height="14 px"
          ></svg-icon>
        </i>
        <i class="down" @click="backbottom" v-show="DOWN">
          <svg-icon
            icon-class="arrowdown"
            className="icon"
            class="icon_arrowdown"
            width="14px"
            height="14px"
          ></svg-icon>
        </i>
      </div>
    </div>
    <div class="expand" ref="expand">
      <div class="service" v-if="isShow">
        <header>
          <h3>购物车</h3>
          <div class="fork" @click="clock">
            <i>
              <svg-icon
                icon-class="error"
                className="icon"
                class="icon_error"
                width="30px"
                height="30px"
              ></svg-icon>
            </i>
          </div>
        </header>
        <p class="shopCar">
          <span>共 {{ shopCarList.lebgth && 0 }} 件宝贝</span>
          <button @click="INTO">管理</button>
        </p>
        <div class="leary">
          <ul>
            <li
              v-for="(item, index) in [] && $store.state.shopCar.shopList"
              :key="index"
            >
              <img :src="item.img" alt="" />
              <div class="detail">
                <h4>{{ item.title }}</h4>
                <span class="num">数量：{{ item.num }}</span>
                <p>
                  ￥ {{ item.price }}
                  <span>￥ {{ item.special_price }}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="historyPage" v-else>
        <div class="header">
          <h2>SKR线上</h2>
          <div class="fork" @click="clock">
            <i>
              <svg-icon
                icon-class="error"
                className="icon"
                class="icon_error"
                width="30px"
                height="30px"
              ></svg-icon>
            </i>
          </div>
        </div>
        <div class="text">
          <div class="ser-text" v-if="$store.state.user.token">
            <div class="content"></div>
            <textarea
              placeholder="客服将尽快回复您"
              cols="30"
              rows="10"
            ></textarea>
            <button>
              <span>发送</span>
            </button>
          </div>
          <div class="ser-mask" v-else>
            <button @click="ser">
              <span>请登录</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShopCar } from "@/api/shopCar";
export default {
  name: "SideMenu",
  data() {
    return {
      flag: true,
      ON: "",
      DOWN: true,
      isShow: false,
      textShow: false,
      shopCarList: [],
    };
  },
  methods: {
    backtop() {
      if (this.flag) {
        this.flag = false;
        console.log(223213216);
        window.scrollTo({
          top: "-65px",
          behavior: "smooth",
        });
      }
    },
    backbottom() {
      let to = document.documentElement.offsetHeight;
      if (this.flag) {
        this.flag = false;
        window.scrollTo({
          top: to,
          behavior: "smooth",
        });
      }
    },
    Scrollbottom() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop == 0) {
        this.flag = true;
        this.ON = false;
      } else if (scrollTop + clientHeight >= scrollHeight) {
        this.flag = true;
        this.DOWN = false;
      } else {
        this.DOWN = true;
        this.ON = true;
      }
    },
    shopCar() {
      this.isShow = true;
      this.$refs.expand.style.right = "0px";
      this.$refs.sideMenu.style.right = "300px";
    },
    historyPage() {
      this.isShow = false;
      if (this.$store.state.user.token) {
        this.textShow = true;
      } else {
        this.textShow = false;
      }
      this.$refs.expand.style.right = "0px";
      this.$refs.sideMenu.style.right = "300px";
    },
    clock() {
      this.$refs.expand.style.right = "-300px";
      this.$refs.sideMenu.style.right = "0px";
    },
    INTO() {
      if (this.$store.state.user.token) {
        this.$router.push("/shopcar");
      } else {
        this.$router.push("/login");
      }
    },
    ser() {
      this.$router.push("/login");
    },
  },
  created() {
    window.addEventListener("scroll", this.Scrollbottom);
    if (this.$store.state.user.token) {
      getShopCar({
        customer_id: this.$store.state.user.userInfo.id,
      }).then((data) => {
        this.$store.dispatch("shopCar/setShopList", data.data);
      });
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.Scrollbottom);
  },
};
</script>

<style lang="scss" scoped>
.sideMenu {
  position: fixed;
  right: 0;
  bottom: 30px;
  width: 55px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  padding: 10px 0;
  background-color: #0d0d0d;
  transition: all 0.7s;
  z-index: 999;
  .side_M {
    width: 55px;
    background-color: #0d0d0d;
    transition: all 0.5s;
    .side_bar {
      width: 100%;
      padding: 11px 0;
    }
    .quick_history {
      padding: 11px 0;
    }
  }
  .arrow_bar {
    text-align: center;
    background-color: #0d0d0d;
    margin: 5px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    .up {
      display: block;
      width: 55px;
      height: 35px;
      line-height: 35px;
      text-align: center;
    }
    .down {
      display: block;
      width: 55px;
      height: 35px;
      line-height: 35px;
      text-align: center;
    }
  }
}
.expand {
  position: fixed;
  bottom: 0;
  right: -300px;
  width: 300px;
  height: 100vh;
  transition: all 0.7s;
  z-index: 999;
  .service {
    position: relative;
    width: 300px;
    height: 100%;
    background-color: #fff;
    border: 2px solid #333;
    box-shadow: 10px 10px 10px 5px #333;
    overflow-y: scroll;
    header {
      h3 {
        width: 300px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background-color: #000;
        color: #fff;
        font-weight: 500;
      }
      .fork {
        position: absolute;
        top: 15px;
        right: 20px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-weight: 700;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
        z-index: 10000;
      }
    }
    .shopCar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      background-color: #ccc;
      padding: 0 10px;
      font-size: 12px;
      button {
        width: 50px;
        height: 20px;
        border: 0;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
      }
    }
    .leary {
      width: 90%;
      margin: 20px auto;
      text-align: center;
      ul {
        height: 100%;
        width: 100%;
        li {
          height: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            width: 60px;
            height: 60px;
          }
          .detail {
            margin-left: 10px;
            flex: 1;
            text-align: left;
            font-size: 12px;
            h4 {
              line-height: 25px;
              height: 25px;
              width: 100px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .num {
              font-size: 12px;
            }
            p {
              color: #000;
              span {
                color: #bdb6b3;
                text-decoration-line: line-through;
              }
            }
          }
        }
      }
    }
  }
  .historyPage {
    position: fixed;
    bottom: 0;
    width: 300px;
    height: 500px;
    background-color: #fff;
    border: 2px solid #333;
    box-shadow: 10px 10px 10px 5px #333;
    .header {
      width: 300px;
      height: 60px;
      line-height: 60px;
      font-weight: 500;
      text-align: center;
      background-color: #000;
      h2 {
        color: #fff;
      }
      .fork {
        position: absolute;
        top: 15px;
        right: 20px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-weight: 700;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
        z-index: 10000;
      }
    }
    .text {
      position: relative;
      width: 100%;
      height: 430px;
      padding: 5px;
      overflow: auto;
      background-color: #ddd;
      .ser-text {
        .content {
          padding: 20px 0;
          height: 380px;
          overflow: auto;
        }
        textarea {
          right: 60px;
          position: absolute;
          width: 230px;
          bottom: 0px;
          height: 23px;
          min-height: 23px;
          max-height: 107px;
          overflow-y: hidden;
        }
        button {
          position: absolute;
          right: 5px;
          bottom: 0;
          span {
            display: inline-block;
            transition: margin-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            pointer-events: none;
          }
        }
      }
      .ser-mask {
        position: relative;
        width: 100%;
        height: 100%;
        background: #fff;
        button {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -100%);
          width: 100px;
          height: 40px;
          font-size: 18px;
          font-weight: 600;
          background-color: #000;
          border-radius: 5px;
          color: #fff;
          box-shadow: 1px 2px 10px 1px #666262;
          border: 0;
          box-sizing: border-box;
          span {
            display: inline-block;
            transition: margin-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            pointer-events: none;
          }
        }
      }
    }
  }
}
</style>
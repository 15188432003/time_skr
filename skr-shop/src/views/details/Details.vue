<template>
  <div id="details">
    <div class="detail_top">
      <span class="retbtn" @click="$router.back()">Go back</span>
      <span class="retbtn" @click="$router.go(1)">Go forward</span>
    </div>
    <div class="good">
      <div class="good_left">
        <div class="wrap">
          <div class="left">
            <img class="leftImg" ref="bigImgLeft" :src="picture" />
            <!-- 蒙层 -->
            <div class="top" ref="mask" v-show="topShow"></div>
            <div
              class="maskTop"
              @mouseenter="isEnterHandler(true)"
              @mousemove="moveHandler"
              @mouseout="isEnterHandler(false)"
            ></div>
          </div>
          <div class="right" v-show="rShow">
            <img
              :style="r_img"
              ref="bigImgRight"
              class="rightImg"
              :src="picture"
            />
          </div>
        </div>
        <div class="imgList">
          <ul>
            <li v-for="(item, index) in goodType" :key="index">
              <img :src="item.small" @click="changeLeft(item.normal)" />
            </li>
          </ul>
        </div>
      </div>
      <div class="good_right">
        <div class="detailsTop">
          <h3>{{ title }}</h3>
          <div class="prices">
            <span class="price">￥ {{ price }}</span>
            <span class="priceSpecial underline">￥ {{ special_price }}</span>
          </div>
          <div class="promoteSales">
            <span class="popular" v-if="is_special">{{
              is_special == 1 ? "促销" : "抢购"
            }}</span>
            <span class="con">官方商城全场包邮</span>
          </div>
        </div>
        <div class="detailsMiddle">
          <ul>
            <li v-for="(item, index) in goodType" :key="index">
              <img
                :class="{ img_border: index == changeOne }"
                :src="item.small"
                @click="changeRight(index)"
              />
            </li>
          </ul>
        </div>
        <div class="detailsDown">
          <div class="choose">
            <label for="size" label-width="50%">尺码</label>
            <select width="80px" name="size" id="size" v-model="styleSize">
              <option :value="item" v-for="(item, index) in sizes" :key="index">
                {{ item }}
              </option>
            </select>
            <label for="count">数量: </label>
            <input
              id="count"
              type="number"
              max="10"
              min="1"
              v-model="shopNum"
            />
          </div>
          <div class="chooses">
            <el-button type="primary" @click="addShop">加入购物车</el-button>
            <el-button type="success" @click="buyNow">立即购买</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="detailImg">
      <DetailSortNav
        @changeNav="whichOne"
        ref="detailImg"
        :currentindexOn="0"
      />
      <DetailImg :detailImgs="goodType.length > 0 ? goodType : []" />
    </div>
    <div class="review">
      <DetailSortNav @changeNav="whichOne" ref="REVIEW" :currentindexOn="1" />
      <Reviews />
    </div>
    <div class="q_a">
      <DetailSortNav @changeNav="whichOne" ref="Q_A" :currentindexOn="2" />
      <Qa />
    </div>
    <div class="return_delivery">
      <DetailSortNav @changeNav="whichOne" ref="RETURN" :currentindexOn="3" />
      <ReturnDelivery />
    </div>
  </div>
</template>

<script>
import { getGoodId, getGoodType, getstoreSku } from "@/api/details";
import { addShopCar } from "@/api/shopCar";
import { setItem } from "@/utils/sessionStorage.js";
import DetailSortNav from "./childrens/detailnav/DetailSortNav.vue";
import DetailImg from "./childrens/detail/DetailsImg.vue";
import Reviews from "./childrens/review/Review.vue";
import Qa from "./childrens/qa/Qa.vue";
import ReturnDelivery from "./childrens/return&delivery/Returns.vue";
export default {
  name: "Details",
  props: ["id"],
  components: {
    DetailSortNav,
    DetailImg,
    Reviews,
    Qa,
    ReturnDelivery,
  },
  data() {
    return {
      // topStyle: { transform: "" },
      picture: "",
      r_img: {},
      topShow: false,
      rShow: false,
      mackWidth: "",
      mackHeight: "",
      imgWidthLeft: "",
      imgWidthRight: "",
      currentStyle: "",
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      styleSize: "XS",
      shopNum: 1,
      //试用数据
      title: "",
      price: "",
      special_price: "",
      goodType: [],
      is_special: "",
      typeChange: "",
      payList: {},
      payListTwo: {},
      // param: [],
      colors: [],
      color:'',
      changeOne: undefined,
      shopCarId: "",
    };
  },
  methods: {
    //鼠标移入
    isEnterHandler(isEnter) {
      this.topShow = isEnter;
      this.rShow = isEnter;
      this.imgWidthLeft = this.$refs.bigImgLeft.offsetWidth;
      if (isEnter) {
        var finalStyle = this.$refs.mask.currentStyle
          ? this.$refs.mask.currentStyle
          : document.defaultView.getComputedStyle(this.$refs.mask, null);
        this.mackWidth = parseFloat(finalStyle.width);
        this.mackHeight = parseFloat(finalStyle.height);
      }
    },
    //鼠标移动
    moveHandler() {
      this.imgWidthRight = this.$refs.bigImgRight.offsetWidth;
      let x = event.offsetX;
      let y = event.offsetY;
      let mask = this.$refs.mask;
      let big = this.$refs.bigImgRight;
      let halfMackWidth = this.mackWidth;
      let halfMackHeight = this.mackHeight;
      let topX = x - halfMackWidth / 2 < 0 ? 0 : x - halfMackWidth / 2;
      let topY = y - halfMackHeight / 2 < 0 ? 0 : y - halfMackHeight / 2;
      if (topX > this.imgWidthLeft - halfMackWidth)
        topX = this.imgWidthLeft - halfMackWidth;
      if (topY > this.imgWidthLeft - halfMackHeight)
        topY = this.imgWidthLeft - halfMackHeight;
      // 通过 transform 进行移动控制，延x轴y轴方向移动多少像素
      // this.topStyle.transform = `translate(${topX}px,${topY}px)`
      // this.r_img.transform = `translate(-${this.imgWidthRight*((topX)/this.imgWidthLeft)}px,-${this.imgWidthRight*((topY)/this.imgWidthLeft)}px)`
      //
      mask.style.left = topX + "px";
      mask.style.top = topY + "px";
      big.style.left =
        -(this.imgWidthRight * (topX / this.imgWidthLeft)) + "px";
      big.style.top = -(this.imgWidthRight * (topY / this.imgWidthLeft)) + "px";
    },
    //获取商品
    goodList_details() {
      let id = this.$route.params.id;
      let data = { id };
      //获取商品
      getGoodId(data).then((data) => {
        this.payList = data.data[0];
        this.title = data.data[0].title;
        this.price = data.data[0].price;
        this.special_price = data.data[0].special_price;
        this.picture = data.data[0].img;
        this.is_special = data.data[0].is_special;
      });
      let types = {
        spu_id: this.$route.params.id,
      };
      //获取商品类型
      getGoodType(types).then((data) => {
        console.log(data);
        (this.shopCarId = data.data[0].id), (this.payListTwo = data.data[0]);
        this.goodType = JSON.parse(data.data[0].imgs);
        this.colors = JSON.parse(data.data[0].param);
      });
    },
    //跳转到指定的标签
    whichOne(ref) {
      this.$refs[ref].$el.scrollIntoView(true);
    },
    //加入购物车
    addShop() {
      let token = this.$store.state.user.token;
      if (!token) {
        this.$confirm("未登录, 是否登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push({
              name: "Login",
              params: {
                direct: `/details/${this.$route.params.id}`,
              },
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消登录",
            });
          });
      } else {
        let data = {
          customer_id: JSON.parse(window.localStorage.userInfo).id,
          params: [this.color, this.styleSize],
          num: this.shopNum,
          sku_id: this.shopCarId,
        };
        addShopCar(data).then((data) => {
          this.$router.push(`/shopcar`);
        });
      }
    },
    changeLeft(normal) {
      this.picture = normal;
    },
    changeRight(index) {
      this.picture = this.goodType[index].normal;
      this.changeOne = index;
      console.log(this.colors[index]);
      this.color = this.colors[index];
    },
    //跳转支付页面
    buyNow() {
      if (!this.changeOne && this.changeOne !== 0) {
        this.$message({
          type: "warning",
          message: "请选择颜色",
        });
        return;
      } else {
        let token = this.$store.state.user.token;
        if (token) {
          let params = [this.param, this.styleSize];
          let payOption = {
            customer_id: this.$store.state.user.userInfo.id,
            img: this.payList.img,
            name: "skrshop",
            num: this.shopNum,
            params: params,
            price: this.payListTwo.price,
            sku_id: this.payListTwo.id,
            special_price: this.payListTwo.special_price,
            spu_id: this.payListTwo.spu_id,
            store_id: this.payList.store_id,
            title: this.payListTwo.title,
          };
          let payList = [payOption];
          setItem("payList", JSON.stringify(payList));
          this.$router.push("/paytotal");
        } else {
          this.$confirm("未登录, 是否登录?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$router.push({
                name: "Login",
                params: {
                  direct: `/details/${this.$route.params.id}`,
                },
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消登录",
              });
            });
        }
      }
    },
  },
  created() {
    this.goodList_details();
  },
};
</script>

<style lang="scss" scoped>
#details {
  width: 1240px;
  height: 100%;
  margin: 20px auto 0;
  .detail_top {
    text-align: left;
    .retbtn {
      text-align: left;
      color: #1890ff;
      font-size: 14px;
      display: inline-block;
      padding: 5px 8px;
      cursor: pointer;
      margin: 10px 0;
    }
  }

  .back_or_forward {
    margin: 30px 0 40px;
    background-color: #fff;
    color: skyblue;
  }
  .good {
    margin-bottom: 100px;
    display: flex;
    // justify-content: center;
    .good_right {
      width: 485px;
      margin-left: 30px;
      height: 625px;
      .detailsTop {
        height: 250px;
        border-bottom: 2px solid #000;
        h3 {
          font-size: 30px;
        }
        span {
          color: #b0b0b0;
        }
        .prices {
          width: 100%;
          .price {
            font-size: 26px;
            font-weight: 500;
            color: #000;
            float: left;
          }
          .priceSpecial {
            float: left;
            line-height: 40px;
          }
        }

        .underline {
          color: #b0b0b0;
          margin-left: 5px;
          font-size: 16px;
          text-decoration-line: line-through;
        }
        .promoteSales {
          font-size: 14px;
          width: 495px;
          height: 65px;
          line-height: 65px;
          margin-top: 50px;
          background-color: #f7f7f7;
          display: flex;
          align-items: left;
          .popular {
            display: inline-block;
            width: 44px;
            height: 22px;
            line-height: 22px;
            margin: 20px 10px 0;
            background-color: #000;
            color: #fff;
            text-align: center;
          }
          .con {
            margin-left: 10px;
          }
        }
      }
      .detailsMiddle {
        height: 140px;
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            box-sizing: border-box;
            width: 65px;
            height: 65px;
          }
          img {
            cursor: pointer;
            width: 63px;
            height: 63px;
            display: block;
            margin: 0 auto;
          }
        }
      }
      .detailsDown {
        // & > span {
        //   height: 60px;
        //   line-height: 60px;
        //   font-size: 20px;
        //   text-align: center;
        //   cursor: pointer;
        // }
        .choose {
          width: 100%;
          height: 50px;
          line-height: 50px;
          border-top: 1px solid #cccccc;
          border-bottom: 1px solid #cccccc;
          input {
            width: 50%;
            outline: none;
            border: none;
            height: 30px;
            line-height: 30px;
            text-indent: 20px;
          }
          #size {
            width: 30%;
            outline: none;
            border: none;
            height: 45px;
            line-height: 45px;
            text-indent: 20px;
            margin-right: 20px;
          }
        }
        .chooses {
          button {
            width: 220px;
            height: 60px;
          }
          margin-top: 30px;
        }
      }
    }

    .good_left {
      width: 625px;
      position: relative;
      .wrap {
        width: 625px;
        height: 625px;

        .left {
          width: 625px;
          height: 625px;
          float: left;
          position: relative;
          cursor: pointer;
          .maskTop {
            width: 625px;
            height: 625px;
            position: absolute;
            z-index: 4;
            top: 0;
            left: 0;
          }
          .top {
            width: 340px;
            height: 340px;
            background-color: gray;
            opacity: 0.3;
            position: absolute;
            z-index: 5;
            top: 0;
            left: 0;
            pointer-events: none;
          }
          .leftImg {
            width: 625px;
            height: 625px;
            display: inline-block;
          }
        }
        .right {
          left: 645px;
          width: 516px;
          height: 516px;
          border: 1px solid #efefef;
          position: absolute;
          overflow: hidden;
          z-index: 2;
          .rightImg {
            display: inline-block;
            width: 950px;
            height: 950px;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
      .imgList {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: -70px;
        height: 100%;
        ul {
          img {
            cursor: pointer;
            width: 60px;
            height: 60px;
            margin: 0px 10px 10px 0;
            border: 1px solid transparent;
          }
          span {
            cursor: pointer;
          }
          //原句用的.c
          .addShop {
            font-size: 28px;
            margin: 10px;
          }
          //原句用的.d
          .buy {
            font-size: 28px;
            margin: 10px;
          }
        }
      }
    }
  }
}
.img_border {
  border: 1px solid black;
}
</style>


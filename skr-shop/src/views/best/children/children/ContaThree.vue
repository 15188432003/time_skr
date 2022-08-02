<template>
  <div class="contaThree">
    <div class="lstBottom">
      <ul>
        <li v-for="(item, index) in shopList.slice(7, 98)" :key="index" @click="detail(item.id)">
          <span class="best">
            <strong>{{ index + 8 }}</strong>
          </span>
          <img :src="item.img" alt="" />
          <div class="textMax">
            <div class="text">
              <div class="brand">Dunst for WOMEN</div>
              <div class="front">[04/23 예약배송]</div>
              <div class="product">
                HALF-SLEEVES BELTED SUMMER-WOOL JACKET SOFT GREIGE_UDJA1E211G1
              </div>
            </div>
            <div class="price">
              <span class="discount_price">37,800</span>
              <span class="base_price">42,000</span>
              <span class="discount_rate">10%</span>
            </div>
             <p @click="detail(item.id)">预定</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContaThree",
  data() {
    return {
      shopList: [],
    };
  },
  methods: {
    detail(id){
      this.$router.push(`/details/${id}`)
    }
  },
  mounted() {
    this.$bus.$on("shopList", (data) => {
      this.shopList = data;
    });
  },
};
</script>
<style lang="scss" scoped>
.contaThree {
  width: 82%;
  margin: 0 auto;
  .lstBottom {
    margin-top: 60px;
    ul {
      display: flex;
      flex-wrap: wrap;
      margin-right: -22px;
      li {
        text-align: left;
        width: calc(16.66667% - 20px);
        margin-right: 20px;
        position: relative;
        .best {
          width: 35px;
          height: 35px;
          background: #666;
          position: absolute;
          text-align: center;
          line-height: 30px;
          top: 0;
          left: 0;
          strong {
            color: #fff;
            display: block;
            margin-top: 4px;
            font-size: 16px;
          }
        }
        img {
          width: 100%;
        }
        .textMax {
          width: 100%;
          height: 186px;
          .text {
            height: 91px;
            .brand {
              color: #000;
              font-size: 13px;
              margin-bottom: 10px !important;
              width: auto;
            }
            .front {
              color: #000;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              line-height: 14px;
              margin-bottom: 9px;
              padding-top: 3px;
            }
            .product {
              font-size: 12px;
              height: 30px;
              line-height: 15px;
              color: #555;
              overflow: hidden;
              margin-bottom: 16px;
            }
          }
          .price {
            position: relative;
            line-height: 100%;
            margin-bottom: 10px;
            .discount_price {
              font-size: 16px;
              color: #000 !important;
              margin-right: 8px;
            }
            .base_price {
              font-size: 12px;
              color: grey;
              text-decoration: line-through;
            }
            .discount_rate {
              display: block;
              position: absolute;
              top: 0;
              right: 0;
              font-size: 16px;
              color: #ff4000;
            }
          }
          p {
            border: 1px solid #9b9b9b;
            font-size: 12px;
            text-align: center;
            line-height: 18px;
            width: 30px;
            height: 18px;
            color: #b2b2b2;
            box-shadow: 1px 1px 2px #9b9b9b;
          }
        }
      }
    }
  }
}
</style>
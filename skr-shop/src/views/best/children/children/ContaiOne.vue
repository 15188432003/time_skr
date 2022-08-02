<template>
  <div class="contaiOne">
    <div class="lstTop">
      <ul>
        <li
          v-for="(item, index) in shopList.slice(0, 3)"
          :key="index"
          @click="detail(item.id)"
        >
          <span class="BEST">
            <strong>{{ index + 1 }}</strong>
          </span>
          <img :src="item.img" alt="" />
          <div class="textMax">
            <div class="text">
              <div class="brand">LOEUVRE</div>
              <div class="front">
                [펜트하우스 이지아,강민경,효민,류이서,보라끌레르 착용] | [04/16
                예약배송]
              </div>
              <div class="product">Sac de Trompette Small FA0SB013-10</div>
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
  name: "ConTaiOne",
  data() {
    return {
      shopList: [],
    };
  },
  methods: {
    detail(id) {
      this.$router.push(`/details/${id}`);
    },
  },
  mounted() {
    this.$bus.$on("shopList", (data) => {
      this.shopList = data;
    });
  },
};
</script>

<style lang="scss" scoped>
.contaiOne {
  width: 82%;
  margin: 0 auto;
  background-color: #f2f2f2;
  .lstTop {
    padding: 4% 20px 0 20px;
    ul {
      width: 100%;
      display: flex;
      padding-bottom: 50px;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 29.33333%;
        position: relative;
        text-align: left;
        .BEST {
          width: 70px;
          height: 79px;
          background-image: url("~@/assets/image/best/bg_best.png");
          position: absolute;
          top: 0;
          left: 0;
          strong {
            text-align: center;
            color: #fff;
            display: block;
            height: 36px;
            margin-top: 4px;
            font-size: 34px;
          }
          p {
            font-size: 14px;
            color: #fff;
            text-align: center;
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
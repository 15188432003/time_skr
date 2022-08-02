<template>
  <div class="contaTwo">
    <div class="lstMiddle">
      <ul>
        <li v-for="(item,index) in shopList.slice(3,7)" :key="index" @click="detail(item.id)">
          <span class="iconBest">
            <strong>{{4+index}}</strong>
          </span>
          <img :src="item.img" alt="" />
          <div class="textMax">
            <div class="text">
                <div class="brand">vunque</div>
                <div class="front">
                   [댓글 이벤트] | [04/16 예약배송] 
                </div>
                <div class="product"> Toque tote S (토크 토트 스몰) Light beige </div>
              </div>
              <div class="price">
                <span class="discount_price">285,000</span>
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
  name: "ContaTwo",
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
    this.$bus.$on("allList", (data) => {
      this.shopList = data;
    }); 
  },
};
</script>

<style lang="scss" scoped>
.contaTwo {
  width: 82%;
  margin: auto;
  background-color: #f2f2f2;
  .lstMiddle {
    padding: 0 0 0 21px;
    ul {
      display: flex;
      justify-content: space-around;
      margin-right: 21px;
      li {
        text-align: left;
        width: 21%;
        position: relative;
        .iconBest {
          width: 50px;
          height: 50px;
          background: #555;
          position: absolute;
          top: 0;
          left: 0;
          strong {
            text-align: center;
            color: #fff;
            display: block;
            margin-top: 4px;
            line-height: 50px;
            font-size: 26px;
          }
          p {
            display: none;
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
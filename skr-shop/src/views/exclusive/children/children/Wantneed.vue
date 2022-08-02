<template>
  <div class="wanted">
    <ul>
      <div class="shopList" v-for="(item, index) in shopList" :key="index">
        <div class="img">
          <img :src="item.img" alt="" />
        </div>
        <div class="detail">
          <p class="title">{{ item.title }}</p>
          <p>www.stride.fun</p>
          <div class="price">
            <p>
              <span class="special_price">{{ item.special_price }}</span>
              <span class="oldPrice">{{ item.price }}</span>
            </p>
            <span class="parse"
              >{{
                parseInt(
                  (Number(item.special_price) / Number(item.price)) * 100
                )
              }}%</span
            >
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>
    
<script>
export default {
  name: "Wantneed",
  props: {
    shopList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.wanted {
  text-align: left;
  width: 100%;
  ul {
    width: 100%;
    display: flex;
    .shopList {
      border: 1px solid #e8e8e8;
      background: #fff;
      border-radius: 2px;
      transition: all 0.3s;
      width: calc(12.5% - 20px);
      margin: 0 10px;
      &:hover {
        border-color: rgba(0, 0, 0, 0.09);
        box-shadow: 0 2px 8px rgb(0 0 0 / 9%);
      }
      .img {
        width: 100%;
        border-radius: 2px 2px 0 0;
        img {
          width: 100%;
        }
      }
      .detail {
        padding: 8px 0 0 0;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        .title {
          color: #000;
        }
        .price {
          display: flex;
          justify-content: space-between;
          padding: 15px 5px 0;
          p {
            .special_price {
              font-weight: 500;
              color: #333;
              padding-right: 15px;
            }
            .oldPrice {
              text-decoration: line-through;
            }
          }
          .parse {
            color: red;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
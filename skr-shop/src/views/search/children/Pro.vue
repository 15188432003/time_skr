<template>
  <div class="pro">
    <div class="produce">
      <ul>
        <li v-for="item in $store.state.route.shopList" :key="item.id">
          <div class="shopItem">
            <div class="img">
              <img :src="item.img" alt="" />
            </div>
            <div class="detail">
              <div class="title">{{ item.title }}</div>
              <div class="price">
                <p class="act">目前没有活动</p>
                <div class="pri">
                  <p>
                    <span class="newPrice">￥{{ item.special_price }}</span>
                    <span class="oldPrice">￥{{ item.price }}</span>
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
          </div>
        </li>
        <aside v-for="i in 6" :key="i"></aside>
      </ul>
    </div>
    <div class="page">
      <el-pagination
        layout="prev, pager, next"
        :total="$store.state.route.shopList.length"
        :page-size="30"
        :current-page="1"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pro",
  data() {
    return {
      shopList: [],
    };
  },
  methods: {
    pageChange() {},
  },
  created() {
    this.shopList = this.$store.state.route.shopList;
  },
};
</script>

<style lang="scss" scoped>
.produce {
  display: flex;
  flex-direction: column;
  align-items: center;
  ul {
    width: 100%;
   display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 5vh 0;
    margin-top: 7vh;
    aside {
      width: 12vw;
      height: 0;
    }
    li {

      margin-bottom: 3vh;
      .shopItem {
        text-align: left;
        width: 12vw !important;
        margin-top: 1vh;
        border: 1px solid #e8e8e8;
        cursor: pointer;
        .img {
          width: 100%;
          img {
            width: 100%;
            border-radius: 2px 2px 0 0;
          }
        }
        .detail {
          padding: 0;
          margin: 1vh 0;
          padding-left: 0.3vw;
          overflow: hidden;
          .title {
            overflow: hidden;
            color: rgba(0, 0, 0, 0.85);
            font-weight: 500;
            font-size: 16px;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-bottom: 8px;
          }
          .price {
            color: rgba(0, 0, 0, 0.45);
            .act {
              color: #ccc;
            }
            .pri {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 1vh;
              p {
                display: flex;
                align-items: center;
                .newPrice {
                  color: rgba(0, 0, 0, 0.8509803921568627);
                  font-weight: bolder;
                }
                .oldPrice {
                  font-size: 1.2vh;
                  margin-left: 1vw;
                  text-decoration: line-through;
                }
              }
              .parse {
                color: red;
                margin-right: 1vw;
              }
            }
          }
        }
      }
    }
  }
}
</style>
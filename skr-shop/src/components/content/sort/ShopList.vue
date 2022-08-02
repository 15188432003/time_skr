<template>
  <div class="shopItem">
    <div class="list">
      <div class="ancard">
        <div
          class="item"
          @click="detail(item.id)"
          v-for="(item, index) in pageList.slice(
            (page - 1) * pageSize,
            pageSize * page
          )"
          :key="index"
        >
          <div class="item-top">
            <img :src="item.img" alt="" />
          </div>
          <div class="item-bottom">
            <div class="item-detail">
              <div class="title">{{ item.title }}</div>
              <div class="price">
                <p>COST: ￥{{ item.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopList",
  props: {
    pageList: {
      type: Array,
      default: () => [],
    },
    pageSize: Number,
    page:Number
  },
  data() {
    return {};
  },
  methods: {
    detail(id){
      this.$router.push(`/details/${id}`)
    }
  },
};
</script>

<style lang="scss" scoped>
.list {
  .ancard {
    width: 100%;
    padding: 0 10px;
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    .item {
      width: calc(20% - 8px);
      margin: 4px;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      background: #fff;
      border-radius: 2px;
      border: 1px solid #e8e8e8;
      .item-top {
        img {
          width: 100%;
          border-radius: 2px 2px 0 0;
        }
      }
      .item-bottom {
        padding: 24px;
        zoom: 1;
        .item-detail {
          overflow: hidden;
          .title {
            margin-bottom: 8px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #333;
            font-size: 20px;
          }
          .price {
            color: rgba(0, 0, 0, 0.45);
            p {
              color: #666;
              font-size: 12px;
              line-height: 1.5;
              word-break: keep-all;
            }
          }
        }
      }
    }
  }
}
</style>
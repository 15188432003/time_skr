<template>
  <div class="aslide">
    <div class="mask">
      <p>{{ $route.params.parent_name }}</p>
      <span>stride.fun</span>
    </div>
    <div class="maskHost">
      <div class="host">
        <p>热销</p>
      </div>
      <div class="hostList">
        <ul>
          <li v-for="(item, index) in hostList" :key="index">
            <div class="item">
              <h4 @click="detail(item.id)">{{ item.title }}</h4>
              <div>{{ item.sale }}件</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aslide",
  props: {
    hostList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    detail(id){
      this.$router.push(`/details/${id}`)
    }
  },
};
</script>

<style lang="scss" scoped>
.aslide {
  text-align: left;
  width: 16%;
  .mask {
    padding: 0;
    height: 155px;
    background-color: #5a5a5a;
    font-size: 30px;
    color: #fff;
    letter-spacing: -1px;
    line-height: 26px;
    font-weight: 100;
    p {
      padding: 30px 0 0 30px;
      background-color: #5a5a5a;
      font-size: 30px;
      color: #fff;
      letter-spacing: -1px;
      line-height: 26px;
      font-weight: 100;
    }
    span {
      padding: 0 0 0 30px;
      display: block;
      margin-top: 25px;
      font-size: 24px;
      opacity: 0.7;
    }
  }
  .maskHost {
    .host {
      height: 53px;
      background-color: #f2f2f2;
      font-family: yg740;
      font-size: 18px;
      color: #333;
      padding: 16px 0 16px 30px;
    }
    .hostList {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5;
      list-style: none;
      ul {
        li {
          padding: 20px 30px 0 30px;
          border-bottom: 1px solid #e8e8e8;
          .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            h4 {
              width: 80%;
              color: rgba(0, 0, 0, 0.65);
              font-size: 12px;
              line-height: 22px;
              &:hover{
                color: #1890ff
              }
            }
            div {
              color: rgba(0, 0, 0, 0.45);
              font-size: 14px;
              line-height: 22px;
            }
          }
        }
      }
    }
  }
}
</style>
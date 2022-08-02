<template>
  <div>
    <ul class="resinto">
      <li>
        <p>
          <span>还不是SKR-SHOP成员？</span>
          <span>如果您注册成为会员，您将获得10％的折扣券。</span>
        </p>
        <el-button @click="intores">注册</el-button>
      </li>
      <li>
        <p class="vip_order">
           <span>需要非会员订单/交货查询吗？</span>
        </p>
        <el-button>非会员订单查询</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ResInto",
  data() {
    return {};
  },
  methods: {
    intores(){
      this.$router.push('/regester')
    }
  },
};
</script>

<style lang="scss" scoped>
.resinto {
  width: 1240px;
  margin: 57px auto 0;
  padding: 40px 70px 36px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  li {
    display: flex;
    justify-content: space-between;
    padding: 0 35px;
    width: 550px;
    text-align: left;
    .el-button {
      min-width: 160px;
      height: 40px;
      border: none;
      background-color: #7d7d7d;
      color: #fff;
      outline: none;
      cursor: pointer;
      margin-left: 15px;
      border-radius: 0;
    }
    span {
      display: block;
      position: relative;
      line-height: 16px;
      &:first-child::before{
        content: '';
        position: absolute;
        width: 3px;
        height: 3px;
        background: black;
        left: -10px;
        top: 5px;
        border-radius: 50%;
      }
    }
  }
  .vip_order{
    padding-top:12px ;
  }
}
</style>
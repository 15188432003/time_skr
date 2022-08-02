<template>
  <div class="threepart">
    <h3>第三方登录</h3>
    <label class="label_three">
      <img src="@/assets/image/login/icon_QQ.png" alt="" /> <span>QQ</span>
    </label>
    <label class="label_three">
      <img src="@/assets/image/login/wchat.png" alt="" /> <span>微信</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "ThreePart",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.threepart {
  width: 850px;
  height: 32px;
  margin: 40px auto 0;
  text-align: left;
  display: flex;
  justify-content: left;
  h3 {
    width: 105px;
    padding-top: 4px;
    font-size: 18px;
    color: #000;
    font-weight: 400;
  }
  .label_three {
    padding: 0 16px;
    position: relative;
    cursor: pointer;
    &:last-child::before {
      content: "";
      position: absolute;
      top: 8px;
      left: 0px;
      width: 1px;
      height: 14px;
      background-color: #e2e2e2;
    }
    span {
      margin-left: 3px;
      vertical-align: 60%;
      color: #7d7d7d;
      font-size: 16px;
    }
  }
}
</style>
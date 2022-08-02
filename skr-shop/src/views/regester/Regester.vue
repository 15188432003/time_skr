<template>
  <div class="regester">
    <h1>注册</h1>
    <ul class="process">
      <li class="info">
        <div class="info_wrp">
          <img :src="imgs.info" alt="" />
        </div>
        <p>1&nbsp;信息输入</p>
      </li>
      <li class="right">
        <img :src="imgs.right" alt="" />
      </li>
      <li class="success">
        <div class="success_wrp">
          <img :src="imgs.success" alt="" />
        </div>
        <p>2&nbsp;注册完成</p>
      </li>
    </ul>
    <ResgesterInfo />
  </div>
</template>

<script>
import info from "@/assets/image/signup/modify.png";
import success from "@/assets/image/signup/success.png";
import right from "@/assets/image/signup/right.png";
import ResgesterInfo from "./children/ResgesterInfo.vue"
export default {
  name: "Regester",
  components:{ResgesterInfo},
  data() {
    return {
      imgs: {
        info: info,
        success: success,
        right: right,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.regester {
  width: 100%;
  min-width: 1240px;
  & > h1 {
    padding-top: 81px;
    font-size: 44px;
    color: #000;
    line-height: 100%;
    font-weight: 400;
    padding-bottom: 60px;
  }
  .process {
    display: flex;
    width: 1240px;
    margin: 0 auto;
    justify-content: center;
    p{
      margin-top:16px ;
      color: #a1a1a1;
    }
    .info_wrp {
      width: 80px;
      height: 80px;
      background: black;
      border-radius: 50%;
    }
    .right{
      margin: 0 30px 0;
    }
    .success_wrp {
      width: 80px;
      height: 80px;
      background-color: rgb(242, 242, 242);
      border-radius: 50%;
    }
    img {
      margin-top: 24px;
    }
  }
}
</style>
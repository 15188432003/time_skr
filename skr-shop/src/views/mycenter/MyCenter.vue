<template>
  <div class="mycenter">
    <h1>个人中心</h1>
    <div class="go_home">
      <span @click="goHome">主页</span>
      <span>></span>
      <span>个人中心</span>
      <p @click="changePwd" class="change_pwd">修改密码</p>
    </div>
    <div class="myinfo">
      <div class="myinfo_header">
        <ul>
          <li>我的♡</li>
          <li>订单管理</li>
          <li>我的活动</li>
          <li>购物优惠</li>
          <li>信息管理</li>
          <li>查询内容</li>
        </ul>
      </div>
      <el-collapse-transition>
        <div class="myinfo_body" v-show="hoverShow">
          <ul>
            <li>我的♡物品</li>
            <li>我的♡品牌</li>
            <li>我的♡风格</li>
          </ul>
          <ul>
            <li>订购/配送查询</li>
            <li>取消/交换/退货查询</li>
            <li>收到的礼品盒</li>
            <li>签发凭证</li>
          </ul>
          <ul>
            <li>进货通知</li>
            <li>活动参与明细</li>
            <li>WDNA参与明细</li>
          </ul>
          <ul>
            <li>会员等级</li>
            <li>优惠券</li>
            <li>W POINT</li>
            <li>预收款</li>
            <li>购物券</li>
          </ul>
          <ul>
            <li>修改会员信息</li>
            <li>管理地址簿</li>
            <li>W.工资管理</li>
            <li>退款账户管理</li>
            <li>会员退出</li>
          </ul>
          <ul>
            <li>商品Q&A</li>
            <li>商品评价</li>
            <li>1:1查询</li>
          </ul>
        </div>
      </el-collapse-transition>

      <div class="hover_info">
        <button @click="hoverChange" v-if="hoverShow">▲</button>
        <button @click="hoverChange" v-else>▼</button>
      </div>
    </div>
    <img
      @click="goHome"
      src="@/assets/image/following/PC_mypage_1240x100_1_20210226162046.jpg"
      alt=""
    />
    <RecentlyOrder />
    <NewAddress />
    <div class="cover" v-if="changepwdshow">
      <div class="changepwds">
        <button class="close" @click="changepwdshow = false">X</button>
        <h1>修改密码</h1>
        <el-form :model="userinfo" ref="usertest" :rules="usertest">
          <el-form-item label="用户名" prop="username">
            <el-input
              placeholder="请输入用户名"
              v-model="userinfo.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input
              placeholder="请输入新密码"
              v-model="userinfo.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="confirm" @click="confirmUser">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import RecentlyOrder from "./children/RecentlyOrder.vue";
import NewAddress from "./children/NewAddress.vue";
import { changePwd } from "@/api/mycenter.js";
export default {
  name: "MyCenter",
  components: { RecentlyOrder, NewAddress },
  data() {
    return {
      hoverShow: true,
      changepwdshow: false,
      userinfo: {
        username: "",
        password: "",
      },
      usertest: {
        username: [
          { required: true, message: "账号为必填项", trigger: "blur" },
          {
            pattern: /^\w{4,8}$/,
            message: "账号为长度大于4,小于8的数字字母下划线",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码为必填项", trigger: "blur" },
          {
            pattern: /^\w{6,12}$/,
            message: "密码为长度大于6,小于12的数字字母下划线",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    changePwd() {
      this.changepwdshow = true;
    },
    hoverChange() {
      this.hoverShow = !this.hoverShow;
    },
    confirmUser() {
      this.$refs.usertest.validate((value) => {
        if (value) {
          const { username, password } = this.userinfo;
          changePwd({ username, password }).then((data) => {
            if (!data.code == 200) {
              this.$message({
                type: "info",
                message: data.message,
              });
            } else {
              this.changepwdshow = false
              this.$store.dispatch('user/logOut')
              this.$router.push('/login')
              this.$message({
                type: "success",
                message:'修改密码成功,请重新登陆',
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mycenter {
  width: 100%;
  min-width: 1240px;
  & > h1 {
    width: 1240px;
    margin: 0 auto;
    padding-top: 81px;
    font-size: 44px;
    color: #000;
    line-height: 100%;
    font-weight: 400;
    padding-bottom: 20px;
  }
  .go_home {
    span {
      margin: 0 5px;
      font-size: 12px;
      &:first-child {
        color: #676767;
        cursor: pointer;
      }
    }
    .change_pwd {
      margin-top: 14px;
      font-weight: bolder;
      cursor: pointer;
      font-size: 12px;
    }
  }
  .myinfo {
    margin: 44px 0 60px;
    .myinfo_header {
      width: 100%;
      min-width: 1240px;
      border-top: 1px solid #e6e6e6;
      background-color: #f3f3f3;
      & > ul {
        display: flex;
        justify-content: center;
        & > li {
          width: 206px;
          line-height: 41px;
          position: relative;
          &:first-child::after {
            display: none;
          }
          &::after {
            content: "";
            width: 1px;
            height: 14px;
            background-color: #e5e5e5;
            display: block;
            position: absolute;
            top: 12px;
            left: 0;
          }
        }
      }
    }
    .myinfo_body {
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #e6e6e6;
      height: 143px;
      padding: 9px 0;
      & > ul {
        width: 206px;
        position: relative;
        & > li {
          line-height: 25px;
        }
        &:first-child::after {
          display: none;
        }
        &::after {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          content: "";
          width: 1px;
          height: 100%;
          background-color: #e5e5e5;
        }
      }
    }
    .hover_info {
      width: 1240px;
      margin: 0 auto;
      position: relative;
      & > button {
        position: absolute;
        top: -1px;
        right: 0;
        width: 30px;
        height: 16px;
        text-align: center;
        line-height: 16px;
        background-color: #fff;
        outline: none;
        border: 1px solid #e6e6e6;
        border-top-width: 0;
        font-size: 12px;
        color: #000;
        cursor: pointer;
      }
    }
  }
  img {
    cursor: pointer;
  }

  .el-form::v-deep .el-form-item__label {
    margin-left: 40px;
  }
  .el-input {
    width: 250px;
    height: 40px;
  }
  .el-form-item {
    &::v-deep .el-form-item__error {
      margin-left: 125px;
    }
  }
  .el-input::v-deep .el-input__inner {
    border-radius: 0;
    border: 1px solid transparent;
    background: #f2f2f2;
  }
  .el-input::v-deep .el-input__inner:focus {
    border: 1px solid black;
    background: #fff;
  }
  .el-input::v-deep .el-input__inner::placeholder {
    color: rgb(129, 129, 129);
    font-size: 14px;
  }
  .el-input::v-deep .el-input__inner:focus::placeholder {
    opacity: 0;
  }
}
.cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000069;
  z-index: 8888;
  .changepwds {
    text-align: center;
    background: #fff;
    width: 400px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #000;
    h1 {
      padding: 25px 0;
      font-family: "ProximaNova-Thin", "yg740";
      font-size: 44px;
      color: #000;
      text-align: center;
      line-height: 100%;
      font-weight: 400;
    }
    .close {
      position: absolute;
      top: 3px;
      right: 3px;
      width: 25px;
      height: 25px;
      background-color: #fff;
      color: #000;
      border-radius: 19px;
      border: 1px solid #000;
      cursor: pointer;
      outline: none;
      z-index: 9999999;
    }
    .confirm {
      display: block;
      margin: 60px auto 0;
      width: 200px;
      height: 40px;
      background-color: #fff;
      color: #000;
      border: 1px solid #000;
      outline: none;
      cursor: pointer;
      border-radius: 0;
    }
  }
}
</style>
<template>
  <div class="login_in">
    <el-form
      class="el_form"
      :model="userInfo"
      :rules="Formrules"
      autocomplete="on"
      ref="userInfo"
    >
      <div class="left_login">
        <el-form-item prop="username">
          <span>用户名</span>
          <el-input
            autofocus="true"
            autocomplete="on"
            placeholder="请输入您的用户名"
            v-model="userInfo.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span>密码</span>
          <el-input
            show-password
            autocomplete="on"
            placeholder="请输入您的密码"
            v-model="userInfo.password"
          ></el-input>
        </el-form-item>
        <div class="rember_div">
          <label @click="isrember">
            <img
              src="@/assets/image/login/forget.png"
              v-show="forgetshow"
              alt=""
            />
            <img
              src="@/assets/image/login/rember.png"
              v-show="rembershow"
              alt=""
            /><span class="rember_span">记住账号</span></label
          >
        </div>
      </div>
      <div class="right_login">
        <el-form-item>
          <el-button @click="loginIn('userInfo')">登录</el-button>
        </el-form-item>
        <span>找回用户名</span>
        <span>忘记密码</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getItem, setItem, removeItem } from "@/utils/localStorage";
import {getShopCar} from '@/api/shopCar.js'
export default {
  name: "LoginTest",
  data() {
    let userTest = (rule, value, callback) => {
      if (!value) {
        callback(new Error("账号不能为空"));
      }
      let testuser = /^\w{4,8}$/;
      if (value.length < 4 || value.length > 8 || !testuser.test(value)) {
        callback(new Error("账号为长度4-8位的数字字母下划线组成"));
      }
      callback();
    };
    let pwdTest = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      }
      let testuser = /^\w{6,12}$/;
      if (value.length < 6 || value.length > 12 || !testuser.test(value)) {
        callback(new Error("账号为长度6-12位的数字字母下划线组成"));
      }
      callback();
    };
    return {
      forgetshow: true,
      rembershow: false,
      userInfo: {
        username: "",
        password: "",
      },
      Formrules: {
        username: [{ validator: userTest, required: true, trigger: "change" }],
        password: [{ validator: pwdTest, required: true, trigger: "change" }],
      },
    };
  },
  methods: {
    isrember() {
      this.forgetshow = !this.forgetshow;
      this.rembershow = !this.rembershow;
    },
    loginIn() {
      this.$refs.userInfo.validate((value) => {
        if (value) {
          this.$store
            .dispatch("user/login", this.userInfo)
            .then((data) => {
              if (this.rembershow) {
                let userPwd = {
                  username: this.userInfo.username,
                  password: this.userInfo.password,
                };
                setItem(userPwd, "userPwd");
              } else {
                removeItem("userPwd");
              }
              this.$message({
                type: "success",
                message: data,
              });
              getShopCar({
                customer_id: this.$store.state.user.userInfo.id,
              }).then((data) => {
                // console.log(data);
                this.$store.dispatch("shopCar/setShopList", data.data);
              });
              this.$route.params.direct || this.$router.replace("/home");
              this.$router.push(this.$route.params.direct)
            })
            .catch((err) => {
              this.$message({
                type: "info",
                message: err,
              });
            });
        }
      });
    },
  },
  created() {
    let userPwd = getItem("userPwd");
    if (userPwd) {
      this.userInfo.username = userPwd.username;
      this.userInfo.password = userPwd.password;
    }
  },
};
</script>

<style lang="scss" scoped>
.login_in {
  width: 735px;
  margin: 0 auto;
  .el_form {
    display: flex;
    justify-content: space-between;
    .left_login {
      width: 525px;
      .el-form-item {
        span {
          display: inline-block;
          width: 105px;
          text-align: left;
        }
        &::v-deep .el-form-item__error {
          margin-left: 105px;
        }
      }
    }
    .rember_div {
      text-align: left;
      margin-left: 105px;
    }
    .rember_span {
      margin-left: 10px;
      vertical-align: 60%;
    }
    .right_login {
      width: 190px;
      .el-button {
        width: 100%;
        height: 100px;
        font-size: 16px;
        background-color: #000;
        border-color: #000;
        color: #fff;
        outline: none;
        cursor: pointer;
        border-radius: 0;
      }
      span {
        cursor: pointer;
        padding: 5px 11px 5px 16px;
        color: #000;
        position: relative;
        &:last-child::before {
          content: "";
          position: absolute;
          top: 5px;
          left: 0;
          width: 1px;
          height: 12px;
          background-color: #e2e2e2;
        }
      }
    }
  }
}

.el-input {
  width: 420px;
  height: 40px;
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
</style>

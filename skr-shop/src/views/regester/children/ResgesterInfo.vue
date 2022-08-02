<template>
  <div class="resinfo">
    <p class="mustp"><span>*</span>必须项</p>
    <div class="regester">
      <div class="prompt">
        <span>如果您注册成为会员,您可以获得10%的折扣券,您可以立即使用。</span>
        <span>(每个完成自我认证的用户只能使用一次)</span>
      </div>
      <el-form :model="userinfo" :rules="Formrules" ref="Formrules">
        <el-form-item prop="username">
          <p>用户名 <span>*</span></p>
          <el-input
            v-model="userinfo.username"
            placeholder="请输入您的用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <p>密码 <span>*</span></p>
          <el-input
            v-model="userinfo.password"
            placeholder="请输入您的密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <p>邮箱 <span>*</span></p>
          <el-input
            v-model="userinfo.email"
            placeholder="请输入您的邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <p>手机号 <span>*</span></p>
          <el-input
            v-model="userinfo.phone"
            placeholder="请输入您的手机"
          ></el-input>
          <el-button @click="getPhone" class="testnum">获取验证码</el-button>
        </el-form-item>
        <el-form-item prop="VerificationCode">
          <p>验证码 <span>*</span></p>
          <el-input
            v-model="userinfo.VerificationCode"
            placeholder="请输入您的验证码"
          ></el-input>
        </el-form-item>
        <el-form-item class="smibut_btn">
          <el-button>取消</el-button>
          <el-button @click="gesgerterGo('Formrules')">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getMessage, register } from "@/api/resgester.js";
export default {
  name: "ResgesterInfo",
  data() {
    return {
      userinfo: {
        username: "",
        password: "",
        email: "",
        phone: "",
        VerificationCode: "",
      },
      Formrules: {
        username: [
          { required: true, trigger: "blur", message: "账号为必填项" },
          {
            pattern: /^\w{4,8}$/,
            message: "账号为长度大于4,小于8的数字字母下划线",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码为必填项" },
          {
            pattern: /^\w{6,12}$/,
            message: "密码为长度大于6,小于12的数字字母下划线",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, trigger: "blur", message: "邮箱为必填项" },
          {
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "邮箱格式错误",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, trigger: "blur", message: "手机号为必填项" },
          {
            pattern: /^\d{11}$/,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        VerificationCode: [
          { required: true, trigger: "blur", message: "验证码为必填项" },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    gesgerterGo() {
      this.$refs.Formrules.validate((value) => {
        if (value) {
          let { username, password, email, VerificationCode } = this.userinfo;
          register({ username, password, email, VerificationCode }).then(
            (data) => {
              if (data.code == 200) {
                this.$message({
                  type: "success",
                  message: data.message,
                });
                this.$router.push('/login')
              } else if (data.code == 401) {
                this.$message({
                  type: "info",
                  message: data.message,
                });
              } else {
                this.$message({
                  type: "info",
                  message: data.message,
                });
              }
            }
          );
        }
      });
    },
    getPhone() {
      this.$refs.Formrules.validateField("phone", (error) => {
        if (!error) {
          getMessage().then((data) => {
            if (data.code == 200) {
              this.userinfo.VerificationCode = data.data.temp;
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.resinfo {
  width: 1240px;
  margin: 30px auto 0;
  .mustp {
    text-align: right;
    span {
      color: #ff1414;
    }
  }
  .regester {
    & > .prompt {
      border-top: 1px solid black;
      background: #ff6160;
      color: #fff;
      height: 48px;
      line-height: 48px;
      span:nth-child(1) {
        font-size: 20px;
      }
      span:nth-child(2) {
        font-size: 14px;
      }
    }
    .el-form-item {
      border-bottom: 1px solid #d9d9d9;
      margin: 0;
      padding: 11px 0;
      text-align: left;
      position: relative;
      &::v-deep .el-form-item__error {
        position: absolute;
        top: 11px;
        left: 720px;
        &:nth-child(4) {
          left: 840px;
        }
      }
      &:nth-child(5) {
        border-bottom: 1px solid #000;
      }
      &:last-child {
        text-align: center;
        margin-top: 60px;
        .el-button {
          width: 180px;
          border-radius: 0;
          border: 1px solid black;
          height: 48px;
          &:first-child {
            color: #333;
            background: #fff;
          }
          &:last-child {
            background: #000;
            color: #fff;
          }
        }
      }
      .testnum {
        margin-left: 20px;
        transition: all 0.5s;
        font-size: 12px;
        &:hover {
          background: #fff;
          color: #40a9ff;
          border-color: #40a9ff;
        }
      }
      p {
        display: inline-block;
        padding-left: 43px;
        width: 300px;
        color: #333;
        font-weight: 700;
        span {
          color: #ff1414;
        }
      }
    }
    .el-input {
      width: 400px;
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
  }
}
</style>

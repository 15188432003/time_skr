<template>
  <div class="footerbar">
    <div class="footer_top">
      <ul class="footer_ul">
        <li
          @click="changeHandle(index)"
          v-for="(item, index) in FollowList"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="footerMsg">
      <el-row>
        <!-- 底部左侧 -->
        <el-col :span="12" class="footMsg_left">
          <p>网站名称</p>
          <p>
            © 2009-2021 Stride.fun 版权所有 ICP主体备案号： 苏ICP备2021007111号
          </p>
          <a href="javascript:;">
            <span>网站备案信息</span>
          </a>
          <p>
            <a
              target="_blank"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32011402010859"
              style="
                display: inline-block;
                text-decoration: none;
                height: 20px;
                line-height: 20px;
              "
              ><img src="@/assets/image/beian/beian.png" style="float: left" />
              <p
                style="
                  float: left;
                  height: 20px;
                  line-height: 20px;
                  margin: 0px 0px 0px 5px;
                  color: #939393;
                "
              >
                苏公网安备 32011402010859号
              </p></a
            >
          </p>
        </el-col>
        <!-- 底部右侧 -->
        <el-col :span="12" class="footMsg_right">
          <p>消费者损害赔偿保险</p>
          <p>
            客户在以现金支付安全交易时可以使用Wconcept订阅的<span>
              消费者损害赔偿保险服务。
            </span>
          </p>
          <p>赔偿对象：不送/退货，拒绝退款/商场破产</p>
          <a href="javascript:;"><span>检查服务订阅事实</span></a>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
  data() {
    return {
      FollowList: [
        "关于我们",
        "咨询服务",
        "合租伙伴查询",
        "服务条款",
        "隐私政策",
        "服务中心",
        "招聘信息",
        "全球的",
      ],
      FollowHandle: [
        "/about",
        "/consultancy",
        "/partners",
        "/tos",
        "/privacy",
        "/service",
        "/joinus",
        "/global",
      ],
    };
  },
  methods: {
    changeHandle(index) {
      const routes = this.FollowHandle[index];
      this.$router.push(routes).catch((err) => {
        return false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.footerbar {
  width: 100%;
  padding-top: 90px;
  padding-bottom: 20px;
  .footer_top {
    width: 100%;
    background-color: #848484;
    .footer_ul {
      display: flex;
      justify-content: space-around;
      width: 80%;
      height: 60px;
      margin: 0 auto;
      li {
        width: 8%;
        line-height: 60px;
        cursor: pointer;
        color: #fff;
        transition: color 0.3s;
        &:hover {
          background-color: #636262;
        }
      }
    }
  }
  .footerMsg {
    text-align: left;
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    padding-top: 40px;
    margin-bottom: 20px;
    .el-row {
      width: 80%;
      margin: 0 auto;
    }
    a {
      color: #666;
      transition: all .3s;
      &:hover {
        color: #40a9ff;
      }
    }
  }

  .footMsg_left {
    position: relative;
    padding: 0 30px;
    // border: 1px solid red;
  }
  .footMsg_right {
    padding-left: 30px;
  }
  .footMsg_left::after {
    position: absolute;
    top: 0;
    right: 10px;
    content: "";
    display: inline-block;
    width: 1px;
    height: 87px;
    background-color: #e5e5e5;
  }
}
</style>
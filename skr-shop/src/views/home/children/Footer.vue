<template>
  <!-- 首页底部 -->
  <div class="footer_bar">
    <div class="footer">
      <!-- 底部图片 -->
      <div class="inner">
        <a href="javascript:;" v-for="(i, j) in img" :key="j">
          <img :src="i.imgUrl" alt="" />
        </a>
      </div>
      <!-- 底部信息 -->
      <div class="footer_content">
        <!-- 左侧信息 -->
        <div class="notice">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="消息" name="first">
              <ul>
                <li v-for="(item, index) in notice_one" :key="index" class="condition">
                    <span>
                        <a href="">{{ item }}</a>
                    </span>

                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="活动公告" name="second"
              >Content of Tab Pane 2</el-tab-pane
            >
          </el-tabs>
        </div>

        <!-- 右侧联系方式 -->
        <div class="contact">
          <p>
            <span class="fuwu">服务中心</span>
            <span class="phone_">1566-5027</span>
          </p>
          <p class="timer_">营业时间</p>
          <p class="adress_">2801810010@qq.com</p>
          <p class="button_icon">
            <span
              ><el-button class="footer_btn">常见问题</el-button>
              <el-button class="footer_btn">1：1查询</el-button></span
            >
            <span class="ican-fone">
              <svg-icon
                icon-class="facebook"
                className="icon"
                width="41px"
              ></svg-icon>
              <svg-icon
                icon-class="instagram"
                className="icon"
                width="41px"
              ></svg-icon>
              <svg-icon
                icon-class="qq"
                className="icon"
                width="41px"
              ></svg-icon>
              <svg-icon
                icon-class="dingding"
                className="icon"
                width="41px"
                hight="41px"
              ></svg-icon>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterNav",
  data() {
    return {
      activeName: "second",
      notice_one: [
        "· [指南](3/5罢工)",
        "· [指南] 3月1日",
        "· [信息] 客服",
        "· [concept] ",
        "· [concept]",
      ],
      footer_list: [
        "关于我们",
        "咨询服务",
        "合租伙伴查询",
        "服务条款",
        "隐私政策",
        "服务中心",
        "招聘信息",
        "全球的",
      ],
      img: [
        {
          imgUrl: require("../../../assets/image/following/pc_benefit_main.png"),
        },
        {
          imgUrl: require("../../../assets/image/following/pc_benefit_main.png"),
        },
        {
          imgUrl: require("../../../assets/image/following/pc_benefit_main.png"),
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.footer_bar {
  width: 100%;
  padding-top: 90px;
  // padding-bottom: 36px;
}

.center {
  margin: 0 auto;
  background-color: white;
}
.second{
      font-size: 54px;
}
.inner {
  height: 130px;
  margin-bottom: 80px;
}
.inner img {
  width: 33%;
}
.footer {
  width: 80%;
  height: 500px;
  margin: 0 auto;
}

// 左侧
.footer_content {
  display: flex;
  justify-content: space-between;
}
.notice {
  width: 50%;
}
button {
  border: 0;
}

.tab_text {
  font-size: 14px;
  color: #000;
}

// 右侧联系方式
.contact {
  width: 40%;
  color: #000;
}
.fuwu {
  font-size: 22px;
  color: #000;
}
.phone_ {
  font-size: 42px;
  color: #000;
}

.footer_btn {
  width: 125px;
  height: 40px;
  color: #000;
  font-size: 20px;
  border: 1px solid black;
  border-radius: 0;
  margin-right: 10px;
  text-transform: uppercase;
}

.timer_ {
  font-size: 14px;
  margin-bottom: 5px;
}
.adress_ {
  margin-bottom: 50px;
}
.button_icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer_list {
  width: 100%;
  background-color: #848484;
}
.footer_u {
  width: 80%;
  margin-top: 70px;
  padding: 0 28px;
  margin: 0 auto;
  overflow: hidden;
  background-color: #848484;
}
.footer_item {
  float: left;
}
.footer_item > a {
  display: block;
  padding: 20px 44px;
  font-size: 14px;
  color: #fff;
}
// 底部结尾
.footer_last {
  position: relative;
  width: 80%;
  margin: 10px auto;
}
.last_right {
  position: absolute;
  display: block;
  top: 15px;
  right: 0;
  letter-spacing: -0.5px;
}
.last_right::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: -20px;
  margin: auto;
  width: 1px;
  height: 87px;
  background-color: #e5e5e5;
}
@media screen and(max-width: 1400px) {
  .last_right {
    display: none;
  }
  .footer_btn {
    transform: scale(0.8);
  }
}
</style>
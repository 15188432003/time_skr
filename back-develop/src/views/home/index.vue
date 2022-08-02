<template>
  <div class="home">
    <el-row :gutter="20" class="order_row" type="flex" justify="space-around">
      <el-col class="el_col" :span="6" v-for="item in orders" :key="item.title">
        <img :src="item.imgs" alt="" />
        <div>
          <p class="title_order">{{ item.title }}</p>
          <p class="price_order">{{ item.price }}</p>
        </div>
      </el-col>
    </el-row>
    <section class="Report">
      <el-row class="onlyrow">
        <el-col :span="24"><div>订单统计</div></el-col>
      </el-row>
      <el-row class="statistics">
        <el-col :span="4" class="left_bar">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399; font-size: 14px">本月订单总数</div>
              <div style="color: #606266; font-size: 24px; padding: 10px 0">
                1563
              </div>
              <div>
                <span style="font-size: 14px; color: blue">+3%</span>
                <span style="color: #c0c4cc; font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px">
              <div style="color: #909399; font-size: 14px">本周订单总数</div>
              <div style="color: #606266; font-size: 24px; padding: 10px 0">
                154
              </div>
              <div>
                <span class="color-danger" style="font-size: 14px; color: red"
                  >-2%</span
                >
                <span style="color: #c0c4cc; font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px">
              <div style="color: #909399; font-size: 14px">本月销售总额</div>
              <div style="color: #606266; font-size: 24px; padding: 10px 0">
                4824
              </div>
              <div>
                <span class="color-success" style="font-size: 14px; color: blue"
                  >+5%</span
                >
                <span style="color: #c0c4cc; font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px">
              <div style="color: #909399; font-size: 14px">本周销售总额</div>
              <div style="color: #606266; font-size: 24px; padding: 10px 0">
                5854
              </div>
              <div>
                <span class="color-danger" style="font-size: 14px; color: red"
                  >-4%</span
                >
                <span style="color: #c0c4cc; font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="right_bar" :span="20">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="chooseTimeRange"
            >
            </el-date-picker>
          </div>
          <div id="main" class="echart"></div
        ></el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import home_order from "@/assets/imgs/home_order.png";
import home_today from "@/assets/imgs/home_today_amount.png";
import home_yesterday from "@/assets/imgs/home_yesterday_amount.png";
import shopNum from "@/assets/imgs/shopNum.png";
import * as echarts from "echarts";
let data = {
  xAxisdata: [], //日期
  moneydata: [], //订单金额
  numdata: [], //订单数量
};
for (let i = 1; i <= 30; i++) {
  let xAxisdatas = "2022-06-01";
  let is = i >= 10 ? i : "0" + i;
  xAxisdatas = xAxisdatas.replace("01", is);
  data.xAxisdata.push(xAxisdatas);
  let numMoney = Math.random() * 10 + 1;
  numMoney = parseInt(numMoney) * 10;
  data.numdata.push(numMoney);
  numMoney = numMoney * 100 + parseInt(Math.random() * 1000);
  data.moneydata.push(numMoney);
}
export default {
  name: "Home",
  data() {
    return {
      orders: [
        {
          imgs: home_order,
          title: "今日订单总数",
          price: "200",
        },
        {
          imgs: home_today,
          title: "今日销售总额",
          price: "¥5000.00",
        },
        {
          imgs: home_yesterday,
          title: "昨日销售总额",
          price: "¥5000.00",
        },
        {
          imgs: shopNum,
          title: "全部商品",
          price: "53",
        },
      ],

      option: {
        title: {
          text: "订单周报",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        }, //跟随显示
        legend: {
          data: ["订单金额", "订单数量"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "订单金额",
            min: 0,
            axisLabel: {
              formatter: "{value} ¥",
            },
          },
          {
            type: "value",
            name: "订单数量",
            min: 0,
            max: 100,
            axisLabel: {
              formatter: "{value} 件",
            },
          },
        ],
        series: [
          {
            name: "订单金额",
            type: "line",
            yAxisIndex: 0,
            smooth: true,
            min: 0,
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [],
          },
          {
            name: "订单数量",
            min: 0,
            type: "line",
            smooth: true,
            yAxisIndex: 1,
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [],
          },
        ],
      },
      value1: [
        "Wed Jun 01 2022 00:00:00 GMT+0800 (中国标准时间)",
        " Wed Jun 07 2022 00:00:00 GMT+0800 (中国标准时间)",
      ],
      startdata: "",
      enddata: "",
    };
  },

  mounted() {
    this.chooseTimeRange(this.value1);
  },
  methods: {
    chooseTimeRange(timeStage) {
      this.timeStage = timeStage;
    },
    chooseTimeRange(val) {
      this.value1 = val;
      var d = new Date(this.value1[0]);
      let month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      var youWant = d.getFullYear() + "-" + month + "-" + day;
      var d2 = new Date(this.value1[1]);
      let month2 =
        d2.getMonth() + 1 < 10 ? "0" + (d2.getMonth() + 1) : d2.getMonth() + 1;
      let day2 = d2.getDate() < 10 ? "0" + d2.getDate() : d2.getDate();
      var youWant2 = d2.getFullYear() + "-" + month2 + "-" + day2;
      this.startdata = youWant;
      this.enddata = youWant2;
      let xdata = [];
      let mdata = [];
      let ndata = [];
      let flag = false;
      data.xAxisdata.forEach((item, index) => {
        if (item === youWant) {
          flag = true;
        }
        if (flag) {
          xdata.push(item);
          mdata.push(data.moneydata[index]);
          ndata.push(data.numdata[index]);
        }
        if (item === youWant2) {
          flag = false;
        }
      });
      this.option.xAxis[0].data = xdata;
      this.option.series[0].data = mdata;
      this.option.series[1].data = ndata;
      let myChart = echarts.init(document.getElementById("main"));
      const option = this.option;
      myChart.setOption({
        ...option,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 1000px;
  margin: 0 auto;
  .order_row {
    margin: 50px 0 20px;
    .el_col {
      height: 100px;
      width: 230px;
      padding: 20px;
      display: flex;
      justify-content: left;
      border: 1px solid #dcdfe6;
      img {
        width: 60px;
        height: 60px;
        margin-right: 15px;
      }
      .title_order {
        font-size: 16px;
        color: #909399;
        margin: 15px 0 10px;
      }
      .price_title {
        font-size: 18px;
        color: #606266;
      }
    }
  }
  .Report {
    border: 1px solid #dcdfe6;
    .onlyrow {
      color: #606266;
      padding: 15px 20px;
      background: #f2f6fc;
      font-weight: bold;
    }
    .statistics {
      .left_bar {
        border-right: 1px solid #dcdfe6;
        margin-bottom: 10px;
      }

      .right_bar {
        height: 426px;
        .block {
          text-align: right;
          margin: 10px;
        }
        .echart {
          width: 100%;
          height: 360px;
        }
      }
    }
  }
}
</style>
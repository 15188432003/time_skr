<template>
  <div class="PriItemSort">
    <div class="header">
        <div class="left">
          <p>今日推荐</p>
        </div>
      </div>
    <div class="sort">
      <span>共计 {{ TypeOneLength }} 件</span>
      <div class="select">
        <div
          :style="{
            width: '120px',
            paddingRight: '10px',
            display: 'inline-block',
          }"
        >
          <el-select
            v-model="valueOne"
            placeholder="每页30"
            size="small"
            @change="numChange"
          >
            <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div :style="{ width: '120px', display: 'inline-block' }">
          <el-select
            v-model="valueTwo"
            placeholder="默认"
            size="small"
            @change="orderChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sort",
  props: ["TypeOneLength"],
  data() {
    return {
      option: [
        {
          value: "30",
          label: "每页30",
        },
        {
          value: "60",
          label: "每页60",
        },
        {
          value: "90",
          label: "每页90",
        },
      ],
      valueOne: "",
      options: [
        {
          value: "0",
          label: "默认",
        },
        {
          value: "1",
          label: "价格最高",
        },
        {
          value: "2",
          label: "价格最低",
        },
        {
          value: "3",
          label: "销量最高",
        },
      ],
      valueTwo: "",
    };
  },
  methods: {
    numChange() {
      let pageSize = Number(this.valueOne);
      this.$bus.$emit("numChange", pageSize);
    },
    orderChange() {
      let num = this.valueTwo;
      this.$bus.$emit("orderChange", num);
    },
  },
   watch: {
    $route: {
      deep: true,
      handler(to, from) {
        if (to.path !== from.path) {
          this.valueOne = '30'
          this.valueTwo = '0'
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
      width: 100%;
      height: 54px;
      border-top: 1px solid #e1e1e1;
      border-bottom: 2px solid #000;
      background-color: #fbfbfb;
      display: flex;
      justify-content: flex-end;

      .left {
        display: flex;
        width: 99%;
        p {
          line-height: 54px;
          cursor: pointer;
          font-size: 16px;
          color: #000;
          font-weight: 700;
        }
      }
    }
.sort {
  position: relative;
  margin: 25px 0 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 14px;
  }
}
</style>
<template>
  <div class="tab">
    <div class="tabItem">
      <div class="tabList">
        <el-tabs type="card" :stretch="true" @tab-click="handleClick">
          <el-tab-pane v-for="(item, index) in tab" :key="index" :label="item">
            <ul class="sort">
              <li
                v-for="(items, indexs) in sort[item]"
                :key="indexs"
                @click="onspan(indexs)"
              >
                <span :class="indexs == num ? 'onspan' : ''">{{ items }}</span>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="antTab"></div>
    </div>
    <div class="selects">
      <div class="select">
        <el-select v-model="value" placeholder="日常的" size="small">
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
</template>

<script>
import { getImg } from "@/api/gitImg";
export default {
  name: "Tab",
  data() {
    return {
      tab: ["All", "鞋类", "服饰", "配件", "儿童专区"],
      sort: {
        All: [],
        鞋类: ["ALL WOMEN", "APPAREL", "BAG", "SHOES", "ACC"],
        服饰: ["ALL MEN", "APPAREL", "BAG", "SHOES", "ACC"],
        配件: [
          "ALL LIFE",
          "LIFEWEAR",
          "HOME",
          "TRAVEL",
          "DIGITAL",
          "PET",
          "GOODS",
        ],
        儿童专区: [
          "ALL BEAUTY",
          "FACIAL BEAUTY",
          "SALON BEAUTY",
          "SCENT BEAUTY",
          "INNER BEAUTY",
          "for MEN",
        ],
      },
      num: 0,
      options: [
        {
          value: "选项1",
          label: "日常的",
        },
        {
          value: "选项2",
          label: "每周的",
        },
        {
          value: "选项3",
          label: "每月一次",
        },
      ],
      value: "",
      shopList: [],
      allList: [],
    };
  },
  methods: {
    onspan(id) {
      // console.log(id);
      this.num = id;
    },
    handleClick(label) {
     
      if (label.label == "All") {
        let data = {
          parent_name: "服饰",
          start: 0,
          end: 100,
        };
        getImg(data).then((data) => {
         
          this.$bus.$emit("shopList", data);
        });
        let res = {
          parent_name: "配件",
          start: 0,
          end: 100,
        };
        getImg(res).then((data) => {
         
          this.$bus.$emit("allList", data);
        });
      } else {
        let data = {
          parent_name: label.label,
          start: 0,
          end: 100,
        };
        getImg(data).then((data) => {

          this.$bus.$emit("shopList", data);
          this.$bus.$emit("allList", data);
        });
      }
    },
  },
  created() {
    let data = {
      parent_name: "服饰",
      start: 0,
      end: 100,
    };
    getImg(data).then((data) => {
      this.$bus.$emit("shopList", data);
    });
    let res = {
      parent_name: "配件",
      start: 0,
      end: 100,
    };
    getImg(res).then((data) => {
      this.$bus.$emit("allList", data);
    });
  },
};
</script>

<style lang="scss" scoped>
.tab {
  width: 82%;
  margin: 0 auto;
  height: 207px;
  ::v-deep .el-tabs__item {
    border: 1px solid #ccc;
    background-color: #fff;
    font-family: ProximaNova-Semibold;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    width: 20%;
    height: 58px;
    margin: 0;
    padding: 0 16px;
    line-height: 58px;
    border-bottom: 2px solid #000;
    border-radius: 0;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    color: rgba(0, 0, 0, 0.65);
  }
  ::v-deep .el-tabs__item.is-active {
    height: 59px;
    border: 2px solid #000;
    border-bottom: none;
    color: #000;
  }
  ::v-deep .el-tabs__item:hover {
    color: #000;
  }
  .sort {
    width: 70%;
    height: 32px;
    margin: 10px auto;
    display: flex;
    justify-content: space-around;
    text-align: center;
    line-height: 32px;
    position: relative;

    li {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      width: 100%;
      &:first-child {
        ::after {
          display: block;
          content: "";
          width: 1px;
          height: 10px;
          background: #ccc;
          position: absolute;
          top: 12px;
          border: none;
          display: none;
        }
      }
      ::after {
        display: block;
        content: "";
        width: 1px;
        height: 10px;
        background: #ccc;
        position: absolute;
        top: 12px;
        border: none;
      }
      :hover {
        border-bottom: 2px solid #000;
      }
    }
  }
  .onspan {
    border-bottom: 2px solid #000;
  }
  .selects {
    line-height: 60px;
    width: 100%;
    margin-bottom: 20px;
    height: 60px;
    .select {
      float: right;
      width: 120px;
    }
  }
}
</style>


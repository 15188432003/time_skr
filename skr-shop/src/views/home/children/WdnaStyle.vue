<template>
  <div>
    <el-tabs
      v-model="activeName"
      :stretch="true"
      @tab-click="handleClick"
      class="tap"
    >
      <el-tab-pane label="连帽卫衣" name="first"
        >
        <!-- 卡片 -->
        <div class="AnCard">
          <el-card
            hoverable
            :body-style="{ padding: 0 }"
            class="card"
            v-for="(item, index) in WdnaStylewoman_list.slice(0, 6)"
            :key="index"
          >
            <img :src="item.img" />
            <div class="eltitle" :title="item.title">
              <span>{{ item.title }}</span>
            </div>
            <span class="description">www.stride.fun</span>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="单茄克" name="second"
        >
        <div class="AnCard">
          <el-card
            hoverable
            :body-style="{ padding: 0 }"
            class="card"
            v-for="(item, index) in WdnaStylejacket_list.slice(0, 6)"
            :key="index"
          >
            <img :src="item.img" />
            <div class="eltitle" :title="item.title">
              <span>{{ item.title }}</span>
            </div>
            <span class="description">www.stride.fun</span>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="单风衣" name="third"
        >
        <div class="AnCard">
          <el-card
            hoverable
            :body-style="{ padding: 0 }"
            class="card"
            v-for="(item, index) in WdnaStylecoat_list.slice(0, 6)"
            :key="index"
          >
            <img :src="item.img" />
            <div class="eltitle" :title="item.title">
              <span>{{ item.title }}</span>
            </div>
            <span class="description">www.stride.fun</span>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="针织短裤" name="fourth"
        >
        <div class="AnCard">
          <el-card
            hoverable
            :body-style="{ padding: 0 }"
            class="card"
            v-for="(item, index) in WdnaStyleshorts_list.slice(0, 6)"
            :key="index"
          >
            <img :src="item.img" />
            <div class="eltitle" :title="item.title">
              <span>{{ item.title }}</span>
            </div>
            <span class="description">www.stride.fun</span>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="运动背心" name="fifth"
        >
        <div class="AnCard">
          <el-card
            hoverable
            :body-style="{ padding: 0 }"
            class="card"
            v-for="(item, index) in WdnaStylevest_list.slice(0, 6)"
            :key="index"
          >
            <img :src="item.img" />
            <div class="eltitle" :title="item.title">
              <span>{{ item.title }}</span>
            </div>
            <span class="description">www.stride.fun</span>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
          swiperClick(id){
      this.$router.push(`/details/${id}`)
    }
  },
  props: {
    WdnaStylewoman_list: {
      type: Array,
      default: () => [],
    },
    WdnaStylejacket_list: {
      type: Array,
      default: () => [],
    },
    WdnaStylecoat_list: {
      type: Array,
      default: () => [],
    },

    WdnaStyleshorts_list: {
      type: Array,
      default: () => [],
    },
    WdnaStylevest_list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.tap::v-deep .el-tabs__nav-scroll {
  width: 50% !important;
  margin: 0 auto !important;
}
.AnCard {
  width: 100%;
  padding: 0 10px;
  display: flex;
  text-align: center;
  .card {
    width: calc(16.66667% - 8px); 
    margin: 4px;
    cursor: pointer;
  }
}
img {
  width: 100%;
}
.eltitle {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
  font-family: "ProximaNova-Bold";
  font-size: 20px;
}
.description {
  color: #666;
  font-family: "yg740";
  font-size: 12px;
  line-height: 1.5;
  display: block;
  padding: 10px 0 10px;
  word-break: keep-all;
}
</style>
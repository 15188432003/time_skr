<template>
  <div class="customary">
    <el-row class="cust_row">
      <el-col class="cust_col cust_col_left" :span="6">
        <i class="el-icon-search sarch"></i>
        <input type="text" placeholder="搜索" />
      </el-col>
      <el-col class="cust_col cust_col_right" :span="18"> </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Customary",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.customary {
  width: 100%;
  height: 100%;
  .cust_row {
    width: 100%;
    height: 100%;
    .cust_col {
      height: 100%;
    }
    .cust_col_left {
      background: #dbd9d8;
      padding: 20px;
      position: relative;
      .sarch {
        position: absolute;
        top: 28px;
        left: 24px;
        color: #c0c4cc;
      }
      input {
        font-size: 13px;
        color: #c0c4cc;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        height: 32px;
        line-height: 32px;
        width: 100%;
        padding: 0 25px;
        &:hover {
          border-color: #c0c4cc;
        }
        &:focus {
          border-color: #409eff;
          outline: 0;
        }
      }
    }
  }
}
</style>

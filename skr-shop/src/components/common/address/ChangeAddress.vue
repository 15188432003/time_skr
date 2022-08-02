<template>
  <div class="address_wrapper">
    <div class="add_top">
      <h2>收货地址</h2>
      <div class="svg_wrapper" @click="changeShows">
        <svg-icon
          icon-class="close"
          className="icon"
          width="24px"
          height="24px"
        ></svg-icon>
      </div>
    </div>
    <div class="add_body">
      <el-form :model="tableData">
        <div class="el_top">
          <el-form-item>
            <p>收货人 <span class="star_red">*</span></p>
            <el-input v-model="tableData.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <p>手机号码 <span class="star_red">*</span></p>
            <el-input v-model="tableData.tel" placeholder="手机号码"></el-input>
          </el-form-item>
        </div>
        <AddressAdd width="460px" ref="one" />
        <div class="detailadd">
          <el-form-item>
            <p>详细地址 <span class="star_red">*</span></p>
            <el-input
              v-model="tableData.address"
              placeholder="详细地址"
            ></el-input>
          </el-form-item>
          <el-checkbox v-model="checked">设为默认地址</el-checkbox>
        </div>
        <div class="btn">
          <el-form-item>
            <el-button @click="changeShows" class="ret">返回</el-button>
            <el-button class="keep" @click="keepchange">保存地址</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { updateAddress } from "@/api/address.js";
import AddressAdd from "./AddressAdd.vue";
export default {
  name: "ChangeAddress",
  components: { AddressAdd },
  props: ["changeShows", "getAddress", "addInfo"],
  data() {
    return {
      tableData: {
        name: "",
        tel: "",
        address: "",
      },
      checked: false,
      areaData: "",
      id: "",
    };
  },
  methods: {
    keepchange() {
      const address = this.$refs.one.data;
      if (!address) {
        this.$message({
          type: "info",
          message: "地址为必填项",
        });
        return;
      }
      this.tableData.address = address + this.tableData.address;
      const data = {
        id: this.id,
        ...this.tableData,
      };
      updateAddress(data).then((data) => {
        if (!data.code == 200) {
          this.$message({
            type: "info",
            message: data.message,
          });
        } else {
          this.changeShows();
          this.getAddress();
          this.$message({
            type: "success",
            message: data.message,
          });
        }
      });
    },
  },
  created() {
    this.tableData.name = this.addInfo.name;
    this.tableData.tel = this.addInfo.tel;
    this.id = this.addInfo.id;
    if (this.addInfo.prime) {
      this.checked = true;
    }
  },
};
</script>

<style lang="scss" scoped>
p {
  text-align: left;
}
.address_wrapper {
  position: fixed;
  background: #fff;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 660px;
  padding: 20px;
  .addressadd {
    margin-left: 13px;
  }
  .add_top {
    display: flex;
    justify-content: space-between;
    height: 50px;
    border-bottom: 2px solid #e6e6e6;
    .svg_wrapper {
      cursor: pointer;
    }
  }
  .el_top {
    margin: 10px 0;
    display: flex;
    justify-content: space-around;
    width: 86%;
    .el-input {
      &::v-deep .el-input__inner {
        width: 240px;
      }
    }
  }
  .detailadd {
    margin: 10px 0;
    width: 80%;
    padding: 0 13px;
    text-align: left;
    .el-input {
      &::v-deep .el-input__inner {
        width: 100%;
      }
    }
  }
  .btn {
    width: 100%;
    height: 70px;
    margin-top: 10px;
    border-top: 2px solid #e6e6e6;
    text-align: right;
    .el-button {
      margin-top: 20px;
      margin-right: 10px;
      border-radius: 0;
      &:last-child {
        background-color: #4c4c4c;
        color: #ffffff;
        padding: 0 25px;
        border: 1px solid #979797;
        height: 40px;
      }
    }
  }
  .el-input::v-deep .el-input__inner {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-weight: 400;
    transition: font 0.3s;
    position: relative;
    border: 1px solid #000;
    border-radius: 0;
    height: 42px;
    line-height: 1.5;
    padding: 0;
  }
  .el-input::v-deep .el-input__inner:focus {
    font-size: 16px;
  }
  .star_red {
    color: #ff1414;
  }
}
</style>
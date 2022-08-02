<template>
  <div class="addressadd" :style="{ width: width }">
    <ul class="address_title">
      <li>国家/地区<span>*</span></li>
      <li>省/直辖市<span>*</span></li>
      <li>市<span>*</span></li>
      <li>区/县<span>*</span></li>
    </ul>
    <div class="aption_data">
      <el-select value="中国大陆" placeholder="中国大陆">
        <el-option value="中国大陆"> 中国大陆</el-option>
      </el-select>
      <el-select
        v-model="provinceValue"
        placeholder="请选择"
        @change="provinceChange"
      >
        <el-option
          v-for="item in province"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="citysValue" placeholder="请选择" @change="cityChange">
        <el-option
          v-for="item in citys"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="areasValue" placeholder="请选择" @change="areaChange" >
        <el-option
          v-for="item in areas"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { addressData } from "@/plugin/addressData/data.js";
export default {
  name: "AddressAdd",
  props: {
    width: {
      type: String,
      default: "300px",
    },
    getArea: Function,
  },
  data() {
    return {
      addressdata: addressData,
      province: [], //省列表
      provinceValue: "", //所选省份
      citys: [], //市列表
      citysValue: "", //所选市
      citysdata: {}, //所选市数据
      areas: [],
      areasValue: "",
      data:'',
    };
  },
  methods: {
    provinceChange(val) {
      let data = addressData;
      this.citys = [];
      for (const key in data) {
        if (val == data[key].name) {
          let area = data[key].child;
          this.citysdata = area;
          for (const key in area) {
            const value = { value: area[key].name, label: area[key].name };
            this.citys.push(value);
          }
          this.citysValue = this.citys[0].label;
          this.cityChange(this.citys[0].value);
          return;
        }
      }
    },
    cityChange(val) {
      let data = this.citysdata;
      this.areas = [];
      for (const key in data) {
        if (val == data[key].name) {
          let area = data[key].child;
          for (const key in area) {
            const value = { value: area[key], label: area[key] };
            this.areas.push(value);
          }
          this.areasValue = this.areas[0].label;
          return;
        }
      }
    },
    areaChange(val){
      this.data = this.provinceValue+this.citysValue+val
    }
  },
  created() {
    let data = addressData;
    for (const key in data) {
      const value = { value: data[key].name, label: data[key].name };
      this.province.push(value);
    }
  },
};
</script>

<style lang="scss" scoped>
.addressadd {
  .address_title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    & > li {
      width: 20%;
      text-align: left;
      span {
        color: #ff1414;
      }
    }
  }
  .aption_data {
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
    display: flex;
    color: rgba(0, 0, 0, 0.65);
    .el-select {
      width: 24%;
      line-height: 30px;
      &::v-deep .el-input__inner {
        border: 1px solid #000;
        border-radius: 0;
      }
    }
  }
}
</style>
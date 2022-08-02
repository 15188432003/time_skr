<template>
  <div class="addShop" style="padding: 20px">
    <div
      class="add"
      :style="{
        width: '1000px',
        margin: ' 0 auto',
        border: '1px solid whitegray',
        padding: '20px',
      }"
    >
      <!-- <h1>{{$router.query.id}}</h1> -->
      <el-form ref="form" label-width="80px">
        <el-form-item label="产品分类">
          <el-cascader
            :disabled="isActive"
            :options="productCateOptions"
            v-model="selectProductCateValue"
            @click="handleCateChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="产品名称" required>
          <el-input
            v-model="value.name"
            style="width: 200px"
            :disabled="isActive"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品品牌" required>
          <el-select
            v-model="value.brandName"
            placeholder="添加新品牌"
            :disabled="isActive"
          >
            <!-- <el-option label="区域一" value=""></el-option> -->
          </el-select>
        </el-form-item>

        <el-form-item label="产品图片" size="mini">
          <!-- <el-dialog :visible.sync="dialogVisible" size="mini">
          <img width="30%" :src="dialogImageUrl" alt="" />
        </el-dialog> -->
          <img width="17%" :src="dialogImageUrl" style="float: left" alt="" />
          <el-upload :disabled="isActive" list-type="picture-card" action="#">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品介绍">
          <el-input
            type="textarea"
            v-model="value.description"
            size="mini"
            :disabled="isActive"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品售价">
          <el-input v-model="value.price" :disabled="isActive"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">下一步，填写商品属性</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getBrandName, addSpu, getSpecParam } from "@/api/shopList.js";
export default {
  name: "addShop",
  data() {
    return {
      value: {
        name: "",
        description: "",
        price: "",
        brandName: ["安踏"],
      },
      isActive: false, //是否默认不可更改
      dialogImageUrl: "",
      selectProductCateValue: [],
      productCateOptions: [
        //
        {
          value: "shumajiadian",
          label: "数码家电",
          children: [],
        },
        {
          value: "jujiashenghuo",
          label: "居家生活",
          children: [],
        },
        {
          value: "fushi",
          label: "服饰",
          children: [
            { value: "xiuxianshangyi", label: "休闲上衣" },
            { value: "zhenzhishan", label: "针织衫" },
          ],
        },
        {
          value: "meishi",
          label: "美食",
          children: [],
        },
        {
          value: "gehuqignjie",
          label: "个护清洁",
          children: [],
        },
        {
          value: "shoushizhubao",
          label: "首饰珠宝",
          children: [],
        },
      ],
    };
  },
  methods: {
    handleCateChange() {
      let brandArr = this.selectProductCateValue;
    },
  },
  created() {
    let data = {
      title: this.$route.params.title,
      img: this.$route.params.img,
      price: this.$route.params.price,
      id: this.$route.params.id,
      spg_id: this.$route.params.spgId,
    };
    if (this.$route.params.id) {
      this.isActive = true;
      this.value.name = data.title;
      this.value.price = data.price;
      this.dialogVisible = true;
      this.dialogImageUrl = data.img;
      getBrandName({ id: this.$route.params.id }).then((data) => {
        this.value.brandName = data.data[0].name;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
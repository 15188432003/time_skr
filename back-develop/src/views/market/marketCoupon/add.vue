<template>
  <div class="add">
    <div class="addForm">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item label="优惠券面额" prop="deno">
          <el-input v-model="ruleForm.deno"></el-input>
        </el-form-item>
        <el-form-item label="使用条件" prop="condition">
          <el-input v-model="ruleForm.condition"></el-input>
        </el-form-item>
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" required>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%"
              value-format="timestamp"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm.date2"
              style="width: 100%"
              value-format="timestamp"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" required>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date3"
              style="width: 100%"
              value-format="timestamp"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm.date4"
              style="width: 100%"
              value-format="timestamp"
            ></el-time-picker>
          </el-col>
        </el-form-item>

        <el-form-item style="margin-top: 25px">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即添加</el-button
          >
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addVoucher } from "@/api/market.js";
export default {
  name: "Add",
  data() {
    return {
      ruleForm: {
        deno: "",
        condition: "",
        date1: "",
        date2: "",
        date3: "",
        date4: "",
        name: "",
      },
      rules: {
        deno: [
          { required: true, message: "请输入优惠券面额", trigger: "blur" },
        ],
        condition: [
          { required: true, message: "请输入活动条件", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        date3: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date4: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        name: [
          { required: true, message: "请填写优惠券名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          let timeNew = new Date(new Date().toLocaleDateString()).getTime();
          let start_time =
            this.ruleForm.date1 + (this.ruleForm.date2 - timeNew);
          let end_time = this.ruleForm.date3 + (this.ruleForm.date4 - timeNew);
          let data = {
            store_id: 1,
            spu_id: 977,
            start_time,
            end_time,
            deno: this.ruleForm.deno,
            condition: this.ruleForm.condition,
            name: this.ruleForm.name,
          };
          addVoucher(data).then((data) => {
            console.log(data);
            if (data.code == 200) {
              this.$message({
                message: "添加优惠券成功",
                type: "success",
              });
              this.$router.push("./marketCoupon");
            } else {
              this.$message({
                message: "入参有误",
                type: "warning",
              });
              return false;
            }
          });
        } else {
          this.$message({
            message: "添加失败",
            type: "warning",
          });
          return false;
        }
      });
    },
    resetForm() {
      this.$router.push("./marketCoupon");
    },
  },
};
</script>

<style lang="scss" scoped>
.add {
  padding: 20px;
  .addForm {
    padding: 20px;
    width: 780px;
    margin: 0 auto;
    border: 1px solid #ebeef5;
  }
}
</style>
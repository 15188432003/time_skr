<template>
  <div class="markCoupon">
    <div class="mark-header">
      <el-card class="box-card" shadow="never">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <div :style="{ margin: '10px 0 10px 0' }" class="div">
          <el-input
            placeholder="优惠券名称"
            v-model="input"
            style="width: 200px"
          >
          </el-input>
          <el-button
            type="primary"
            size="small"
            :style="{ height: '40px', marginLeft: '20px' }"
            @click="search"
            >查询搜索</el-button
          >
        </div>
      </el-card>
      <div class="mark-header-top">
        <el-card class="box-card" shadow="never">
          <i class="el-icon-tickets"></i>
          <span>数据列表</span>
          <el-button size="mini" style="float: right" @click="addmark"
            >添加</el-button
          >
        </el-card>
      </div>
    </div>
    <div class="mark-main">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        empty-text="暂无数据"
      >
        <el-table-column prop="id" label="编号" align="center">
        </el-table-column>
        <el-table-column prop="name" label="名称" align="center">
        </el-table-column>
        <el-table-column prop="deno" label="优惠券面额" align="center">
        </el-table-column>
        <el-table-column prop="condition" label="优惠券满足条件" align="center">
        </el-table-column>
        <el-table-column prop="start_time" label="开始使用时间" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.start_time | formatDate("YYYY-MM-DD HH:mm:ss")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="end_time" label="结束使用时间" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.end_time | formatDate("YYYY-MM-DD HH:mm:ss")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="update(scope.row.id)"
              >修改活动</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deleteOrder(scope.row.id)"
              >删除活动</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="addForm">
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
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
              >立即修改</el-button
            >
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getVoucher,
  editVoucheer,
  deleteVoucher,
  selectVoucher,
} from "@/api/market.js";
import { formatDate } from "@/utils/data";
export default {
  name: "MarkCoupon",
  data() {
    return {
      input: "",
      tableData: [],
      dialogFormVisible: false,
      id: 1,
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
          { required: true, message: "请选择活动区域", trigger: "change" },
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
    update(id) {
      this.dialogFormVisible = true;
      this.id = id;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let timeNew = new Date(new Date().toLocaleDateString()).getTime();
          let start_time =
            this.ruleForm.date1 + (this.ruleForm.date2 - timeNew);
          let end_time = this.ruleForm.date3 + (this.ruleForm.date4 - timeNew);
          let data = {
            id: this.id,
            start_time,
            end_time,
            deno: this.ruleForm.deno,
            condition: this.ruleForm.condition,
            name: this.ruleForm.name,
          };
          editVoucheer(data).then((data) => {
            console.log(data);
            this.getVoucher();
            this.dialogFormVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.dialogFormVisible = false;
    },
    addmark() {
      this.$router.push("./addCoupon");
    },
    getVoucher() {
      getVoucher({ store_id: 1 }).then((data) => {
        console.log(data);

        data.data.forEach((item) => {
          item.start_time = new Date(item.start_time).getTime();
          item.end_time = new Date(item.end_time).getTime();
        });
        this.tableData = data.data;
      });
    },
    deleteOrder(id) {
      this.$confirm("此操作将永久删除该活动, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteVoucher({ id }).then((data) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getVoucher();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    search() {
      selectVoucher({ name: this.input })
        .then((data) => {
          console.log(data.res);
          data.res.forEach((item) => {
            item.start_time = new Date(item.start_time).getTime();
            item.end_time = new Date(item.end_time).getTime();
          });
          this.tableData = data.res;
        })
        .catch((data) => {
          this.tableData = [];
        });
    },
  },
  created() {
    this.getVoucher();
  },
};
</script>

<style lang="scss" scoped>
.markCoupon {
  padding: 20px;
}
.el-icon-search {
  margin-right: 10px;
}
.el-icon-tickets {
  margin-right: 10px;
}
button {
  vertical-align: top;
}
.mark-header-top {
  margin: 20px 0 10px 0;
}
</style>